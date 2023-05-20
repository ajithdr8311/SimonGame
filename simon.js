
var availableColours = ["green", "red", "yellow", "blue"];

var gamePattern = [];

var userClickedColour = [];

var level = 0;
var started = false;

// Start the Game
$(document).keydown(function() {
    if(!started) {
        $("#level-title").text("Level  " + level);
        nextSequence();
        started = true;
    }

})


//Choose a random color and push it into the gamePattern list 
function nextSequence() {

    $("#level-title").text("Level  " + level);
    level++;
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = availableColours[randomNumber];
    gamePattern.push(randomChosenColor);

    playSound(randomChosenColor);
    animation(randomChosenColor);
}


// Play sound based on the key pressed
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


// add user chosen color to the userPattern list and check if it matches
// the gamePattern list
$(".btn").click(function() {
    var colorid =  $(this).attr('id');
    userClickedColour.push(colorid);
    playSound(colorid);
    animation(colorid);
    checkAnswer(userClickedColour.length-1);

})

// apply animation on the button pressed
function animation(id) {
    $("#" + id).addClass("pressed");

    setTimeout(function() {
      $("#" + id).removeClass("pressed")
    }, 100);
}


// Check if the userPattern and gamePattern list is matching
function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedColour[currentLevel]) {
      if(gamePattern.length === userClickedColour.length) {
          setTimeout(nextSequence, 1000);
          userClickedColour = [];
      }
    } else {
        $("#level-title").text("Game Over. Press Any Button to Restart");
        $("body").addClass("game-over");
        setTimeout(function() {
          $("body").removeClass("game-over");
        }, 500);
        playSound("wrong");
        startover();

    }
}

// Start Over the Game
function startover() {
    gamePattern = [];
    userClickedColour = [];
    level = 0;
    started = false;
}
