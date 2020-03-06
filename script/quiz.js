alert("Welcome to my Quiz. Press the start button to begin. A timer will start at the begining of each question giving you 15 seconds to answer each of the questions.");

// Overall elements to the page //
var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var counter = document.getElementById("counter");
var timeGauge = document.getElementById("timeGauge");
var progress = document.getElementById("progress");
var scoreDiv = document.getElementById("scoreContainer");

// Questions the user will answer over the Quiz. //
let questions = [
    {
        question : "Who invented JavaScript?",
        imgSrc : "img/html.png",
        choiceA : "Brendan Eich",
        choiceB : "Sheryl Sandberg",
        choiceC : "Douglas Crockford",
        correct : "A"
    },{
        question : "Which one of these is a JavaScript package manager?",
        imgSrc : "img/css.png",
        choiceA : "TypeScript",
        choiceB : "npm",
        choiceC : "Node.js",
        correct : "B"
    },{
        question : "Which tool can you use to ensure code quality?",
        imgSrc : "img/js.png",
        choiceA : "jQuery",
        choiceB : "Angular",
        choiceC : "ESLint",
        correct : "C"
    }
];

// Event set to start quiz
start.addEventListener("click",startQuiz);

// create some variables used for the timer and question points.

var lastQuestion = questions.length - 1;
var runningQuestion = 0;
var count = 0;
var questionTime = 15; // 15s
var gaugeWidth = 150; // 150px
var gaugeUnit = gaugeWidth / questionTime;
var TIMER;
var score = 0;

// Function to bring forth the questions to the user. //
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

// Function for the button at the begining to start the quiz. //
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000);
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}

