Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach("#camera")

function capture(){
    Webcam.snap(function(data_uri){
        document.getElementById("snapshot").innerHTML="<img id='snap' src='"+data_uri+"'>";
    });
};

function modelLoaded(){
    console.log("Model Loaded");
};

console.log('ml5 version:', ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Xfqu-ilnX/model.json',modelLoaded);

function identify(){
    img=document.getElementById("snap");
    classifier.classify(img, gotResult);
};
function gotResult(error, results){
    if(error){
        console.error(error);
    } else{
        console.log(results);
        document.getElementById("object").innerHTML=results[0].label;
        document.getElementById("amount").innerHTML=results[0].confidence.toFixed(2);
    }
}