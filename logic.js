var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var start = false;


// Function to generate random number between 0-4
function nextSequence() {
    level++;
    $("#level-title").text(`Level ${level}`);

    // generating random game pattern
    randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // flashing the random selected color
    $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

// Function to play buttons sound
function playSound(btnName) {
    let audio = new Audio(`./sounds/${btnName}.mp3`);
    audio.play();
}

// Function to animate each buttons press
function animatePress(currBtn) {
    $(`#${currBtn}`).addClass("pressed");
    setTimeout(() => {
        $(`#${currBtn}`).removeClass("pressed");
    }, 100)

}

// Function to check user clicked patter against game pattern
function checkAnswer(currLevel) {
    console.log(gamePattern)
    console.log(userClickedPattern)
    if (gamePattern[currLevel] === userClickedPattern[currLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000)
            userClickedPattern = [];
        }
    }
    else {
        $("#level-title").text("Game Over, Press Any Key to Restart");
        playSound("wrong");
        $(document.body).addClass("game-over");
        setTimeout(() => {
            $(document.body).removeClass("game-over");
        }, 100)
        startOver();
    }
}

// Function to restart the game
function startOver() {
    level = 0;
    start = false;
    gamePattern = [];
    userClickedPattern = [];
}

myMain = () => {

    // starting the game  for the first time
    $(document).on("keydown", function () {
        if (!start) {
            start = true;
            $("#level-title").text(`Level ${level}`);
            nextSequence();
        }
    });


    // registering user clicked pattern and responding with respective button sounds
    $(".btn").click(function () {
        let userChosenColor = $(this).attr("id");
        playSound(userChosenColor);
        animatePress(userChosenColor);
        userClickedPattern.push(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
    });

}
myMain();