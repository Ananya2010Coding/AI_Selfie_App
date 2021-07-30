var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function start(){
    document.getElementById("textbox").innerHTML = "";
    recognition.start();
}

recognition.onresult = function run(event){
    console.log(event);
    var content = event.results[0][0].transcript;
    console.log(content);

    document.getElementById("textbox").innerHTML = content;
    
    if(content == "take my selfie"){
        console.log("taking selfie ----");
        speak();
    }
    else{
        noSPEAK();
    }
    
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data = "Taking your selfie in 5 seconds";
    var utter_this = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utter_this);
    Webcam.attach(camera);

    setTimeout(function(){
        take_snapshot();
        save();
    },5000);
}

function noSPEAK(){
    var synth1 = window.speechSynthesis;
    speak_data1 = "I can click your selfie if you give me the command TAKE MY SELFIE";
    var utter_this1 = new SpeechSynthesisUtterance(speak_data1);

    synth1.speak(utter_this1);
}

Webcam.set({
    width: 360,
    height: 250,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById("camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="selfie_img" src="'+data_uri+'">';
    });
}

function save(){
    link = document.getElementById("link");
    img = document.getElementById("selfie_img").src;
    link.href = img;
    link.click();
}


