class Speech {

  constructor() {

    this.recognition;
    this.lang = 'ja-JP';

    this.isDebug = true;

    this.onSpeech;
  }

  start() {

    window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
    recognition = new webkitSpeechRecognition();
    recognition.lang = lang;
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onsoundstart = function () {
      document.getElementById('message').innerHTML = "認識中...";
    };
     
    recognition.onnomatch = function () {
      document.getElementById('message').innerHTML = "音声を認識できませんでした";
    };
    
    recognition.onerror = function () {
      document.getElementById('message').innerHTML = "エラー";
    if (flag_speech == 0)
      this.start();
    };

    recognition.onsoundend = function () {
      document.getElementById('message').innerHTML = "停止中";
      this.start();
    };

    recognition.onresult = function (event) {
       var results = event.results;
       for (var i = event.resultIndex; i < results.length; i++) {
          if (results[i].isFinal) {
                    var result_transcript = results[i][0].transcript
                    if (lang == 'ja-JP') {
                        result_transcript += '。';
                    }

                    document.getElementById('result_text').innerHTML = result_transcript;
                    document.getElementById('result_log').insertAdjacentHTML('beforeend', result_transcript+'\n');
                    textAreaHeightSet(document.getElementById('result_log'));
                    this.start();
                    flag_speech = 0;
                } else {
                    var result_transcript = results[i][0].transcript;
                    document.getElementById('result_text').innerHTML = result_transcript;
                    flag_speech = 1;
                }
            }
        }

        flag_speech = 0;
        document.getElementById('message').innerHTML = "待機中";
        recognition.start();
  }

  async stop() {

  }
 
  debug(message) {

    if(this.isDebug) {
    	console.log(message);
    }
  }

}