//varibles for the code quiz
const questionText=document.querySelector(".question-text");
const optionBox=document.querySelector(".option-box");
const currentQuestionNum=document.querySelector(".current-question-num");
const nextQuestionBtn=document.querySelector(".next-question-btn");
const correctAnswer=document.querySelector(".correct-answers");
const seeResultsBtn=document.querySelector(".see-result-btn");
const remainingTime=document.querySelector(".remaining-time");
const timeIsUpText=document.querySelector(".time-up-text");
const quizHome=document.querySelector(".quiz-home-box");
const quizBox= document.querySelector(".quiz-box");
const quizOverBox=document.querySelector(".quiz-over-box");
const startAgainQuizBtn=document.querySelector(".start-again-quiz-btn");
const seeHighScoreBtn=document.querySelector(".high-score-btn");
const highScoreBox=document.querySelector(".highscore-box");
const goHomeBtn=document.querySelector(".go-to-home-btn");
const startQuizBtn=document.querySelector(".start-quiz-btn");
let attempt=0;
let questionIndex=0;
let number=0;
let score=0;
let myArray=[];
let interval;

// Varibles for the name to go on high score board
let fullNameInput = document.querySelector("#fullName");
let correctAnswersInput = document.querySelector("#total-correct");
let submitBtn = document.querySelector("#Submit");
let msgDiv = document.querySelector("#msg");
let userFullNameSpan = document.querySelector("#user-name");
let userCorrectSpan = document.querySelector("#user-correct");


//question and options and answers
//array of objects
myApp=[
    {
        question: "Can you name two programming paradigms important for JavaScript app developers?",
        options: ["Prototypal and Functional", "Directional and Prototypal", "Functional and Directional","Directional and flow"],
        answer: 0,
    },
    {
        question: "Select one answer that identifys with Functional Programming?",
        options: ["Hard function compostion", "Pure functions and function purity", "feature of Javascript","side effects"],
        answer: 1,  
    },
    {
        question: "Select one answer that identifys with favor object composition over class inheritance mean?",
        options: ["tight coupling", "brittle base class", "Aviod class hierarchies","rigid taxonomy"],
        answer: 2,  
    },
    {
        question: "How can you detect the client's browser name?",
        options: ["client.navName", "navigator.appName", "browser.name","web.name"],
        answer: 1,  
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        options: ["onmouseover", "onmouseclick", "onchange","onclick"],
        answer:3,  
    },
]

// function to load the questions
function load(){
    number++;
    questionText.innerHTML=myApp[questionIndex].question;
    createOptions();
    scoreBoard();
    currentQuestionNum.innerHTML=number + " / " + myApp.length;
}
//function and loop for questions 
function createOptions(){
    optionBox.innerHTML="";
    for(let i =0; i < myApp[questionIndex].options.length; i++){
        const option=document.createElement("div");
        option.innerHTML=myApp[questionIndex].options[i];
        option.classList.add("option"); 
        option.id=i;
        option.setAttribute("onclick", "check(this)");
        optionBox.appendChild(option);
    }
}

//function to check if the answer is corret or wrong 
function check(ele){
     const id=ele.id;
     if(id == myApp[questionIndex].answer){
        ele.classList.add("correct");
        score++;
        scoreBoard();
     }
     else {
        ele.classList.add("wrong");
         
        for(let i = 0; i <optionBox.children.length; i++){
           if(optionBox.children[i].id==myApp[questionIndex].answer){
               optionBox.children[i].classList.add("show-correct");
           }
        }
     }

     attempt++;
     disableOptions();
     showNextQuestionBtn();
     stopTimer();

     if(number == myApp.length){
         quizOver();
     }
}

//function for when time is up
function timeIsUp(){
    showGameOverText();
    for(let i = 0; i <optionBox.children.length; i++){
        if(optionBox.children[i].id==myApp[questionIndex].answer){
            optionBox.children[i].classList.add("show-correct");
        }
     } 
     
     disableOptions();
     showResultsBtn();  
     
     if(number == myApp.length){
        quizOver();
     }
}

//function to start timer
function startTimer(){
    let timeLimit= 10;
    remainingTime.innerHTML=timeLimit;
    remainingTime.classList.remove("less-time");
    interval = setInterval(()=>{
      timeLimit--;
      if(timeLimit < 7){
          timeLimit= "0" + timeLimit;
      }
      if(timeLimit < 4){
          remainingTime.classList.add("less-time");
      }
      remainingTime.innerHTML=timeLimit;
      if(timeLimit == 0){
          clearInterval(interval);
          timeIsUp();
      }
     
    },1000)
}

//function to stop timer once the question is answered
function stopTimer(){
    clearInterval(interval);
}
//function to disable other options once the question is answered
function disableOptions(){
    for(let i = 0; i <optionBox.children.length; i++){
        optionBox.children[i].classList.add("already-answered");
    }
}
//function to show the next question btn
function showNextQuestionBtn(){
    nextQuestionBtn.classList.add("show");
}
//function to hide next question btn
function hideNextQuestionBtn(){
    nextQuestionBtn.classList.remove("show");
}
//function to show results btn
function showResultsBtn(){
    seeResultsBtn.classList.add("show");
}
//function to show game over text
function showGameOverText(){
    timeIsUpText.classList.add("show");
}
//function to hide game over text 
function hideGameOverText(){
    timeIsUpText.classList.remove("show");
}
//function or the score
function scoreBoard() {
    correctAnswer.innerHTML=score;
 }

nextQuestionBtn.addEventListener("click", nextQuestion);

function nextQuestion(){
    questionIndex++;
    load();
    hideNextQuestionBtn();
    hideGameOverText();
    startTimer(); 
     
}
//function for the quizz results page
function quizResults(){
    document.querySelector(".total-questions").innerHTML=myApp.length;
    document.querySelector(".total-attempt").innerHTML=attempt;
    document.querySelector(".total-correct").innerHTML=score;
    document.querySelector(".total-wrong").innerHTML=attempt - score;
    const percentage=(score/myApp.length)*100;
    document.querySelector(".total-percentage").innerHTML=percentage + "%";
}
//function to reset the quiz
function resetQuiz(){
    attempt=0;
    questionIndex=-1;
    number=0;
    score=0;
    myArray=[];
}
// function for quizz over
function quizOver(){
    nextQuestionBtn.classList.remove("show");
    seeResultsBtn.classList.add("show");
}

seeResultsBtn.addEventListener("click",()=>{
    quizBox.classList.remove("show");
    seeResultsBtn.classList.remove("show");
    quizOverBox.classList.add("show");
    quizResults();
})

startAgainQuizBtn.addEventListener("click",()=>{
    quizBox.classList.add("show");
    quizOverBox.classList.remove("show");
    resetQuiz();
    nextQuestion();
})

seeHighScoreBtn.addEventListener("click",()=>{
    quizOverBox.classList.remove("show");
    highScoreBox.classList.add("show");
})

goHomeBtn.addEventListener("click",()=>{
    highScoreBox.classList.remove("show");
    quizHome.classList.add("show");
})

startQuizBtn.addEventListener("click", ()=>{
    quizBox.classList.add("show");
    quizHome.classList.remove("show");
    resetQuiz();
    nextQuestion();
    
})

//to add full name to highest score
renderLastRegistered();

function displayMessage(type, message) {
  msgDiv.textContent = message;
  msgDiv.setAttribute("class", type);
}

function renderLastRegistered() {
  let fullName = localStorage.getItem("user-name");
  let userCorrect = localStorage.getItem("user-correct");

  if (!fullName || !userCorrect) {
    return;
  }

  userFullNameSpan.textContent = fullName;
  userCorrectSpan.textContent = userCorrect;
}

submitBtn.addEventListener("click", function(event) {
  event.preventDefault();

  let fullName = document.querySelector("#fullName").value;
  let userCorrect = document.querySelector(".total-correct").innerHTML=score;

  if (fullName === "") {
    displayMessage("error", "Full Name cannot be blank");
  } else {
    displayMessage("success", "Registered successfully");

    localStorage.setItem("user-name", fullName);
    localStorage.setItem("user-correct", userCorrect);
    renderLastRegistered();
  }
});

