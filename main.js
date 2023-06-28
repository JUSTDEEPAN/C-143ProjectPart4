song1believer = "";
song2flag = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
statusofsong1 = "";
statusofsong2 = "";

function preload()
{
    song1 = loadSound("song 1.mp3");
    song2 = loadSound("song 2 (1).mp3 ");   
}

scoreLeftWrist = 0;

function modelLoaded()
{
    console.log('PoseNet Is Initialized!!!');
}

function gotPoses(results)
{
    if(results > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
    }
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw()
{
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        song2.stop();
        if(statusofsong1 = false)
        {
            song1.play();
            document.getElementById("song_name").innerHTML = "song =" + song1believer;
        }
    }
}

