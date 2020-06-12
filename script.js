
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
let attempt=0;
let questionIndex=0;
let number=0;
let score=0;
let interval;


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

function load(){
    number++;
    questionText.innerHTML=myApp[questionIndex].question;
    createOptions();
    scoreBoard();
    currentQuestionNum.innerHTML=number + " / " + myApp.length;
}

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

function timeIsUp(){
    showGameOverText();
    for(let i = 0; i <optionBox.children.length; i++){
        if(optionBox.children[i].id==myApp[questionIndex].answer){
            optionBox.children[i].classList.add("show-correct");
        }
     } 
     
     disableOptions();
     showNextQuestionBtn();  
     
     if(number == myApp.length){
        quizOver();
     }
}

function startTimer(){
    let timeLimit= 15;
    remainingTime.innerHTML=timeLimit;
    remainingTime.classList.remove("less-time");
    interval = setInterval(()=>{
      timeLimit--;
      if(timeLimit < 10){
          timeLimit= "0" + timeLimit;
      }
      if(timeLimit < 6){
          remainingTime.classList.add("less-time");
      }
      remainingTime.innerHTML=timeLimit;
      if(timeLimit == 0){
          clearInterval(interval);
          timeIsUp();
      }
    },1000)
}

function stopTimer(){
    clearInterval(interval);
}

function disableOptions(){
    for(let i = 0; i <optionBox.children.length; i++){
        optionBox.children[i].classList.add("already-answered");
    }
}

function showNextQuestionBtn(){
    nextQuestionBtn.classList.add("show");
}

function hideNextQuestionBtn(){
    nextQuestionBtn.classList.remove("show");
}

function showGameOverText(){
    timeIsUpText.classList.add("show");
}

function hideGameOverText(){
    timeIsUpText.classList.remove("show");
}

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

function quizResults(){
    document.querySelector(".total-questions").innerHTML=myApp.length;
    document.querySelector(".total-attempt").innerHTML=attempt;
    document.querySelector(".total-correct").innerHTML=score;
    document.querySelector(".total-wrong").innerHTML=attempt - score;
    //document.querySelector(".total-percentage").innerHTML=myApp.length;
}

function quizOver(){
    nextQuestionBtn.classList.remove("show");
    seeResultsBtn.classList.add("show");
}

seeResultsBtn.addEventListener("click",()=>{
    quizBox.style.display="none";
    seeResultsBtn.classList.remove("show");
    quizOverBox.classList.add("show");
    quizResults();
})

window.onload=()=>{
    startTimer();
    load();
    
}
