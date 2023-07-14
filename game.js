var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;

$(document).keypress(function (){
    while(!started){
        $("#level-title").text("Level " + level);
        newSequence();
        started = true;
    }
});


function playSound(name){
    var sound = new Audio('./sounds/' + name + ".mp3");
    sound.play();
}

function animatePress(currentColour){
    $("." + currentColour).addClass("pressed");
    setTimeout(function(){
        $("." + currentColour).removeClass("pressed");
    }, 100);
}

$(".btn").click(function (){
    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

function newSequence(){
    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.random();
    randomNumber *= 3;
    randomNumber = Math.round(randomNumber);

    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    userClickedPattern = [];
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        console.log("success!");
        if (gamePattern.length === userClickedPattern.length)
        {
            setTimeout(newSequence, 1000);
        }
    }
    else
    {
        var gameOverSound = new Audio('./sounds/wrong.mp3');
        gameOverSound.play();

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 1000);

        $("h1").text("Game Over, Press Any Key to Restart.");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}