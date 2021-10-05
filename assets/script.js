
//Start button
var starBtnEL = document.getElementById("start");

//intro
var introEL = document.getElementById("intro");

//start quiz
starBtnEL.addEventListener("click", startGame);

//score
var finalScoreEL = document.getElementById("finalScore");

//questions
var questionEL = document.getElementById("question");
var quizEL = document.getElementById("quiz");


const questions = [ 
    {
        question: "Commonly used data types do NOT include:",
        answers: ["strings", "booleans", "alerts", "numbers"],
        correctAnswer: "booleans"
    },
    {
        question: "The condition in an if / else statement is enclosed within ____.",
        answers: ["quotes", "curly brackets", "parentheses", "square brackets"],
        correctAnswer: "quotes"
    },
    {
        question: "Arrays in Javascript can be used to store ____.",
        answers: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        correctAnswer: "booleans"
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answers: ["commmas", "curly brackets", "quotes", "parentheses"],
        correctAnswer: "curly brackets"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["Javascript", "terminal/bash", "for loops", "console.log"],
        correctAnswer: "for loops"
    }
];

//answers
var answerOptionsEL = document.querySelector(".answerOptions");
var answer1EL = document.getElementById("answer1");
var answer2EL = document.getElementById("answer2");
var answer3EL = document.getElementById("answer3");
var answer4EL = document.getElementById("answer4");


//Time
var secondsLeft = 75;
var timeEL = document.querySelector(".time");



// Start Game
function startGame() {
    quizEL.style.display ="block";
    questionEL.style.display = "block";
    answer1EL.style.display = "block";
    introEL.style.display = "none";
    finalScoreEL.style.display = "none";

    var timeInterval = setInterval(function() {
        timeEL.textContent = "Time:" + secondsLeft + "s";
        secondsLeft-=1;

        if(secondsLeft === 0 || questions.length === runningQuestionIndex+1)  {
            resultRender();
            clearInterval(timeInterval);
            timeEL.textContent = "Time:" + secondsLeft + "s";
         }
    }, 1000);

    renderQuestion();
};


// Display Questions 
var lastQuestionIndex = question.length -1;
var runningQuestionIndex = 0;    

function renderQuestion() {
    var questionNumber = questions[runningQuestionIndex];
    questionEL.innerHTML = questionNumber.question;
    answer1EL.innerHTML = questionNumber.answers[0];
    answer2EL.innerHTML = questionNumber.answers[1];
    answer3EL.innerHTML = questionNumber.answers[2];
    answer4EL.innerHTML = questionNumber.answers[3];
};


// Check Answers
function checkAnswer(answer) {
    if(questions[runningQuestionIndex].correctAnswer == answer) {
        answerOutput.textContent = "Correct!"
    }
    else {
       answerOutput.textContent = "Wrong!"
       timeLeft -=10;
    }

    if (questions.length === runningQuestionIndex+1) {
        resultRender(); // If it has gone through all questions, show final score
        return;
    }
        runningQuestionIndex++;
        renderQuestion();
    };   