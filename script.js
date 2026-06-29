const DB_NAME = "studyPointPdfStore";
const DB_VERSION = 1;
const STORE_NAME = "pdfs";

const defaultProducts = [
  {
    emoji: "📘",
    title: "UPSC Current Affairs PDF",
    description: "Monthly current affairs PDF with exam-focused notes and revision points.",
    price: "149",
    category: "Current Affairs"
  },
  {
    emoji: "📝",
    title: "SSC CGL Mock Test Pack",
    description: "Practice PDF pack for SSC CGL with answer key and explanations.",
    price: "199",
    category: "Mock Test"
  },
  {
    emoji: "📚",
    title: "Static GK Premium Notes",
    description: "History, geography, polity and economy notes for quick revision.",
    price: "249",
    category: "Notes"
  }
];

const mockQuestions = [
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: 1
  },
  {
    question: "Who is known as the Father of the Indian Constitution?",
    options: ["Mahatma Gandhi", "B. R. Ambedkar", "Jawaharlal Nehru", "Sardar Patel"],
    answer: 1
  },
  {
    question: "What is the capital of India?",
    options: ["Mumbai", "Kolkata", "New Delhi", "Chennai"],
    answer: 2
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    answer: 1
  },
  {
    question: "How many minutes are there in one hour?",
    options: ["30", "45", "60", "90"],
    answer: 2
  }
];

let currentQuestionIndex = 0;
let selectedAnswers = new Array(mockQuestions.length).fill(null);
let timerSeconds = 300;

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject("Database open failed");
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id"
        });
      }
    };
  });
}

async function addPdfToDatabase(pdfData) {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.add(pdfData);

    request.onsuccess = () => resolve(true);
    request.onerror = () => reject("PDF save failed");
  });
}

async function getAllUploadedPdfs() {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject("PDF load failed");
  });
}

async function getPdfById(id) {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(id);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("PDF not found");
  });
}

async function deletePdfById(id) {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);

    request.onsuccess = () => resolve(true);
    request.onerror = () => reject("PDF delete failed");
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatFileSize(bytes) {
  if (!bytes) return "Unknown size";

  const kb = bytes / 1024;
  const mb = kb / 1024;

  if (mb >= 1) {
    return `${mb.toFixed(2)} MB`;
  }

  return `${kb.toFixed(1)} KB`;
}

async function renderProducts() {
  const productGrid = document.getElementById("productGrid");

  if (!productGrid) return;

  const uploadedPdfs = await getAllUploadedPdfs();

  const defaultProductCards = defaultProducts.map((product) => {
    return `
      <div class="product-card glass">
        <div class="product-cover">
          <span>${product.emoji}</span>
        </div>

        <h3>${escapeHtml(product.title)}</h3>
        <p>${escapeHtml(product.description)}</p>

        <div class="product-meta">
          <strong class="price">₹${escapeHtml(product.price)}</strong>
          <span class="badge-small">${escapeHtml(product.category)}</span>
        </div>

        <button class="secondary-btn small" type="button">Demo Product</button>
      </div>
    `;
  }).join("");

  const uploadedProductCards = uploadedPdfs.map((pdf) => {
    return `
      <div class="product-card glass">
        <div class="product-cover">
          <span>📄</span>
        </div>

        <h3>${escapeHtml(pdf.title)}</h3>
        <p>${escapeHtml(pdf.description)}</p>

        <div class="product-meta">
          <strong class="price">₹${escapeHtml(pdf.price)}</strong>
          <span class="badge-small">${escapeHtml(pdf.category)}</span>
        </div>

        <div class="file-meta">
          ${escapeHtml(pdf.fileName)} • ${formatFileSize(pdf.fileSize)}
        </div>

        <div class="uploaded-actions" style="margin-top: 16px;">
          <button class="secondary-btn small" type="button" onclick="openUploadedPdf('${pdf.id}')">
            Open PDF
          </button>

          <button class="primary-btn small" type="button" onclick="downloadUploadedPdf('${pdf.id}')">
            Download
          </button>

          <button class="danger-btn small" type="button" onclick="deleteUploadedPdf('${pdf.id}')">
            Delete
          </button>
        </div>
      </div>
    `;
  }).join("");

  productGrid.innerHTML = uploadedProductCards + defaultProductCards;
}

async function handleAdminPdfUpload(event) {
  event.preventDefault();

  const titleInput = document.getElementById("pdfTitle");
  const categoryInput = document.getElementById("pdfCategory");
  const priceInput = document.getElementById("pdfPrice");
  const descriptionInput = document.getElementById("pdfDescription");
  const fileInput = document.getElementById("pdfFile");
  const statusBox = document.getElementById("adminUploadStatus");

  const file = fileInput.files[0];

  if (!file) {
    statusBox.textContent = "Please choose a PDF file.";
    return;
  }

  const isPdf =
    file.type === "application/pdf" ||
    file.name.toLowerCase().endsWith(".pdf");

  if (!isPdf) {
    statusBox.textContent = "Only PDF files are allowed.";
    return;
  }

  const pdfData = {
    id: `pdf_${Date.now()}_${Math.random().toString(36).slice(2)}`,
    title: titleInput.value.trim(),
    category: categoryInput.value.trim(),
    price: priceInput.value.trim(),
    description: descriptionInput.value.trim(),
    fileName: file.name,
    fileSize: file.size,
    fileType: file.type || "application/pdf",
    createdAt: new Date().toISOString(),
    fileBlob: file
  };

  await addPdfToDatabase(pdfData);

  statusBox.textContent = "PDF uploaded successfully. Product card added to store.";

  event.target.reset();

  await renderProducts();
}

async function openUploadedPdf(id) {
  const pdf = await getPdfById(id);

  if (!pdf) {
    alert("PDF not found.");
    return;
  }

  const pdfUrl = URL.createObjectURL(pdf.fileBlob);
  window.open(pdfUrl, "_blank");

  setTimeout(() => {
    URL.revokeObjectURL(pdfUrl);
  }, 60000);
}

async function downloadUploadedPdf(id) {
  const pdf = await getPdfById(id);

  if (!pdf) {
    alert("PDF not found.");
    return;
  }

  const pdfUrl = URL.createObjectURL(pdf.fileBlob);
  const link = document.createElement("a");

  link.href = pdfUrl;
  link.download = pdf.fileName || "study-point.pdf";
  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => {
    URL.revokeObjectURL(pdfUrl);
  }, 60000);
}

async function deleteUploadedPdf(id) {
  const confirmDelete = confirm("Do you want to delete this uploaded PDF?");

  if (!confirmDelete) return;

  await deletePdfById(id);
  await renderProducts();
}

function renderQuestion() {
  const questionText = document.getElementById("questionText");
  const optionBox = document.getElementById("optionBox");

  if (!questionText || !optionBox) return;

  const currentQuestion = mockQuestions[currentQuestionIndex];

  questionText.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

  optionBox.innerHTML = currentQuestion.options.map((option, index) => {
    const selectedClass = selectedAnswers[currentQuestionIndex] === index ? "selected" : "";

    return `
      <button class="option ${selectedClass}" type="button" onclick="selectOption(${index})">
        ${escapeHtml(option)}
      </button>
    `;
  }).join("");
}

function selectOption(index) {
  selectedAnswers[currentQuestionIndex] = index;
  renderQuestion();
}

function goToNextQuestion() {
  if (currentQuestionIndex < mockQuestions.length - 1) {
    currentQuestionIndex++;
    renderQuestion();
  }
}

function goToPreviousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderQuestion();
  }
}

function submitMockTest() {
  const resultBox = document.getElementById("resultBox");

  if (!resultBox) return;

  let score = 0;

  mockQuestions.forEach((question, index) => {
    if (selectedAnswers[index] === question.answer) {
      score++;
    }
  });

  resultBox.textContent = `Your Score: ${score}/${mockQuestions.length}`;
}

function startTimer() {
  const timer = document.getElementById("timer");

  if (!timer) return;

  setInterval(() => {
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;

    timer.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    if (timerSeconds > 0) {
      timerSeconds--;
    }
  }, 1000);
}

document.addEventListener("DOMContentLoaded", async () => {
  await renderProducts();
  renderQuestion();
  startTimer();

  const adminUploadForm = document.getElementById("adminUploadForm");
  const nextQuestion = document.getElementById("nextQuestion");
  const prevQuestion = document.getElementById("prevQuestion");
  const submitTest = document.getElementById("submitTest");

  if (adminUploadForm) {
    adminUploadForm.addEventListener("submit", handleAdminPdfUpload);
  }

  if (nextQuestion) {
    nextQuestion.addEventListener("click", goToNextQuestion);
  }

  if (prevQuestion) {
    prevQuestion.addEventListener("click", goToPreviousQuestion);
  }

  if (submitTest) {
    submitTest.addEventListener("click", submitMockTest);
  }
});

window.openUploadedPdf = openUploadedPdf;
window.downloadUploadedPdf = downloadUploadedPdf;
window.deleteUploadedPdf = deleteUploadedPdf;
window.selectOption = selectOption;
