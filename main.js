result = [];
objecttofind = "";
status = "";

function preload(){
}

function setup(){
     canvas = createCanvas(400 , 300);
     canvas.position(555 , 350);

     video = createCapture(VIDEO)
     video.hide();

}

function start(){
     objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById('status').innerHTML = "Object is being detected"

     objecttofind = document.getElementById('objecttofind');
     console.log(objecttofind);
}

function modelLoaded(){
     console.log('modelloaded');
     status = true;
}

function draw(){
     image(video , 0 , 0 , 400 , 300);

     if(status != ""){
          for(i = 0; i<result; i++){
               percent = floor(result[i].confidence * 100);
               label = result[i].label;
               x = result[i].x;
               y = result[i].y;
               width = result[i].width;
               height = result[i].height;
               
               stroke('red');
               nofill();
               rect(x , y , width , height);
               label(x , y)
               
               if(result[i].label == objecttofind){
                    
                    video.stop();
                    objectDetector.detect(gotResult);
                    objectDetector.detect(gotResult);
                    document.getElementById('status') = "object found";
                    document.getElementById('objecttofind').innerHTML = objecttofind + " has been found";
                    var synth = window.speechSynthesis;
                    speak_data = objecttofind + "has been found";
                    utterThis = new SpeechSynthesisUtterance(speak_data); 
                    synth.speak(utterThis);
               }else{
                    document.getElementById("status").innerHTML = "Object mentioned has not been found.";
               }

          }
     }
}

function gotResult(results , error){

     if(error){
          console.error(error);
     }

     result = results;
}