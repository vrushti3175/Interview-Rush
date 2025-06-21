const puzzles = [
  {
    code: "let name = ___;",
    correct: "'John'",
    options: ["'John'", "name", "42"]
  },
  {
    code: "function add(a, b) { return ___; }",
    correct: "a + b",
    options: ["a + b", "a * b", "console.log(a, b)"]
  },
  {
    code: "for (let i = 0; i < ___; i++) { }",
    correct: "10",
    options: ["'i'", "10", "i > 10"]
  }
];

let currentPuzzle = 0;

const codeBox = document.getElementById("codeBox");
const optionsDiv = document.getElementById("options");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("nextPuzzle");

function loadPuzzle() {
  feedback.textContent = "";
  nextBtn.style.display = "none";

  const puzzle = puzzles[currentPuzzle];

  // Replace ___ with a drop zone
  codeBox.innerHTML = puzzle.code.replace("___", `<span id="dropZone" class="drop-zone" ondrop="drop(event)" ondragover="allowDrop(event)">___</span>`);

  optionsDiv.innerHTML = "";
  puzzle.options.forEach(opt => {
    const div = document.createElement("div");
    div.className = "option-draggable";
    div.textContent = opt;
    div.setAttribute("draggable", true);
    div.setAttribute("id", "opt-" + opt);
    div.ondragstart = drag;
    optionsDiv.appendChild(div);
  });
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const draggedElement = document.getElementById(data);
  const dropZone = document.getElementById("dropZone");
  dropZone.innerText = draggedElement.innerText;

  checkAnswer(draggedElement.innerText);
}

function checkAnswer(answer) {
  const correct = puzzles[currentPuzzle].correct;
  if (answer === correct) {
    feedback.textContent = "✅ Correct!";
    feedback.style.color = "green";
  } else {
    feedback.textContent = `❌ Wrong. Correct answer: ${correct}`;
    feedback.style.color = "red";
  }
  nextBtn.style.display = "inline-block";
}

nextBtn.onclick = () => {
  currentPuzzle++;
  if (currentPuzzle < puzzles.length) {
    loadPuzzle();
  } else {
    endStage();
  }
};

function endStage() {
  document.querySelector(".code-game").innerHTML = `
    <h2>🎉 Stage 2 Complete</h2>
    <p>Great job! You're ready for the Resume Builder stage.</p>
    <button onclick="location.href='stage3.html'">Go to Stage 3</button>
  `;
}

loadPuzzle();
