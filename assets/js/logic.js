// --------------------------------------------------------------------------
// Logic for Automotive Trivia Game
// --------------------------------------------------------------------------

$(document).ready(function() {

  // Declare globals
  var currentQuestion = 0;
  var correctAnswers = 0;
  var wrongAnswers = 0;
  var correct = false;
  var timesUp = false;
  var gameTimer = 0;
  var timeLeft = 15;
  var pause = 0;

  // Start game
  start();

  // --------------------------------------------------------------------------
  // Main user choice event listener
  // --------------------------------------------------------------------------
  $("#answers").on("click", ".answer",  function(){
    
    // Clear game timer - BANDAID
    clearInterval(gameTimer);

    // Check if the answer was correct
    if ($(this).attr("value") == triviaQuestions[currentQuestion].correctAnswer){
      correct = true;
      comment();
    } // Else must be a wrong answer 
    else {
      comment();
    }
  });

  // --------------------------------------------------------------------------
  // Comment Function - Updates background, displays "correct/wrong/times up"
  // --------------------------------------------------------------------------
  function comment(){

    // Clear game timer - BANDAID
    clearInterval(gameTimer);

    $("html").fadeIn("slow");

    // Display appropriate background image
    $("html").css("background-image", "url('" + triviaQuestions[currentQuestion].image + "')");

    // Clear possible answers to make room for the correct answer
    $("#answers").empty();

    // Display the correct answer
    $("#correctAnswer").text(triviaQuestions[currentQuestion].correctAnswer);

    // Correct Answer
    if (correct) {
      correctAnswers++;
      $("#timer").text("CORRECT").css("color", "green");

    } // Times up
    else if (timesUp){
      wrongAnswers++;
      $("#timer").text("TIME'S UP").css("color", "red");

    } // Wrong Answer 
    else {
      wrongAnswers++;
      $("#timer").text("WRONG").css("color", "red");
    }

    // Brief pause before we display next question
    pause = setTimeout(reset, 5000);
  }


  // --------------------------------------------------------------------------
  // Start Function - start timer, display question and possible answers
  // --------------------------------------------------------------------------
  function start() {      

    // Make sure timers cleared - BANDAID?
    clearInterval(gameTimer);
    gameTimer = 0;
    clearTimeout(pause);

    // This bit prevents timer flicker upon new question
    $("#timer").text(timeLeft);
    $("#timer").css("display", "block");
    $("#timer").css("color", "green");

    // Clear previous game results
    $("#results").empty();

    // Start Timer
    gameTimer = setInterval(function(){

      timeLeft--;
      var timeDisplay = "";

      // Force countdown to two digit format
      if (timeLeft < 10) {
        timeDisplay += "0" + timeLeft;
        // Make countdown red if less than 5 seconds remaining 
        if (timeLeft <= 5) {
          $("#timer").css("color", "red");
        }
      } else {
        timeDisplay = timeLeft;
      }
      
      // Display seconds remaining
      $("#timer").text(timeDisplay);
      
      // If time ran out
      if(timeLeft <= 0){
        timesUp = true;
        // Clear timer
        clearInterval(gameTimer);
        // Call comment to display Time's Up message
        comment();
      }
    }, 1000);

    // Display Question
    $("html").css("background-image", "url('assets/images/default_bkgd.jpg')");
    $("#question").text(triviaQuestions[currentQuestion].question);
    
    // Clear answers div
    $("#answers").empty();

    // Display possible answers
    triviaQuestions[currentQuestion].possibleAnswers.forEach(function(element){
      $("#answers").append("<div><a href='#' class='answer' value='" + element + "'>" + element + "</a></div>");
    });
  }

  // --------------------------------------------------------------------------
  // Reset Function
  // --------------------------------------------------------------------------
  function reset() {

    // Make sure timers cleared - BANDAID?
    clearInterval(gameTimer);
    gameTimer = 0;
    clearTimeout(pause);
    
    // Reset some globals
    timeLeft = 15;  
    timesUp = false;
    correct = false;

    // Clear question and answer divs to make room for results div
    $("#correctAnswer").empty();
    $("#question").empty();

    // Increment to next question
    currentQuestion++;

    // If that was the last question - game over
    if (currentQuestion >= triviaQuestions.length) {

      // Show results
      $("#timer").text("GAME OVER");
      $("#timer").css("color", "red");
      $("#results").html("<div>Correct Answers: " + correctAnswers + "</div>");
      $("#results").append("<div>Wrong Answers: " + wrongAnswers + "</div>");

      // Reset question counter
      currentQuestion = 0;      

      // Reset result counters      
      correctAnswers = 0;
      wrongAnswers = 0;

      // Build and display "Play Again" button
      $("#results").append("<button type='button' class='btn btn-success'>Play Again</button>");

      // Event listener for "Play Again" button
      $("#results").on("click", ".btn", start);
    } 
    // Still more questions to go
    else {

      // Start next question
      start();
    }
  }
});