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
    $("#gifanswer").html("");
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
    //game.currentQuestion ++;
    game.currentAnswer = game.slidearr[questionIndex][5];
    answerClock.clockType = "Question";
    answerClock.start(game.questionTimer);
},

showAnswer: function (userAnswer) {
    if (userAnswer == game.currentAnswer) {
        game.correct ++;
        $("#questionAndResponse").text("Correct!");
    } else if (userAnswer == "timesup") {
        game.outoftime ++;
        $("#questionAndResponse").text("Out of Time!");
    } else {
        game.incorrect ++;
        $("#questionAndResponse").text("Incorrect!");
    }
    $("#correctAnswer").text("Correct Answer: " + game.slidearr[game.currentQuestion][game.currentAnswer]);
    $("#results").css("display", "inline-block");

// then clear id buttonBox of question and display answers for 10 seconds
    $('input[name=quizAnswer]').prop('checked', false);
    $(".answers").css("display", "none");
    $("#submitButton").css("display", "none");
    game.currentQuestion ++;
    
    if (game.currentQuestion < game.slidearr.length+1) {
        //start 10 second timer
        $("#nextButton").css("display", "inline-block");
        answerClock.clockType = "Answer";
        $("#timerText").text("Next question in " + game.answerTimer + " seconds");
        answerClock.start(game.answerTimer);
    } else {
        $("#nextButton").css("display", "none");
        game.showResults();
    }
},

showResults: function () {

    var updateResults = $("#results");
    var correctPara = $("<p>");
    var incorrectPara = $("<p>");
    var outOfTimePara = $("<p>");

    // clear question id and classes
    $("#timerText").css("display", "none");

    // show results in article results id
    correctPara.text("Questions correct: " + game.correct);
    incorrectPara.text("Questions incorrect: " + game.incorrect);
    outOfTimePara.text("Questions not answered: " + game.outoftime);
    $(updateResults).css("display", "inline-block");
    $(updateResults).append(correctPara);
    $(updateResults).append(incorrectPara);
    $(updateResults).append(outOfTimePara);

    // show startButton and change value attrribute to "Try again?"
    $("#startButton").css("display", "inline-block").value("Try again?");
},

}; 
// End of game object

// Start timer object
var answerClock = {

    // timer object variables
    time: "",
    clockType: "",

    start: function (newTime) {
        //console.log(answerClock.clockType);
        if (!clockRunning) {
            answerClock.time = newTime;
            //$("#timerText").css("display", "inline-block");
            intervalId = setInterval(answerClock.count, 1000);
            clockRunning = true;
            if (answerClock.clockType === "Answer") { 
                $("#timerText").text("Next question in " + newTime + " seconds");
            } else if (answerClock.clockType === "Question") {
                $("#timerText").text("There are " + newTime + " seconds left!");
            }
          }
    },

    stop: function() {
        clearInterval(intervalId);
        clockRunning= false;
        $("#timerText").text("");
        if (answerClock.clockType == "Answer") { 
            game.newQuestion();
        } else if (answerClock.clockType == "Question") {
            game.showAnswer("timesup");
        }
      }, 

    count: function() {
        answerClock.time--;
        var startString;
        var endString;
        var currentTime = answerClock.time;
        console.log(answerClock.time);

        if (answerClock.clockType == "Answer") {
            startString = "Next question in "
            if (currentTime > 1) {
                endString = " seconds!";
            } else if (currentTime == 1) {
                endString = " second!";
            } else {
                startString = "There are "
                currentTime = game.questionTimer;
                endString = " seconds left!";
                answerClock.stop();
            }
        } else if (answerClock.clockType == "Question") {
            
            if (currentTime > 1) {
                startString = "There are "
                endString = " seconds left!";
            } else if (currentTime == 1) {
                startString = "There is "
                endString = " second left!";
            } else {
                startString = "There is "
                currentTime = "no";
                endString = " time left!";
                answerClock.stop();
            }
        }      
        $("#timerText").text(startString + currentTime + endString);
    },
};
// End timer object

$(document).ready(function() {

    //On startButton click
    $(".startButton").click(function() {
        game.correct = 0;
        game.incorrect = 0;
        game.outoftime = 0;
        game.currentQuestion = 0;
        game.currentAnswer = "";
        game.newQuestion();
        $("#bottomBanner").css("display", "none");
        $("#startMessage").css("display", "none");
        $(".startButton").css("display", "none");
        $("#timerText").css("display", "inline-block");
    });

    // Display submit button after a radio button is clicked
    $(".answers").click(function() {
        $("#submitButton").css("display", "inline-block");
    });

    // On submitButton click, grab the select radio value and pass it to showAnswer function
    $("#submitButton").click(function() {
        $("#submitButton").css("display", "none");
        var userAnswer = $('input[name=quizAnswer]:checked').val();
        answerClock.stop();
        game.showAnswer(userAnswer);
    });
});