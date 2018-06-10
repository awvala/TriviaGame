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
    nextQuestion: 0,
    currentAnswer: "",
    userAnswr: "",
    questionTimer: 10,
    answerTimer: 10,

    slidearr: [
        // Array Config:  Question string, Answer 1 string, Answer 2 st4ring, Answer 3 string, Answwer 4 string, corrent answer number
        ["Question 0", "Answer 1", "Answer 2", "Answer 3", "Answer 4", 2, "assets/images/kyudo0.gif"],
        ["Question 1", "Answer 1", "Answer 2", "Answer 3", "Answer 4", 3, "https://j.gifs.com/L8pZBA.gif"],
        ["Question 2", "Answer 1", "Answer 2", "Answer 3", "Answer 4", 1, "assets/images/kyudo2.gif"],
        ["Question 3", "Answer 1", "Answer 2", "Answer 3", "Answer 4", 4, "https://j.gifs.com/rRG2V4.gif"],
        ["Question 4", "Answer 1", "Answer 2", "Answer 3", "Answer 4", 3, "assets/images/kyudo4.gif"],
        ["Question 5", "Answer 1", "Answer 2", "Answer 3", "Answer 4", 4, "https://j.gifs.com/2vp8D1.gif"],
        ["Question 6", "Answer 1", "Answer 2", "Answer 3", "Answer 4", 2, "assets/images/kyudo6.gif"],
        ["Question 7", "Answer 1", "Answer 2", "Answer 3", "Answer 4", 3, "assets/images/kyudo7.gif"],
        ["Question 8", "Answer 1", "Answer 2", "Answer 3", "Answer 4", 4, "assets/images/kyudo8.gif"],
        ["Question 9", "Answer 1", "Answer 2", "Answer 3", "Answer 4", 1, "assets/images/kyudo9.gif"],
        ["Question 10", "Answer 1", "Answer 2", "Answer 3", "Answer 4", 1, "assets/images/kyudo10.gif"],
        ["Question 11", "Answer 1", "Answer 2", "Answer 3", "Answer 4", 4, "assets/images/kyudo11.gif"],
        ["Question 12", "Answer 1", "Answer 2", "Answer 3", "Answer 4", 3, "assets/images/kyudo12.gif"],
        ["Question 13", "Answer 1", "Answer 2", "Answer 3", "Answer 4", 2, "assets/images/kyudo13.gif"],
        ["Question 14", "Answer 1", "Answer 2", "Answer 3", "Answer 4", 1, "https://j.gifs.com/rRG2B4.gif"],
    ],

newQuestion: function () {
    // Hide previous answer id's and classes
    game.currentQuestion =  game.nextQuestion;
    var questionIndex = game.currentQuestion;
    game.nextQuestion = questionIndex +1;
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
    game.currentAnswer = game.slidearr[questionIndex][5];
    answerClock.clockType = "Question";
    answerClock.start(game.questionTimer);
},

showAnswer: function () {
    var userAnswer = game.userAnswr;
    //console.log ("user " + userAnswer + " current " + game.currentAnswer);
    if (userAnswer == game.currentAnswer) {
        game.correct ++;
        //console.log("correct");
        $("#questionAndResponse").text("Correct!");
    } else if (userAnswer == "") {
        game.outoftime ++;
        //console.log("out of time");
        $("#questionAndResponse").text("Out of Time!");
    } else {
        game.incorrect ++;
        //console.log("incorrect");
        $("#questionAndResponse").text("Incorrect!");
    }
    $("#correctAnswer").text("Correct Answer: " + game.slidearr[game.currentQuestion][game.currentAnswer]);
    $("#results").css("display", "inline-block");
    game.userAnswr = "";

// then clear id buttonBox of question and display answers for 10 seconds
    $('input[name=quizAnswer]').prop('checked', false);
    $(".answers").css("display", "inline-block");
    $(".answers").css("display", "none");
    $("#submitButton").css("display", "none");
    $("#gifAnswer").attr("src", game.slidearr[game.currentQuestion][6]);
    $("#gifAnswer").css("display", "inline-block");
    answerClock.clockType = "Answer";
    $("#timerText").text("Next question in " + game.answerTimer + " seconds");
    answerClock.start(game.answerTimer);
},

showResults: function () {

    var updateResults = $("#results");
    var correctPara = $("<p class ='newResults'>");
    var incorrectPara = $("<p class ='newResults'>");
    var outOfTimePara = $("<p class ='newResults'>");

    // clear question id and classes
    $("#timerText").css("display", "none");
    $("#questionAndResponse").css("display", "none");
    $("#correctAnswer").css("display", "none");
    $("#gifAnswer").css("display", "none");
    $("#learnMore").css("display", "block");
    $("iframe").css("display", "inline-block");

    // show results in article results id
    correctPara.text("Questions correct: " + game.correct);
    incorrectPara.text("Questions incorrect: " + game.incorrect);
    outOfTimePara.text("Questions not answered: " + game.outoftime);
    $(updateResults).css("display", "inline-block");
    $(updateResults).append(correctPara);
    $(updateResults).append(incorrectPara);
    $(updateResults).append(outOfTimePara);

    // show startButton and change value attribute to "Try again?"
    $(".startButton").css("display", "inline-block").attr("value","Try again?");
},

}; 
// End of game object

// Start timer object
var answerClock = {

    // timer object variables
    time: "",
    clockType: "",

    start: function (newTime) {
        if (!clockRunning) {
            answerClock.time = newTime;
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

        if (answerClock.clockType === "Answer") { 
            if (game.currentQuestion < game.slidearr.length-1) {
                game.newQuestion();
            } else {
                game.showResults();
            }
        } else if (answerClock.clockType === "Question") {
            game.showAnswer();
        }
      }, 

    count: function() {
        answerClock.time--;
        var startString;
        var endString;
        var currentTime = answerClock.time;

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
        game.nextQuestion = 0;
        game.currentAnswer = "";
        game.newQuestion();
        $("#bottomBanner").css("display", "none");
        $("#learnMore").css("display", "none");
        $("#startMessage").css("display", "none");
        $(".startButton").css("display", "none");
        $("#timerText").css("display", "inline-block");
        $(".newResults").text("");
        $("#questionAndResponse").css("display", "block");
        $("#correctAnswer").css("display", "inline-block");
    });

    // Display submit button after a radio button is clicked
    $(".answers").click(function() {
        $("#submitButton").css("display", "inline-block");
    });

    // On submitButton click, grab the select radio value and pass it to showAnswer function
    $("#submitButton").click(function() {
        $("#submitButton").css("display", "none");
        game.userAnswr = $('input[name=quizAnswer]:checked').val();
        answerClock.stop();
    });
});