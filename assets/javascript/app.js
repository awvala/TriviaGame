var game = {

    //global variables within game object
    correct: 0,
    incorrect: 0,
    outoftime: 0,
    started: false,
    finished: false,
    currentQuestions: 0,
    currentAnswer: "",
    questionTimer: 15000,
    answerTimer: 10000,

    slidearr: [
        // Array Config:  Question string, Answer 1 string, Answer 2 st4ring, Answer 3 string, Answwer 4 string, corrent answer number
        ["Question 0", "Answer 1", "Answer 2", "Answer 3", "Answer 4", 2],
        ["Question 1", "Answer 1", "Answer 2", "Answer 3", "Answer 4", 3],
        ["Question 2", "Answer 1", "Answer 2", "Answer 3", "Answer 4", 1],
        ["Question 3", "Answer 1", "Answer 2", "Answer 3", "Answer 4", 4],
        ["Question 4", "Answer 1", "Answer 2", "Answer 3", "Answer 4", 3],
        ["Question 5", "Answer 1", "Answer 2", "Answer 3", "Answer 4", 4],
        ["Question 6", "Answer 1", "Answer 2", "Answer 3", "Answer 4", 2],
        ["Question 7", "Answer 1", "Answer 2", "Answer 3", "Answer 4", 3],
        ["Question 8", "Answer 1", "Answer 2", "Answer 3", "Answer 4", 4],
        ["Question 9", "Answer 1", "Answer 2", "Answer 3", "Answer 4", 1],
        ["Question 10", "Answer 1", "Answer 2", "Answer 3", "Answer 4", 1],
        ["Question 11", "Answer 1", "Answer 2", "Answer 3", "Answer 4", 4],
        ["Question 12", "Answer 1", "Answer 2", "Answer 3", "Answer 4", 3],
        ["Question 13", "Answer 1", "Answer 2", "Answer 3", "Answer 4", 2],
        ["Question 14", "Answer 1", "Answer 2", "Answer 3", "Answer 4", 1],
    ],

newQuestion: function () {
// hide answer id's and classes, then grab current Question slidearr and insert question and answers into id buttonBox
// update global variables started, currentQuestion, and current Answer
},

showAnswer: function (userAnswer) {
// if userAnswer = currentAnsewr , increment correct global variable
// else,  increment incorrect variable
// then clear id buttonBox of question and display answers for 10 seconds
// If currentQuestions is less than 15 Increment currentQuestions global variable, run newQuestion function
// if currentQuestion is greater than 14, run showResults function

},

showResults: function () {
// clear question id and classes
// show results in article results id
// show startButton and change value attrribute to "try again?""
},

}; // end of game object

$(document).ready(function() {
// on startButton click
$(".startButton").click(function() {
    
}
// set started to true
// hide bottomBanner
// reinitialize global variables and run newQuestion Function

// on answers click
// grab answer-value from button and pass in into showAnswer function


});