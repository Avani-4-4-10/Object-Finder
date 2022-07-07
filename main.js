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
    object_name = document.getElementById("name")
}
function modelLoaded(){
    console.log("Model has been initialized !")
    model_status = true ; 
}
function draw(){
    image(video , 0 , 0 , 300 , 300)

    if(model_status != ""){
        objectDetector.detect(video , gotResult)
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
