const products = [
  {
    icon: "📘",
    title: "UPSC Monthly Current Affairs PDF",
    desc: "Premium monthly current affairs notes with exam-focused highlights.",
    price: "₹149",
    tag: "PDF Pack"
  },
  {
    icon: "📝",
    title: "SSC CGL Mock Test Series",
    desc: "Full-length mock tests with score, timer and answer review support later.",
    price: "₹299",
    tag: "Test Series"
  },
  {
    icon: "📚",
    title: "Railway GK Notes Bundle",
    desc: "Complete static GK notes for railway and state-level exams.",
    price: "₹199",
    tag: "Notes"
  },
  {
    icon: "⚡",
    title: "Daily Quiz Premium",
    desc: "Daily current affairs and GK quiz practice for regular revision.",
    price: "₹99",
    tag: "Quiz"
  },
  {
    icon: "🏆",
    title: "Banking Reasoning Practice",
    desc: "Reasoning questions, topic-wise practice sets and speed drills.",
    price: "₹249",
    tag: "Practice"
  },
  {
    icon: "🧾",
    title: "Exam Formula Handbook",
    desc: "Short tricks, formulas and revision sheets in one premium PDF.",
    price: "₹129",
    tag: "Handbook"
  }
];

const productGrid = document.getElementById("productGrid");

if (productGrid) {
  productGrid.innerHTML = products.map((product) => `
    <article class="product-card glass">
      <div class="product-cover">
        <span>${product.icon}</span>
      </div>
      <h3>${product.title}</h3>
      <p>${product.desc}</p>
      <div class="product-meta">
        <span class="price">${product.price}</span>
        <span class="badge-small">${product.tag}</span>
      </div>
      <button class="full-btn" onclick="demoBuy('${product.title}')">Buy Now</button>
    </article>
  `).join("");
}

function demoBuy(title) {
  alert(`Demo checkout: ${title}\n\nReal version me yaha Razorpay payment + login unlock hoga.`);
}

const questions = [
  {
    question: "Which feature is most important for selling paid PDFs safely?",
    options: ["Public PDF link", "Time-limited secure access", "No login", "Only screenshots"],
    answer: 1
  },
  {
    question: "Which payment gateway is commonly used for Indian online payments?",
    options: ["Razorpay", "Photoshop", "Notepad", "Bluetooth"],
    answer: 0
  },
  {
    question: "For heavy traffic, what helps reduce website load?",
    options: ["Large images only", "CDN caching", "No compression", "Manual refresh"],
    answer: 1
  }
];

let currentQuestion = 0;
let selectedAnswers = Array(questions.length).fill(null);

const questionText = document.getElementById("questionText");
const optionBox = document.getElementById("optionBox");
const prevQuestion = document.getElementById("prevQuestion");
const nextQuestion = document.getElementById("nextQuestion");
const submitTest = document.getElementById("submitTest");
const resultBox = document.getElementById("resultBox");

function renderQuestion() {
  if (!questionText || !optionBox) return;

  const q = questions[currentQuestion];
  questionText.textContent = `${currentQuestion + 1}. ${q.question}`;

  optionBox.innerHTML = q.options.map((option, index) => `
    <button class="option ${selectedAnswers[currentQuestion] === index ? "selected" : ""}" onclick="selectOption(${index})">
      ${option}
    </button>
  `).join("");

  if (resultBox) resultBox.textContent = "";
}

function selectOption(index) {
  selectedAnswers[currentQuestion] = index;
  renderQuestion();
}

if (prevQuestion) {
  prevQuestion.addEventListener("click", () => {
    currentQuestion = Math.max(0, currentQuestion - 1);
    renderQuestion();
  });
}

if (nextQuestion) {
  nextQuestion.addEventListener("click", () => {
    currentQuestion = Math.min(questions.length - 1, currentQuestion + 1);
    renderQuestion();
  });
}

if (submitTest) {
  submitTest.addEventListener("click", () => {
    const score = selectedAnswers.reduce((total, answer, index) => {
      return total + (answer === questions[index].answer ? 1 : 0);
    }, 0);

    if (resultBox) {
      resultBox.textContent = `Score: ${score}/${questions.length}. This is a demo result.`;
    }
  });
}

renderQuestion();

let seconds = 5 * 60;
const timer = document.getElementById("timer");

setInterval(() => {
  if (!timer || seconds <= 0) return;

  seconds -= 1;
  const min = String(Math.floor(seconds / 60)).padStart(2, "0");
  const sec = String(seconds % 60).padStart(2, "0");
  timer.textContent = `${min}:${sec}`;
}, 1000);
