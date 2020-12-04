var question = document.getElementById("question");
var choices = Array.from(document.getElementsByClassName("choice-text"));
var questionCounterText = document.getElementById('questionCounter');
var scoreText = document.getElementById('score');

var currentQuestion = {};
var acceptingAnswers = false;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];

var questions = [

    {
        question: "In which HTML element do we put the JavaScript?",
        choice1: "<scripting>",
        choice2: "<script>",
        choice3: "<javascript>",
        choice4: "<js>",
        answer: 2
    },
    {
        question: "The condition in an if/else statement is enclosed within ______.",
        choice1: "quotes",
        choice2: "curly brackets",
        choice3: "parenthesis",
        choice4: "square brackets",
        answer: 2
    },
    {
        question: "Arrays in JavaScript can be used to store ______.",
        choice1: "numbers and strings",
        choice2: "other arrays",
        choice3: "booleans",
        choice4: "all of the above",
        answer: 4
    },
    {
        question: "String values must be enclosed within ______ when being assigned to variables.",
        choice1: "commas",
        choice2: "curly brackets",
        choice3: "quotes",
        choice4: "parenthesis",
        answer: 3
    },
    {
        question: "Commonly used data types DO NOT include:",
        choice1: "strings",
        choice2: "booleans",
        choice3: "alerts",
        choice4: "numbers",
        answer: 3
    }

]

const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign('end.html');
    }
    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;

};


choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);

    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = 0;

            return window.location.assign('end.html');
        }
    }, 1000);

}
console.log()

window.onload = function () {
    var quizTimeDisplay = 60 * 1.25,
        display = document.querySelector('#time');
    startTimer(quizTimeDisplay, display);

};

startGame();




















