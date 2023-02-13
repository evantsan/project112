Webcam.set({
    width:'350', height:'300', image_format:'png', png_format:90
});
camera = document.getElementById('camera');
Webcam.attach('#camera');
function capture()
{
Webcam.snap(function (data_uri){
document.getElementById('result').innerHTML = "<img id='i1' src="+data_uri+">"
})
}
console.log("ml5 version",ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/zD5CohosA/model.json",modelLoaded);
function modelLoaded()
{
console.log("model has been successfully loaded");
}
prediction_1 = '';
function speak()
{
    var synth = window.speechSynthesis;
    speak_data1 = "The prediction is "+prediction_1;
    var ut = new SpeechSynthesisUtterance(speak_data1);
    synth.speak(ut); 
}
function gest()
{
    img = document.getElementById('i1');
    classifier.classify(img, gotResult)
}
function gotResult(error, results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        document.getElementById('result_gesture_name').innerHTML = results[0].label;
        prediction_1 = results[0].label;
        speak();
        if(results[0].label == 'good')
        {
            document.getElementById('emoji1').innerHTML = '👍';
        }
        else if(results[0].label == 'victory')
        {
            document.getElementById('emoji1').innerHTML = '✌';
        }
        else if(results[0].label == 'amazing')
        {
            document.getElementById('emoji1').innerHTML = '👌';
        }
        else if(results[0].label == 'great')
        {
            document.getElementById('emoji1').innerHTML = '👏';
        }
    }
}