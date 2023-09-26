

const question= document.querySelector('#question');
const choices= Array.from(document.querySelectorAll('.choice-text'));
const progressText= document.querySelector('#ProgressText');
const scoreText= document.querySelector('#score');
const progressBarFull= document.querySelector('#progressBarFull');
const timerDisplay= document.querySelector('.timer');


let currentQuestion = {}
let acceptingAnswers = true
let score = 0  
let questionCounter = 0
let availableQuestions = []
let timer
let timeLeft = 15

function updateTimerDisplay(){
    timerDisplay.textContent = timeLeft<10 ? `0${timeLeft}` : timeLeft
}

function startTimer(){
    timeLeft=15
    updateTimerDisplay()
    timer = setInterval(()=>{

        if(timeLeft<=0){
            clearInterval(timer)
            timeLeft=0;
            getNewQuestions();
        }else{
            timeLeft--
            updateTimerDisplay();
        }
    },1000);
}

let questions=[
    {
        question: "What will be the return value of the write() method when the Node cannot write the data immediately and has to buffer it internally?",
        choice1:"0",
        choice2:"1",
        choice3:"True",
        choice4:"False",
        answer: 4,
    },
    {
        question: 'A promise implementation in one of its simplest forms is as follows:',
        choice1:'Var promise = new Promise( () => ());',
        choice2:'Var promise = new Promise( () -> {});',
        choice3:'Var promise = new Promise( () => []);',
        choice4:'Var promise = new Promise( () => {});',
        answer: 1,
    },
    {
        question: 'How many procedures can be run in the Program section of Easytrieve?',
        choice1:'Two procedures',
        choice2:'Three procedures',
        choice3:'Four procedures',
        choice4:'Six procedures',
        answer: 1,
    },
    {
        question: 'The ASP.NET 4.5 Framework does the following except...',
        choice1:'Helps you deliver real world web applications',
        choice2:'Provides asy programming model',
        choice3:'Inhibits the performance of an OS',
        choice4:'Provides support with visual studio and a rich class studio',
        answer: 3,
    },
    {
        question: 'What does Dynamic Language Runtime do?',
        choice1:'It is a library for creating light weight, extendable applications',
        choice2:'It provides the runtime environment for dynamic languages like Python etc',
        choice3:'It allows you to develop and build managed assembles that work on multiple .NET framework platforms',
        choice4:'It is a library of functionality which are available to all languages using .NET framework',
        answer: 2,
    },
    {
        question: 'The command to revoke read permission from owner of file is ',
        choice1:'Chmod a-r',
        choice2:'Chmod o-r',
        choice3:'Chmod g-r',
        choice4:'Chmod u-r',
        answer: 4,
    },
    {
        question: 'By default, how many lines does head show',
        choice1:'8',
        choice2:'10',
        choice3:'15',
        choice4:'5',
        answer: 2,
    },
    {
        question: 'Which command is used to remove the read permission of the file "note" from both the group and others?',
        choice1:'Chmod go+r note',
        choice2:'Chmod go+rw note',
        choice3:'Chmod go-x note',
        choice4:'Chmod go-r note',
        answer: 4,
    },
    {
        question: 'What is the command to initialize Git on the current repository?',
        choice1:'initialize git',
        choice2:'start git',
        choice3:'git init',
        choice4:'git start',
        answer: 3,
    },
    {
        question: 'What is the command to create a new branch named "new-email"?',
        choice1:'git branch new-email',
        choice2:'git branch new "new-email"',
        choice3:'git add branch "new-email"',
        choice4:'git newBranch "new-email"',
        answer: 1,
    }
    
]

const SCORE_POINTS  = 10
const MAX_QUESTIONS = 10

startGame =() =>{
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    startTimer()
    getNewQuestions()
}

getNewQuestions =() =>{
    if(availableQuestions.length===0 || questionCounter > MAX_QUESTIONS){
        clearInterval(timer)
        localStorage.setItem('mostRecentScore',score)
        return window.location.assign('/endgame.html')
    }

    questionCounter++
    document.getElementById("progressText").innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width =  `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice =>{
        const number = choice.dataset['number']
        choice.textContent = currentQuestion['choice' + number]

    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
    clearInterval(timer)
    startTimer();
}


choices.forEach(choices =>{
    choices.addEventListener('click' , e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        
        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
           
        }

        selectedChoice.parentElement.classList.add(classToApply)
        

        setTimeout(()=>{
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestions()
        },1000)
    })
})



incrementScore = num =>{
    score +=num
    scoreText.innerText=score
}

startGame()

