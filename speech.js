class Speech {

  constructor() {

    this.recognition;
    this.lang = 'ja-JP';

    this.isDebug = true;
    this.onSpeech;

    this.flag_speech = 0;
  }

  start() {

    window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
    this.recognition = new webkitSpeechRecognition();
    this.recognition.lang = this.lang;
    this.recognition.interimResults = true;
    this.recognition.continuous = true;

    this.recognition.onsoundstart = function () {
      document.getElementById('message').innerHTML = "認識中...";
    };
     
    this.recognition.onnomatch = function () {
      document.getElementById('message').innerHTML = "音声を認識できませんでした";
    };
    
    this.recognition.onerror = function () {
      document.getElementById('message').innerHTML = "エラー";
    if (this.flag_speech == 0)
      this.start();
    };

    this.recognition.onsoundend = function () {
      document.getElementById('message').innerHTML = "停止中";
      this.start();
    };

    this.recognition.onresult = function (event) {
       var results = event.results;
       for (var i = event.resultIndex; i < results.length; i++) {
          if (results[i].isFinal) {
                    var result_transcript = results[i][0].transcript
                    if (this.lang == 'ja-JP') {
                        result_transcript += '。';
                    }

                    document.getElementById('result_text').innerHTML = result_transcript;
                    document.getElementById('result_log').insertAdjacentHTML('beforeend', result_transcript+'\n');
                    textAreaHeightSet(document.getElementById('result_log'));
                    this.start();
                    this.flag_speech = 0;
                } else {
                    var result_transcript = results[i][0].transcript;
                    document.getElementById('result_text').innerHTML = result_transcript;
                    this.flag_speech = 1;
                }
            }
        }

        this.flag_speech = 0;
        document.getElementById('message').innerHTML = "待機中";
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