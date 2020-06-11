
const questionText=document.querySelector(".question-text");
const optionBox=document.querySelector(".option-box");
const currentQuestionNum=document.querySelector(".current-question-num");
const nextQuestionBtn=document.querySelector(".next-question-btn");
const correctAnswer=document.querySelector(".correct-answers");
const seeResultsBtn=document.querySelector(".see-result-btn");
let questionIndex=0;
let number=0;
let score=0;

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
     }

     disableOptions();
     showNextQuestionBtn();

     if(number == myApp.length){
         quizOver();
     }
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

function scoreBoard() {
    correctAnswer.innerHTML=score;
 }

nextQuestionBtn.addEventListener("click", nextQuestion);

function nextQuestion(){
    questionIndex++;
    load();
    hideNextQuestionBtn();
}

function quizOver(){
    nextQuestionBtn.classList.remove("show");
    seeResultsBtn.classList.add("show");
}

window.onload=()=>{
    load();
}
