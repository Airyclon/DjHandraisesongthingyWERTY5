song = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
songstatus = "";
songstatus2 = "";

function preload(){
    song = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("Posenet is initialized");
}

function draw(){
    image(video, 0, 0, 600, 500);
    songstatus = song.isPlaying();
    songstatus2 = song2.isPlaying();

    fill("#FF0000");
    stroke("FF0000");

    if(scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        song2.stop();

        if(songstatus == false){
            song.play();
            console.log("Song 1 is playing");
            document.getElementById("song").innerHTML = "Song - Song 1 is playing"
        }
    }

    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        song.stop();

        if(songstatus2 == false){
            song2.play();
            console.log("Song 2 is playing");
            document.getElementById("song").innerHTML = "Song - Song 2 is playing"
        }
    }
}

function play(){
    song2.play();
}

function gotPoses(results){
    if(results.length > 0){
    console.log(results);
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    scoreRightWrist = results[0].pose.keypoints[10].score;
    console.log("ScoreLeftWrist = " + scoreLeftWrist + "ScoreRightWrist = " + scorerightWrist);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("left wrist x = " + leftWristX + "left wrist y = " + leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("right wrist x = " + rightWristX + "right wrist y = " + rightWristY);
    }
}