const questions = [
  "Tell me about yourself.",
  "Why do you want to work here?",
  "What are your strengths and weaknesses?",
  "Where do you see yourself in 5 years?",
  "Explain a project you’ve worked on recently.",
  "What is your experience with JavaScript?",
  "How do you handle tight deadlines?",
  "How do you debug code?",
  "What motivates you?",
  "Do you prefer working in a team or alone?"
];

let currentQuestion = 0;
let timerDuration = 30 * 60; // 30 minutes in seconds
let timerEl = document.getElementById("timer");
let questionEl = document.getElementById("question");

function displayQuestion() {
  if (currentQuestion < questions.length) {
    questionEl.textContent = `Q${currentQuestion + 1}: ${questions[currentQuestion]}`;
    document.getElementById("answerInput").value = "";
  } else {
    endInterview();
  }
}

function nextQuestion() {
  currentQuestion++;
  displayQuestion();
}

function endInterview() {
  questionEl.innerHTML = "<strong>🎉 Interview Complete!</strong><br>Thank you for participating.";
  document.getElementById("answerInput").style.display = "none";
  document.querySelector("button").style.display = "none";
  timerEl.style.display = "none";
}

// Timer countdown
function startTimer() {
  const timerInterval = setInterval(() => {
    const mins = Math.floor(timerDuration / 60);
    const secs = timerDuration % 60;
    timerEl.textContent = `⏱️ Time Left: ${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    if (timerDuration <= 0) {
      clearInterval(timerInterval);
      endInterview();
    }

    timerDuration--;
  }, 1000);
}

// Initialize
displayQuestion();
startTimer();
