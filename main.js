song2="";
song1="";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
scoreRightWrist = 0;
song_status = "";

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();
    canvas.position(700,300);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function preload(){
    song2 = loadSound("music2.mp3");
    song1 = loadSound("music.mp3");
}

function draw(){
    image(video,0,0,600,530);

    fill("#ff0000");
    stroke("#ff0000");

    song_status1 = song1.isPlaying();
    song_status2 = song2.isPlaying();
    console.log(song_status);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        song1.stop();
        if(song_status2 == false){
            song2.play();
        }
    }
    if(scoreRightWrist>0.2){
        circle(rightWrist_x,rightWrist_y,20);
        song2.stop()
        if(song_status1 == false){
            song1.play()
        }
    }

}

function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist + scoreRightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}