const questions = [
    {
    questions: "ra feri miigeba yviteli da lurji feris sherevit",
    answers:[
        {text: "shavi", correct:false},
        {text: "mwvane", correct:true},
        {text: "iasamnisferi", correct:false},
        {text: "stafilosferi", correct:false},
    ]
},{
    questions: "ro avxtet...",
    answers:[
        {text: "davardebit", correct:false},
        {text: "waviqcevit", correct:false},
        {text: "davdgebit", correct:false},
        {text: "gavfrindebit", correct:true},
    ]
},{
    questions: "romel fortoxlis wvens aqvs kargi gemo",
    answers:[
        {text: "fanta", correct:false},
        {text: "mirinda", correct:false},
        {text: "fortoxlis wveni", correct:true},
        {text: "vashli", correct:false},
    ]
},{
    questions: "ra aris cisartyelas qvesh",
    answers:[
        {text: "gandzi", correct:true},
        {text: "yvavilebi", correct:false},
        {text: "sachmeli", correct:false},
        {text: "dinozavris kvercxi", correct:false},
    ]
},{
    questions: "romeli aris dabali",
    answers:[
        {text: "juja", correct:false},
        {text: "elfi", correct:false},
        {text: "feria", correct:true},
        {text: "goblini", correct:false},
    ]
}
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButtons = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButtons.innerHTML = "Next";
    showQuestions();
}

function showQuestions(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNO = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNO + ". " + currentQuestion.questions;

    currentQuestion.answers.forEach(answers => {
        const button = document .createElement("button");
        button.innerHTML = answers.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answers.correct){
            button.dataset.correct = answers.correct;
        }
        button.addEventListener('click',selectAnswer)
    })
}

function resetState(){
    nextButtons.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButtons.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `you score ${score} out of ${questions.length}`;
    nextButtons.innerHTML = "Play Again";
    nextButtons.style.display = "block";
}

function handleNextButtoon(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestions();
    }else{
        showScore();
    }
}

nextButtons.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButtoon();
    }else{
        startQuiz();
    }
})


startQuiz();