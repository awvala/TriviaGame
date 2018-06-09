// Global variables
var intervalId;
var clockRunning = false;

// Start game object
var game = {

    //game object variables
    correct: 0,
    incorrect: 0,
    outoftime: 0,
    currentQuestion: 0,
    currentAnswer: "",
    questionTimer: 15,
    answerTimer: 10,

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
    // Hide previous answer id's and classes
    var questionIndex =  game.currentQuestion;
    $("#results").css("display", "none");
    $(".answers").css("display", "inline-block");
    $("label").css("display", "inline-block");
    $("#nextButton").css("display", "none");
    $("#questionAndResponse").text(game.slidearr[questionIndex][0]);

// Grab current Question in slidearr and insert question and answers into buttonBox
    for (i = 1; i < game.slidearr.length - 1; i++) {
        var nextAnswer = "#label" + i;
        $(nextAnswer).text(game.slidearr[questionIndex][i]);
    }

// update global variables currentQuestion and current Answer
    game.currentQuestion ++;
    game.currentAnswer = game.slidearr[questionIndex][5];
},

showAnswer: function (userAnswer) {
    if (userAnswer == game.currentAnswer) {
        game.correct ++;
        $("#questionAndResponse").text("Correct!");
    } else {
        game.incorrect ++;
        $("#questionAndResponse").text("Incorrect!");
    }

// then clear id buttonBox of question and display answers for 10 seconds
    $('input[name=quizAnswer]').prop('checked', false);
    $(".answers").css("display", "none");
    $("#submitButton").css("display", "none");
    $("#nextButton").css("display", "inline-block");
    
    if (game.currentQuestion < 15) {
        //start 10 second timer
        answerClock.start(game.answerTimer);
    } else {
        game.showResults();
    }
},

showResults: function () {
// clear question id and classes
// show results in article results id
// show startButton and change value attrribute to "try again?""
},

}; 
// End of game object

// Start timer object
var answerClock = {

    // timer object variables
    time: "",

    start: function (newTime) {
        if (!clockRunning) {
            answerClock.time = newTime;
            //$("#timerText").css("display", "inline-block");
            intervalId = setInterval(answerClock.count, 1000);
            clockRunning = true;
            $("#timerText").text("Next question in " + newTime + " seconds");
          }
    },

    stop: function() {
        clearInterval(intervalId);
        clockRunning= false;
        $("#timerText").text("");
        game.newQuestion();
      }, 

    count: function() {
        answerClock.time--;
        var currentTime = answerClock.time;
        if (currentTime > 1) {
            var endString = " seconds!";
        } else if (currentTime == 1) {
            var endString = " second!";
        } else {
            answerClock.stop();
        }
        $("#timerText").text("Next question in " + currentTime + endString);
    },

    /*count: function() {
        answerClock.time--;
        var currentTime = answerClock.time;
        if (currentTime > 1) {
            var endString = "seconds left!";
        } else {
            var endString = "second left!";
        }
        $("#timerText").text("You have " + currentTime + endString);
    },*/
};
// End timer object

$(document).ready(function() {

    //On startButton click
    $(".startButton").click(function() {
        $("#bottomBanner").css("display", "none");
        $("#startMessage").css("display", "none");
        $(".startButton").css("display", "none");
        game.correct = 0;
        game.incorrect = 0;
        game.outoftime = 0;
        game.currentQuestion = 0;
        game.currentAnswer = "";
        game.newQuestion();
    });

    // Display submit button after a radio button is clicked
    $(".answers").click(function() {
        $("#submitButton").css("display", "inline-block");
    });

    // On submitButton click, grab the select radio value and pass it to showAnswer function
    $("#submitButton").click(function() {
        $("#submitButton").css("display", "none");
        var userAnswer = $('input[name=quizAnswer]:checked').val();
        game.showAnswer(userAnswer);
    });

});