leftWristY=0;
leftWristX=0;
rightWristY=0;
rightWristX=0;
function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    canvas.position(700,300)

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelloaded)
    poseNet.on('pose',gotposes)
}
function modelloaded(){
    console.log("PoseNet is intailized")
}
function gotposes(results){
    if(results.length>0){
        console.log(results)
        leftWristY=results[0].pose.leftWrist.y;
        leftWristX=results[0].pose.leftWrist.x;
        console.log("leftWristY = "+leftWristY+"leftWristX = "+leftWristX)
        rightWristY=results[0].pose.rightWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        console.log("rightWristY = "+rightWristY+"rightWristX = "+rightWristX)
    }
}
function draw(){
    image(video,0,0,600,500);
}