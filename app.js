
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const scoreButton = document.getElementById('score-btn')

const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonElement = document.getElementById('answer-buttons')
const scoreDisplay = document.getElementById('right-answer')

let shuffledQuestions, currentQuestionsIndex
let quizScore = 0

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionsIndex++
  setNextQuestion()
})


function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - 0.5)
  currentQuestionsIndex = 0
  quizScore = 0
  scoreDisplay.innerText = quizScore
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionsIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonElement.appendChild(button)
  })
}

function resetState() {
  nextButton.classList.add('hide')
  while (answerButtonElement.firstChild) {
    answerButtonElement.removeChild(answerButtonElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct

  Array.from(answerButtonElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
    button.disabled = true // prevent double click
  })

  if (correct === "true") {
    quizScore++
  }

  scoreDisplay.innerText = quizScore

  if (shuffledQuestions.length > currentQuestionsIndex + 1) {
    nextButton.classList.remove("hide")
  } else {
    startButton.innerText = "Restart"
    startButton.classList.remove("hide")
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct === "true") {
    element.classList.add("correct")
  } else {
    element.classList.add("wrong")
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "HyperText Markup Language", correct: true },
      { text: "HighText Markdown Language", correct: false },
      { text: "HyperTool Multi Language", correct: false },
      { text: "HyperText Multi Language", correct: false }
    ]
  },
  {
    question: "Which HTML tag is used for the largest heading?",
    answers: [
      { text: "<heading>", correct: false },
      { text: "<h6>", correct: false },
      { text: "<h1>", correct: true },
      { text: "<head>", correct: false }
    ]
  },
  {
    question: "Which HTML attribute is used to define inline styles?",
    answers: [
      { text: "font", correct: false },
      { text: "style", correct: true },
      { text: "class", correct: false },
      { text: "design", correct: false }
    ]
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Computer Style Sheets", correct: false },
      { text: "Creative Style System", correct: false },
      { text: "Cascading Style Sheets", correct: true },
      { text: "Colorful Style Sheets", correct: false }
    ]
  },
  {
    question: "Which property is used to change the text color in CSS?",
    answers: [
      { text: "color", correct: true },
      { text: "font-color", correct: false },
      { text: "text-style", correct: false },
      { text: "style-color", correct: false }
    ]
  },
  {
    question: "Which CSS property controls the text size?",
    answers: [
      { text: "text-size", correct: false },
      { text: "font-style", correct: false },
      { text: "font-size", correct: true },
      { text: "text-style", correct: false }
    ]
  },
  {
    question: "Which HTML tag is used to link CSS?",
    answers: [
      { text: "<style>", correct: false },
      { text: "<script>", correct: false },
      { text: "<css>", correct: false },
      { text: "<link>", correct: true }
    ]
  },
  {
    question: "How do you write a comment in CSS?",
    answers: [
      { text: "// comment", correct: false },
      { text: "<!-- comment -->", correct: false },
      { text: "/* comment */", correct: true },
      { text: "# comment", correct: false }
    ]
  },
  {
    question: "Inside which HTML element do we put JavaScript?",
    answers: [
      { text: "<script>", correct: true },
      { text: "<js>", correct: false },
      { text: "<javascript>", correct: false },
      { text: "<code>", correct: false }
    ]
  },
  {
    question: "How do you write a comment in JavaScript?",
    answers: [
      { text: "/* comment */", correct: true },
      { text: "// comment", correct: true },
      { text: "<!-- comment -->", correct: false },
      { text: "# comment", correct: false }
    ]
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    answers: [
      { text: "let", correct: true },
      { text: "int", correct: false },
      { text: "var", correct: true },
      { text: "define", correct: false }
    ]
  },
  {
    question: "What is the correct syntax for referring to an external script?",
    answers: [
      { text: "<script src='app.js'>", correct: true },
      { text: "<script href='app.js'>", correct: false },
      { text: "<script ref='app.js'>", correct: false },
      { text: "<script name='app.js'>", correct: false }
    ]
  },
  {
    question: "How do you write 'Hello World' in an alert box in JavaScript?",
    answers: [
      { text: "alertBox('Hello World');", correct: false },
      { text: "msg('Hello World');", correct: false },
      { text: "alert('Hello World');", correct: true },
      { text: "msgBox('Hello World');", correct: false }
    ]
  },
  {
    question: "Which operator is used to assign a value to a variable in JavaScript?",
    answers: [
      { text: "*", correct: false },
      { text: "=", correct: true },
      { text: "-", correct: false },
      { text: "+", correct: false }
    ]
  },
  {
    question: "Which event occurs when the user clicks on an HTML element?",
    answers: [
      { text: "onmouseover", correct: false },
      { text: "onmouseclick", correct: false },
      { text: "onclick", correct: true },
      { text: "onchange", correct: false }
    ]
  }
];
