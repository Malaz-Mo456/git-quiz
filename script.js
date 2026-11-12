const questions = [
  {
    text: "Which command creates a new branch and switches to it?",
    choices: [
      "git branch -d feature",
      "git checkout -b feature",
      "git merge feature",
    ],
    correct: 1,
  },
  {
    text: "Which command copies a remote repository to your computer?",
    choices: ["git clone", "git push", "git commit"],
    correct: 0,
  },
  {
    text: "Which command sends your commits to GitHub?",
    choices: ["git pull", "git add", "git push"],
    correct: 2,
  },
  {
    text: "In the Feature Branch Workflow, where do you merge a finished feature?",
    choices: ["The Main branch", "A new repository", "Your local folder only"],
    correct: 0,
  },
  {
    text: "Which key do you copy to GitHub when using SSH?",
    choices: ["The private key", "The public key (.pub)", "Your password"],
    correct: 1,
  },
  {
  text: "Which command creates a new Git repository?",
  choices: ["git push", "git init", "git pull"],
  correct: 1
},
{
  text: "Which command saves changes to the local repository?",
  choices: ["git commit", "git clone", "git fetch"],
  correct: 0
},
{
  text: "Which command uploads local commits to GitHub?",
  choices: ["git status", "git add", "git push"],
  correct: 2
},
{
  text: "Which command downloads a repository from GitHub?",
  choices: ["git merge", "git clone", "git commit"],
  correct: 1
},
{
  text: "Which command adds files to the staging area?",
  choices: ["git add", "git log", "git branch"],
  correct: 0
}
];

let current = 0;
let score = 0;
let answered = false;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const feedbackEl = document.getElementById("feedback");
const progressEl = document.getElementById("progress");
const nextBtn = document.getElementById("next");
const quizEl = document.getElementById("quiz");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart");

function showQuestion() {
  answered = false;
  const q = questions[current];
  progressEl.textContent =
    "Question " + (current + 1) + " of " + questions.length;
  questionEl.textContent = q.text;
  feedbackEl.textContent = "";
  answersEl.innerHTML = "";
  nextBtn.classList.add("hidden");

  q.choices.forEach(function (choice, index) {
    const btn = document.createElement("button");
    btn.className = "answer";
    btn.textContent = choice;
    btn.addEventListener("click", function () {
      checkAnswer(index, btn);
    });
    answersEl.appendChild(btn);
  });
}

function checkAnswer(index, btn) {
  if (answered) return;
  answered = true;
  const q = questions[current];
  const buttons = answersEl.querySelectorAll(".answer");

  if (index === q.correct) {
    score++;
    btn.classList.add("correct");
    feedbackEl.textContent = "Correct!";
  } else {
    btn.classList.add("wrong");
    buttons[q.correct].classList.add("correct");
    feedbackEl.textContent = "Wrong answer.";
  }
  nextBtn.classList.remove("hidden");
}

function showResult() {
  quizEl.classList.add("hidden");
  progressEl.textContent = "";
  resultEl.classList.remove("hidden");
  scoreEl.textContent = score + " / " + questions.length;
}

nextBtn.addEventListener("click", function () {
  current++;
  if (current < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

restartBtn.addEventListener("click", function () {
  current = 0;
  score = 0;
  resultEl.classList.add("hidden");
  quizEl.classList.remove("hidden");
  showQuestion();
});

showQuestion();
