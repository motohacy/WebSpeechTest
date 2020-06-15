class Speech {

  constructor() {

    this.recognition;
    this.lang = 'ja-JP';
    this.isDebug = true;

    this.onChangeStatus;
    this.onSpeech;
    this.onSpeechEnd;

    this.flag_speech = 0;
  }

  async start() {

    window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
    this.recognition = new webkitSpeechRecognition();
    this.recognition.lang = this.lang;
    this.recognition.interimResults = true;
    this.recognition.continuous = true;

    this.recognition.onsoundstart = () => {
      this.onChangeStatus("認識中");
    };
     
    this.recognition.onnomatch = () => {
      this.onChangeStatus("音声を認識できませんでした");
    };
    
    this.recognition.onerror = () => {
      this.onChangeStatus("エラーが発生しました");
    if (this.flag_speech == 0)
      this.start();
    };

    this.recognition.onsoundend = () => {
      this.onChangeStatus("停止中");
      this.start();
    };	

    this.recognition.onresult = (event) => {
      var results = event.results;
      for (var i = event.resultIndex; i < results.length; i++) {
        if (results[i].isFinal) {
          var result_transcript = results[i][0].transcript
          result_transcript += "。";
         
          this.onSpeech(result_transcript);
          this.onSpeechEnd(result_transcript);
          this.start();
          this.flag_speech = 0;
        } else {
          var result_transcript = results[i][0].transcript;
          this.onSpeech(result_transcript);
          this.flag_speech = 1;
        }
      }
    }

    this.flag_speech = 0;
    this.onChangeStatus("待機中");
    this.recognition.start();
  }

  async stop() {

  }
 
  debug(message) {

    if(this.isDebug) {
    	console.log(message);
    }
  }

}