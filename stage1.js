const quizData = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Trainer Markup Language", "HyperText Markup Language", "HyperText Markdown Language", "HighText Markup Language"],
    answer: "HyperText Markup Language"
  },
  {
    question: "Which tag is used to define an internal style sheet in HTML?",
    options: ["<style>", "<css>", "<script>", "<head>"],
    answer: "<style>"
  },
  {
    question: "Which HTML element is used to display a numbered list?",
    options: ["<ul>", "<ol>", "<dl>", "<li>"],
    answer: "<ol>"
  },
  {
    question: "What is the correct syntax to reference an external JavaScript file?",
    options: ["<script href='app.js'>", "<script name='app.js'>", "<script src='app.js'>", "<js src='app.js'>"],
    answer: "<script src='app.js'>"
  },
  {
    question: "Which property is used in CSS to change text color?",
    options: ["font-color", "text-color", "color", "background-color"],
    answer: "color"
  },
  {
    question: "Which of the following is not a JavaScript data type?",
    options: ["Undefined", "Number", "Float", "Boolean"],
    answer: "Float"
  },
  {
    question: "Which JavaScript method is used to write on browser console?",
    options: ["console.write()", "document.write()", "window.alert()", "console.log()"],
    answer: "console.log()"
  },
  {
    question: "What does DOM stand for?",
    options: ["Document Object Model", "Data Object Model", "Document Oriented Model", "Dynamic Object Management"],
    answer: "Document Object Model"
  },
  {
    question: "Which keyword is used to declare a constant in JavaScript?",
    options: ["var", "let", "constant", "const"],
    answer: "const"
  },
  {
    question: "In Java, which keyword is used to inherit a class?",
    options: ["this", "super", "extends", "implements"],
    answer: "extends"
  },
  {
    question: "What is the default value of a boolean variable in Java?",
    options: ["true", "false", "0", "null"],
    answer: "false"
  },
  {
    question: "Which method is used to start a thread in Java?",
    options: ["run()", "execute()", "start()", "begin()"],
    answer: "start()"
  },
  {
    question: "What is the correct syntax to create an object in JavaScript?",
    options: ["let obj = {}", "let obj = new Object()", "Both A and B", "Object.create(obj)"],
    answer: "Both A and B"
  },
  {
    question: "What does the 'this' keyword refer to in JavaScript?",
    options: ["It refers to the previous function", "It refers to the parent object", "It refers to the current object", "It is a reserved keyword with no meaning"],
    answer: "It refers to the current object"
  },
  {
    question: "Which method is used to convert JSON string into a JavaScript object?",
    options: ["JSON.parse()", "JSON.stringify()", "JSON.convert()", "JSON.objectify()"],
    answer: "JSON.parse()"
  },
  {
    question: "Which CSS property is used to make text bold?",
    options: ["font-weight", "text-style", "font-style", "weight"],
    answer: "font-weight"
  },
  {
    question: "Which of the following is used to group multiple elements and apply CSS?",
    options: ["<div>", "<p>", "<section>", "<span>"],
    answer: "<div>"
  },
  {
    question: "In Java, what is the size of an int variable?",
    options: ["2 bytes", "4 bytes", "8 bytes", "Depends on system"],
    answer: "4 bytes"
  },
  {
    question: "Which HTML tag is used to display an image?",
    options: ["<img>", "<image>", "<pic>", "<src>"],
    answer: "<img>"
  },
  {
    question: "Which operator is used to compare value and type in JavaScript?",
    options: ["==", "===", "!=", "<>"],
    answer: "==="
  }
];


// Repeat or expand list to reach 20 questions.
while (quizData.length < 20) {
  quizData.push(...quizData.slice(0, 20 - quizData.length));
}

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const resultEl = document.getElementById('result');
const nextBtn = document.getElementById('nextBtn');
const currentEl = document.getElementById('current');

function loadQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = '';
  nextBtn.disabled = true;

  q.options.forEach(opt => {
    const div = document.createElement('div');
    div.className = 'option';
    div.textContent = opt;
    div.onclick = () => selectOption(div, q.answer);
    optionsEl.appendChild(div);
  });

  currentEl.textContent = currentQuestion + 1;
  resultEl.textContent = '';
}

function selectOption(selectedDiv, correctAnswer) {
  const allOptions = document.querySelectorAll('.option');
  allOptions.forEach(opt => opt.onclick = null); // disable further selection

  if (selectedDiv.textContent === correctAnswer) {
    selectedDiv.classList.add('correct');
    score++;
    resultEl.textContent = "✅ Correct!";
  } else {
    selectedDiv.classList.add('wrong');
    allOptions.forEach(opt => {
      if (opt.textContent === correctAnswer) opt.classList.add('correct');
    });
    resultEl.textContent = "❌ Wrong!";
  }

  nextBtn.disabled = false;
}

nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
};

function showResult() {
  document.querySelector('.quiz-container').innerHTML = `
    <h2>Quiz Complete</h2>
    <p>Your Score: <strong>${score} / ${quizData.length}</strong></p>
    <p>${score >= 12 ? "🎉 You Passed! Moving to Stage 2..." : "❌ You Failed! Try Again."}</p>
    ${score >= 12 ? '<button onclick="goToStage2()">Continue to Stage 2</button>' : '<button onclick="location.reload()">Retry</button>'}
  `;
}

function goToStage2() {
  window.location.href = "stage2.html"; // Placeholder: you'll create this page next
}

loadQuestion();
