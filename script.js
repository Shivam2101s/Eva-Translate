let trans_text = document.getElementById("box2"); 

let transBtn = document.getElementById("transBtn");

transBtn.addEventListener("click",translate);


async function translate() {

let lang_value = document.getElementById("language").value;

let inp_lang = document.getElementById("inpLang").value; 

trans_text.innerHTML = null;

let text = document.getElementById("box1").value;

 res = await fetch("https://libretranslate.de/translate", {
	method: "POST",
	body: JSON.stringify({
		q: text,
		source: `${inp_lang}`,
		target: `${lang_value}`
	}),
	headers: { "Content-Type": "application/json" }
});

let data = await res.json();

console.log(data);

trans_text.innerHTML =  data.translatedText ;

}

//for copy

function copy() {

let text = document.getElementById("box2");

text.select();

navigator.clipboard.writeText(text.value);

}

//speech to text

function runSpeechRecognition() {
   
   let text = document.getElementById("box1");

   let btn = document.getElementById("clickBtn");

    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();

   
    recognition.onstart = function() {
        btn.innerHTML = `<i class="fas fa-microphone-alt"></i>`;
    };
    
    recognition.onspeechend = function() {
        recognition.stop(); 
        btn.innerHTML = `<i class="fas fa-microphone-alt-slash"></i>` ;
    }
  
    recognition.onresult = function(event) {
        var transcript = event.results[0][0].transcript;
        text.innerHTML = transcript;

    };
  
     recognition.start();

    }

//text to speech

    function sayItOutLoud() {
        let lang_value = document.getElementById("language").value;
        let message = document.getElementById("box2").value;
        var speech = new SpeechSynthesisUtterance();
        speech.lang = `${lang_value}`;
        speech.text = message;
        speech.volume = 1;
        speech.rate = 1;
        speech.pitch = 1;      
        window.speechSynthesis.speak(speech);
      }



