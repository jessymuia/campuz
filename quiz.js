// quiz.js
const quizQuestions = [
  {
    question: "What is the most secure way to create a password?",
    options: [
      "Use your pet's name",
      "Combine random words with numbers and symbols",
      "Use 'password123'",
      "Use your birth date"
    ],
    correctAnswer: 1,
    explanation: "The most secure passwords combine random, unrelated words with numbers and special symbols."
  },
  {
    question: "What should you do if you receive a suspicious email asking for personal information?",
    options: [
      "Reply with the information",
      "Click any links to verify",
      "Delete it immediately",
      "Report it to your IT department"
    ],
    correctAnswer: 3,
    explanation: "Always report suspicious emails to your IT department - they can investigate and warn others."
  },
  {
    question: "What does 'https://' in a website URL indicate?",
    options: [
      "The website is popular",
      "The connection is encrypted and secure",
      "The website has videos",
      "It's a government website"
    ],
    correctAnswer: 1,
    explanation: "HTTPS indicates the connection between your browser and the website is encrypted and secure."
  },
  {
    question: "What is two-factor authentication (2FA)?",
    options: [
      "Using two different passwords",
      "A second layer of security requiring two types of verification",
      "Having two email accounts",
      "Logging in twice"
    ],
    correctAnswer: 1,
    explanation: "2FA adds an extra security layer by requiring two different types of verification before granting access."
  },
  {
    question: "Which of these is a common sign of a phishing attempt?",
    options: [
      "Professional logo",
      "Urgent language demanding immediate action",
      "Proper grammar",
      "Familiar sender name"
    ],
    correctAnswer: 1,
    explanation: "Phishing emails often use urgent language to pressure you into acting without thinking."
  }
];

let currentQuestion = 0;
let score = 0;
let quizCompleted = false;
let autoNextTimer = null;

// Make sure showQuizModal is accessible globally
window.showQuizModal = function() {
  const modal = document.getElementById('quizModal');
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  loadQuestion();
};

window.closeQuizModal = function() {
  const modal = document.getElementById('quizModal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
  
  // Clear any existing timer
  if (autoNextTimer) {
    clearTimeout(autoNextTimer);
    autoNextTimer = null;
  }
  
  if (quizCompleted) {
    currentQuestion = 0;
    score = 0;
    quizCompleted = false;
  }
};

function loadQuestion() {
  const quizContent = document.getElementById('quizContent');
  
  if (currentQuestion >= quizQuestions.length) {
    showResults();
    return;
  }

  const question = quizQuestions[currentQuestion];
  
  quizContent.innerHTML = `
    <button class="close-modal" onclick="closeQuizModal()" aria-label="Close quiz">&times;</button>
    <h2 id="quizTitle">Cyber Security Quiz</h2>
    <div class="quiz-progress">
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${((currentQuestion + 1) / quizQuestions.length) * 100}%"></div>
      </div>
      <span>Question ${currentQuestion + 1} of ${quizQuestions.length}</span>
    </div>
    
    <div class="quiz-question">
      <h3>${question.question}</h3>
      <div class="quiz-options">
        ${question.options.map((option, index) => `
          <button class="quiz-option" onclick="selectAnswer(${index})">
            <span class="option-letter">${String.fromCharCode(65 + index)}</span>
            <span class="option-text">${option}</span>
          </button>
        `).join('')}
      </div>
    </div>
    
    <div class="quiz-footer">
      <button class="btn btn-secondary" onclick="closeQuizModal()">Exit Quiz</button>
    </div>
  `;
}

window.selectAnswer = function(selectedIndex) {
  const question = quizQuestions[currentQuestion];
  const options = document.querySelectorAll('.quiz-option');
  
  // Disable all options
  options.forEach(option => {
    option.disabled = true;
    option.style.cursor = 'not-allowed';
  });
  
  // Show correct/wrong answers
  options.forEach((option, index) => {
    if (index === question.correctAnswer) {
      option.classList.add('correct');
    } else if (index === selectedIndex && selectedIndex !== question.correctAnswer) {
      option.classList.add('wrong');
    }
  });
  
  // Update score
  if (selectedIndex === question.correctAnswer) {
    score++;
  }
  
  // Show explanation
  const quizContent = document.getElementById('quizContent');
  const currentHTML = quizContent.innerHTML;
  
  quizContent.innerHTML = currentHTML.replace(
    '</div><div class="quiz-footer">',
    `<div class="quiz-explanation">
      <strong>${selectedIndex === question.correctAnswer ? '✓ Correct!' : '✗ Incorrect'}</strong>
      <p>${question.explanation}</p>
      <div class="auto-next-countdown">Next question in: <span id="countdown">3</span>s</div>
    </div></div><div class="quiz-footer">`
  );
  
  // Auto-proceed to next question after 3 seconds
  let countdown = 1;
  const countdownElement = document.getElementById('countdown');
  
  autoNextTimer = setInterval(() => {
    countdown--;
    if (countdownElement) {
      countdownElement.textContent = countdown;
    }
    
    if (countdown <= 0) {
      clearInterval(autoNextTimer);
      autoNextTimer = null;
      proceedToNextQuestion();
    }
  }, 1000);
};

function proceedToNextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizQuestions.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  quizCompleted = true;
  const percentage = Math.round((score / quizQuestions.length) * 100);
  
  const quizContent = document.getElementById('quizContent');
  quizContent.innerHTML = `
    <button class="close-modal" onclick="closeQuizModal()" aria-label="Close quiz">&times;</button>
    <h2 id="quizTitle">Quiz Results</h2>
    
    <div class="quiz-results">
      <div class="score-circle" style="background: conic-gradient(#667eea ${percentage * 3.6}deg, #f0f0f0 0deg);">
        <div class="score-inner">
          <span class="score-percentage">${percentage}%</span>
          <span class="score-text">Score</span>
        </div>
      </div>
      
      <div class="results-details">
        <h3>${getResultMessage(percentage)}</h3>
        <p>You answered ${score} out of ${quizQuestions.length} questions correctly.</p>
        
        <div class="result-feedback">
          <p><strong>Performance Summary:</strong></p>
          <ul>
            <li>${percentage >= 80 ? '✓ Excellent! You have strong cybersecurity knowledge.' : '✓ Good effort! Keep learning.'}</li>
            <li>${score === quizQuestions.length ? '✓ Perfect score! You\'re a cybersecurity pro!' : '✓ Room for improvement in some areas.'}</li>
            <li>${percentage >= 60 ? '✓ You\'re above average in digital safety awareness.' : '✓ Consider reviewing our security guides.'}</li>
          </ul>
        </div>
        
        <div class="results-actions">
          <button class="btn btn-secondary" onclick="closeQuizModal()">Close</button>
          <button class="btn btn-primary" onclick="takeMoreQuizzes()">Take More Quizzes</button>
          <button class="btn btn-outline" onclick="restartQuiz()">Restart Quiz</button>
        </div>
      </div>
    </div>
  `;
}

function getResultMessage(percentage) {
  if (percentage >= 90) return 'Cybersecurity Expert! 🏆';
  if (percentage >= 70) return 'Cyber Smart! 👍';
  if (percentage >= 50) return 'Good Awareness! 💡';
  return 'Keep Learning! 📚';
}

window.takeMoreQuizzes = function() {
  // Open external quiz website
  window.open('https://infosecquiz.com/fundamentals-of-information-security-quiz/', '_blank');
  closeQuizModal();
};

window.restartQuiz = function() {
  currentQuestion = 0;
  score = 0;
  quizCompleted = false;
  loadQuestion();
};

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', function() {
  const quizModal = document.getElementById('quizModal');
  if (quizModal) {
    quizModal.addEventListener('click', function(e) {
      if (e.target === this) {
        closeQuizModal();
      }
    });
  }
  
  // Close with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.getElementById('quizModal') && document.getElementById('quizModal').style.display === 'block') {
      closeQuizModal();
    }
  });
  
  // Initialize AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100
    });
  }
});