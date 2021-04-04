var gamePattern = [];

var buttonColours = ['red', 'blue', 'green', 'yellow']

var userClickPattern = [];
var started = false;

var level = 0;


$(document).keypress(function() {
  if (!started) {
    $('h1').text('level ' + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  userClickPattern = [];
  level++;
  $('h1').text('level ' + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber]
  gamePattern.push(randomChosenColour)
  $('#' + randomChosenColour).fadeOut(200).fadeIn(200).on();
  playSound(randomChosenColour)
  return randomChosenColour;
}
$('.btn').click(function(event) {
  // var userChosenColour = event.target.id;
  //better way of doing above code :
  var userChosenColour = $(this).attr('id');
  userClickPattern.push(userChosenColour)
  playSound(userChosenColour);
  animatePress(userChosenColour)
  checkAnswer(userClickPattern.length - 1);
  console.log(event, userChosenColour)
})

function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3')
  audio.play()
}

function animatePress(currentColour) {
  $('#' + currentColour).addClass('pressed');
  setTimeout(function() {
    $('#' + currentColour).removeClass('pressed');
  }, 100)
}

function checkAnswer(currentLevel) {
  if (userClickPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success")
    if (userClickPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000)
    }
  } else {
    // var audio = new Audio('sounds/wrong.mp3');
    // audio.play();
    playSound('wrong')
    $('body').addClass('game-over');
    setTimeout(function() {
      $('body').removeClass('game-over')
    }, 200);
    $('h1').text('Game Over, Pres Any Key to Restart');
    startOver()
    console.log("wrong")
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
