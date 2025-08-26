const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");

const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonElement = document.getElementById("answer-buttons");
const scoreDisplay = document.getElementById("right-answer");

let shuffledQuestions, currentQuestionsIndex;
let quizScore = 0;

startButton.addEventListener("click", startGame);

nextButton.addEventListener("click", () => {
  currentQuestionsIndex++;
  setNextQuestion();
});

// -------------------- MAIN FUNCTIONS -------------------- //
async function startGame() {
  startButton.classList.add("hide");
  quizScore = 0;
  scoreDisplay.innerText = quizScore;

  const fetchedQuestions = await fetchQuestions();
  shuffledQuestions = fetchedQuestions.sort(() => Math.random() - 0.5);
  currentQuestionsIndex = 0;

  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionsIndex]);
}

function showQuestion(question) {
  questionElement.innerHTML = decodeHTML(question.question);
  question.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = decodeHTML(answer.text);
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonElement.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add("hide");
  while (answerButtonElement.firstChild) {
    answerButtonElement.removeChild(answerButtonElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;

  Array.from(answerButtonElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
    button.disabled = true; // prevent clicking again
  });

  if (correct === "true") {
    quizScore++;
  }

  scoreDisplay.innerText = quizScore;

  if (shuffledQuestions.length > currentQuestionsIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct === "true") {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

async function fetchQuestions() {
  try {
    // Get 10 random multiple-choice questions
    const res = await fetch("https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple");
    const data = await res.json();

    return data.results.map(q => {
      const answers = q.incorrect_answers.map(a => ({ text: a, correct: false }));
      const correctAnswer = { text: q.correct_answer, correct: true };

      answers.splice(Math.floor(Math.random() * (answers.length + 1)), 0, correctAnswer);

      return {
        question: q.question,
        answers: answers
      };
    });
  } catch (err) {
    console.error("Error fetching questions:", err);
    return [];
  }
}

function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}
