//arrray of the quiz questions, avaialble choices, and correct answers     
var questions = [{
        question: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        question: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        question: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        question: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    }
];




var timer = document.getElementById("timer");
var timeLeft = document.getElementById("timeLeft");
var timesUp = document.getElementById("timesUp");

var startEL = document.getElementById("intro");
var startQuizBtn = document.getElementById("startQuiz");

//Questions
var questionSectionEL = document.getElementById("questionSection");
var questionEL = document.getElementById("questionTitle");
var choiceA = document.getElementById("btn0");
var choiceB = document.getElementById("btn1");
var choiceC = document.getElementById("btn2");
var choiceD = document.getElementById("btn3");
var answerCheckEL = document.getElementById("answerCheck");

//ScoreSection
var ScoreSectionEL = document.getElementById("scoreSection");
var submitInitialBtn = document.getElementById("submitInitial");
var initialInputEL = document.getElementById("initialInput");

var highScoreSectionEL = document.getElementById("highScoreSection");
var finalScoreEL = document.getElementById("finalScore");

var goBackBtn = document.getElementById("goBack");
var clearHighScoreBtn = document.getElementById("clearHighScore");

var viewHighScore = document.getElementById("viewHighScores");
var listOfHighScores = document.getElementById("HighScoresList");


var correctAns = 0;
var questionNum = 0;
var scoreResult;
var questionIndex = 0;



// Time

var totalTime = 75;

function newQuiz() {
    questionIndex = 0;
    totalTime = 75;
    timeLeft.textContent = totalTime;
    initialInputEL.textContent = "";

    startEL.style.display = "none";
    questionSectionEL.style.display = "block";
    timer.style.display = "block";
    timesUp.style.display = "none";

    var startTimer = setInterval(function () {
        totalTime--;
        timeLeft.textContent = totalTime;
        if (totalTime <= 0) {
            clearInterval(startTimer);
            if (questionIndex < questions.length - 1) {
                gameOver();
            }
        }
    }, 1000);

    showQuiz();
};

//Questions
function showQuiz() {
    nextQuestion();
}

function nextQuestion() {
    questionEL.textContent = questions[questionIndex].question;
    choiceA.textContent = questions[questionIndex].choices[0];
    choiceB.textContent = questions[questionIndex].choices[1];
    choiceC.textContent = questions[questionIndex].choices[2];
    choiceD.textContent = questions[questionIndex].choices[3];
}

// Answers
function checkAnswer(answer) {

    if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {

        var lineBreak = document.getElementById("lineBreak");
        lineBreak.style.display = "block";

        answerCheck.style.display = "block";
        correctAns++;
        answerCheck.textContent = "Correct!";
    } else {
        answerCheck.style.display = "block";
        totalTime -= 10;
        timeLeft.textContent = totalTime;
        answerCheck.textContent = "Wrong! The correct answer is: " + questions[questionIndex].answer;
    }
    questionIndex++;
    if (questionIndex < questions.length) {
        nextQuestion();
    } else {
        // if no more question, run game over function
        gameOver();
    }
}

function chooseA() {
    checkAnswer(0);
}

function chooseB() {
    checkAnswer(1);
}

function chooseC() {
    checkAnswer(2);
}

function chooseD() {
    checkAnswer(3);
}


function gameOver() {
    ScoreSectionEL.style.display = "block";
    questionSectionEL.style.display = "none";
    startEL.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "block";

    finalScoreEL.textContent = correctAns;
}

function storeHighScores(event) {
    event.preventDefault();
    if (initialInputEL.value === "") {
        alert("Please enter your initials!");
        return;
    }

    startEL.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "none";
    ScoreSectionEL.style.display = "none";
    highScoreSectionEL.style.display = "block";

    
    var savedHighScores = localStorage.getItem("high scores");
    var scoresArray;

    if (savedHighScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedHighScores)
    }

    var userScore = {
        initials: initialInputEL.value,
        score: finalScoreEL.textContent
    };

    console.log(userScore);
    scoresArray.push(userScore);

    var scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("high scores", scoresArrayString);

    showHighScores();
}

var i = 0;

function showHighScores() {

    startEL.style.display = "none";
    timer.style.display = "none";
    questionSectionEL.style.display = "none";
    timesUp.style.display = "none";
    ScoreSectionEL.style.display = "none";
    highScoreSectionEL.style.display = "block";

    var savedHighScores = localStorage.getItem("high scores");

    if (savedHighScores === null) {
        return;
    }
    console.log(savedHighScores);

    var storedHighScores = JSON.parse(savedHighScores);

    for (; i < storedHighScores.length; i++) {
        var eachNewHighScore = document.createElement("p");
        eachNewHighScore.innerHTML = storedHighScores[i].initials + ": " + storedHighScores[i].score;
        listOfHighScores.appendChild(eachNewHighScore);
    }
}


startQuizBtn.addEventListener("click", newQuiz);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
choiceD.addEventListener("click", chooseD);

submitInitialBtn.addEventListener("click", function (event) {
    storeHighScores(event);
});

viewHighScore.addEventListener("click", showHighScores);

goBackBtn.addEventListener("click", function () {
    startEL.style.display = "block";
    highScoreSectionEL.style.display = "none";
});

clearHighScoreBtn.addEventListener("click", function () {
    window.localStorage.removeItem("high scores");
    listOfHighScores.innerHTML = "High Scores Cleared!";
    listOfHighScores.setAttribute("style", "font-family: 'Archivo', sans-serif; font-style: italic;")
});