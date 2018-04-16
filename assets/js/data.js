// --------------------------------------------------------------------------
// Data objects for Automotive Trivia Game
// --------------------------------------------------------------------------

// Question constructor
function Question(question, possibleAnswers, correctAnswer, image) {
  this.question = question;
  this.possibleAnswers = possibleAnswers;
  this.correctAnswer = correctAnswer;
  this.image = image;
}

// Array of Question objects
var triviaQuestions = [
  new Question(
    "What was the best selling car of 2017?",
    [ "Honda Accord", 
      "Toyota Camry", 
      "Ford Pinto", 
      "Volkswagen Jetta"], 
    "Toyota Camry",
    "assets/images/toyota_camry.jpg"
  ),  
  new Question(
    "When was the first Ford Model T produced?",
    [ "1899", 
      "1908", 
      "1918", 
      "1935"], 
    "1908",
    "assets/images/model_t.jpg"
  ),
  new Question(
    "What does BMW stand for?",
    [ "Bavarian Motor Works", 
      "Berlin Motor Works", 
      "Brunswick Motor Works", 
      "Borgholzhausen Motor Works"], 
    "Bavarian Motor Works",
    "assets/images/bmw.jpg"
  ),
  new Question(
    "Which of the following holds the record for the highest top speed?",
    [ "Bugatti Veyron", 
      "Ferrari Enzo", 
      "Koenigsegg Agera RS", 
      "McLaren P20"], 
    "Koenigsegg Agera RS",
    "assets/images/koenigsegg.jpg"
  )
];
