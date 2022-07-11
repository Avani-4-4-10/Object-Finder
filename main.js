model_status=""
object_name =""
objects = []
function setup(){
    canvas= createCanvas(300 , 300)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    video.size(300 , 300)
}
function start(){
    objectDetector = ml5.objectDetector("cocossd" , modelLoaded)
    document.getElementById("status").innerHTML = "Status : detecting object"
    object_name = document.getElementById("name").value
}
function modelLoaded(){
    console.log("Model has been initialized !")
    model_status = true ; 
}
function draw(){
    image(video , 0 , 0 , 300 , 300)

    if(model_status != ""){
        objectDetector.detect(video , gotResult)
        for(i = 0 ; i < objects.length ; i++){
            document.getElementById("status").innerHTML = "Status : Objects Detected!"
            fill("blue")
            percent = Math.floor(objects[i].confidence * 100)
            text(objects[i].label + " " + percent + "%" , objects[i].x+15 , objects[i].y+15)
            noFill()
            stroke("purple")
            rect(objects[i].x , objects[i].y , objects[i].width ,objects[i].height)

            if(object_name == objects[i].label){
                video.stop()
                objectDetector.detect(gotResult)
                document.getElementById("result").innerHTML= object_name + " Found"
                synth = window.speechSynthesis()
                utterThis = new SpeechSynthesisUtterance(object_name + " Found")
                synth.speak(utterThis)
            }
            else{
                document.getElementById("result").innerHTML= object_name + " Not Found!"
            }
        }
    }
}
function gotResult(error , results){
    if(error){
        console.error(error)
    }
    else{
        console.log(results)
        objects= results 

    }
}
