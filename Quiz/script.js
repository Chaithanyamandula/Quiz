// Global Variables
let currentView = 'home';
let selectedLanguage = '';
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timer = null;
let quizStarted = false;
let selectedAnswer = null;
let showResult = false;

// Quiz Questions Data
const questions = {
    Python: [
        {
            question: "What is the output of: print(type([]))",
            options: ["<class 'list'>", "<class 'array'>", "<class 'tuple'>", "<class 'dict'>"],
            correct: 0
        },
        {
            question: "Which keyword is used to define a function in Python?",
            options: ["function", "def", "func", "define"],
            correct: 1
        },
        {
            question: "What does the 'len()' function do?",
            options: ["Returns length", "Returns type", "Returns value", "Returns index"],
            correct: 0
        },
        {
            question: "Which of these is NOT a Python data type?",
            options: ["list", "tuple", "array", "dict"],
            correct: 2
        },
        {
            question: "What is the correct way to create a comment in Python?",
            options: ["// comment", "/* comment */", "# comment", "<!-- comment -->"],
            correct: 2
        }
    ],
    JavaScript: [
        {
            question: "What does 'typeof null' return in JavaScript?",
            options: ["null", "undefined", "object", "boolean"],
            correct: 2
        },
        {
            question: "Which method adds an element to the end of an array?",
            options: ["push()", "add()", "append()", "insert()"],
            correct: 0
        },
        {
            question: "What is the correct way to declare a variable in ES6?",
            options: ["var x", "let x", "const x", "All of the above"],
            correct: 3
        },
        {
            question: "What does '===' check in JavaScript?",
            options: ["Value only", "Type only", "Both value and type", "Reference"],
            correct: 2
        },
        {
            question: "Which is NOT a JavaScript framework/library?",
            options: ["React", "Vue", "Angular", "Django"],
            correct: 3
        }
    ],
    Java: [
        {
            question: "Which keyword is used to inherit a class in Java?",
            options: ["inherits", "extends", "implements", "super"],
            correct: 1
        },
        {
            question: "What is the size of int in Java?",
            options: ["16 bits", "32 bits", "64 bits", "8 bits"],
            correct: 1
        },
        {
            question: "Which access modifier provides the most restrictive access?",
            options: ["public", "protected", "private", "default"],
            correct: 2
        },
        {
            question: "What is the parent class of all classes in Java?",
            options: ["Object", "Class", "Super", "Base"],
            correct: 0
        },
        {
            question: "Which collection allows duplicate elements?",
            options: ["Set", "Map", "List", "HashSet"],
            correct: 2
        }
    ],
    "C++": [
        {
            question: "What is the correct way to declare a pointer in C++?",
            options: ["int ptr", "int *ptr", "int &ptr", "pointer int ptr"],
            correct: 1
        },
        {
            question: "Which operator is used for dynamic memory allocation?",
            options: ["malloc", "new", "alloc", "create"],
            correct: 1
        },
        {
            question: "What does STL stand for?",
            options: ["Standard Template Library", "System Template Library", "Standard Type Library", "Simple Template Library"],
            correct: 0
        },
        {
            question: "Which header file is needed for cout?",
            options: ["<stdio.h>", "<iostream>", "<conio.h>", "<stdlib.h>"],
            correct: 1
        },
        {
            question: "What is the scope resolution operator in C++?",
            options: ["::", ".", "->", "::>"],
            correct: 0
        }
    ],
    C: [
        {
            question: "What is the correct way to declare a constant in C?",
            options: ["constant int x", "const int x", "int const x", "Both b and c"],
            correct: 3
        },
        {
            question: "Which function is used to allocate memory dynamically?",
            options: ["alloc()", "malloc()", "memory()", "new()"],
            correct: 1
        },
        {
            question: "What is the size of char data type?",
            options: ["1 byte", "2 bytes", "4 bytes", "8 bytes"],
            correct: 0
        },
        {
            question: "Which header file contains printf function?",
            options: ["<conio.h>", "<stdlib.h>", "<stdio.h>", "<string.h>"],
            correct: 2
        },
        {
            question: "What does '&' operator do in C?",
            options: ["Logical AND", "Bitwise AND", "Address operator", "Both b and c"],
            correct: 3
        }
    ],
    React: [
        {
            question: "What is JSX?",
            options: ["JavaScript XML", "Java Syntax Extension", "JavaScript Extension", "JSON XML"],
            correct: 0
        },
        {
            question: "Which hook is used for state management?",
            options: ["useEffect", "useState", "useContext", "useReducer"],
            correct: 1
        },
        {
            question: "What is the virtual DOM?",
            options: ["Real DOM copy", "JavaScript representation of DOM", "HTML template", "CSS framework"],
            correct: 1
        },
        {
            question: "How do you pass data from parent to child component?",
            options: ["state", "props", "context", "refs"],
            correct: 1
        },
        {
            question: "What is the purpose of useEffect?",
            options: ["State management", "Side effects", "Event handling", "Routing"],
            correct: 1
        }
    ]
};

// Languages Data
const languages = [
    {
        name: "Python",
        description: "Data structures, algorithms, and syntax",
        icon: "🐍",
        difficulty: "Beginner to Advanced"
    },
    {
        name: "JavaScript",
        description: "ES6+, DOM manipulation, async programming",
        icon: "🚀",
        difficulty: "Beginner to Advanced"
    },
    {
        name: "Java",
        description: "OOP concepts, collections, multithreading",
        icon: "☕",
        difficulty: "Intermediate to Advanced"
    },
    {
        name: "C++",
        description: "Memory management, STL, algorithms",
        icon: "⚡",
        difficulty: "Intermediate to Advanced"
    },
    {
        name: "C",
        description: "Pointers, memory, system programming",
        icon: "🔧",
        difficulty: "Intermediate to Advanced"
    },
    {
        name: "React",
        description: "Components, hooks, state management",
        icon: "⚛️",
        difficulty: "Intermediate"
    }
];

// Page Navigation Functions
function showHome() {
    hideAllPages();
    document.getElementById('home-page').classList.add('active');
    currentView = 'home';
    resetQuiz();
}

function showLanguageSelection() {
    hideAllPages();
    document.getElementById('language-page').classList.add('active');
    currentView = 'languages';
    populateLanguages();
}

function showQuizPage(language) {
    hideAllPages();
    document.getElementById('quiz-page').classList.add('active');
    currentView = 'quiz';
    selectedLanguage = language;
    setupQuizStart();
}

function showLeaderboard() {
    hideAllPages();
    document.getElementById('leaderboard-page').classList.add('active');
    currentView = 'leaderboard';
    setupLeaderboard();
}

function hideAllPages() {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
}

// Language Selection Functions
function populateLanguages() {
    const grid = document.getElementById('languages-grid');
    grid.innerHTML = '';
    
    languages.forEach(language => {
        const card = document.createElement('div');
        card.className = 'language-card';
        card.onclick = () => selectLanguage(language.name);
        
        card.innerHTML = `
            <div class="language-icon">${language.icon}</div>
            <h3>${language.name}</h3>
            <p>${language.description}</p>
            <div class="difficulty-badge">${language.difficulty}</div>
            <button class="btn-primary" onclick="event.stopPropagation(); selectLanguage('${language.name}')">
                Start Quiz
            </button>
        `;
        
        grid.appendChild(card);
    });
}

function selectLanguage(language) {
    showQuizPage(language);
}

// Quiz Functions
function setupQuizStart() {
    document.getElementById('quiz-start').classList.remove('hidden');
    document.getElementById('quiz-playing').classList.add('hidden');
    document.getElementById('quiz-language-title').textContent = `${selectedLanguage} Quiz`;
    quizStarted = false;
}

function startQuiz() {
    document.getElementById('quiz-start').classList.add('hidden');
    document.getElementById('quiz-playing').classList.remove('hidden');
    quizStarted = true;
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 30;
    selectedAnswer = null;
    showResult = false;
    
    document.getElementById('quiz-header-title').textContent = `${selectedLanguage} Quiz`;
    document.getElementById('total-questions').textContent = questions[selectedLanguage].length;
    
    displayQuestion();
    startTimer();
}

function displayQuestion() {
    const currentQuestions = questions[selectedLanguage];
    const question = currentQuestions[currentQuestionIndex];
    
    document.getElementById('current-question').textContent = currentQuestionIndex + 1;
    document.getElementById('question-text').textContent = question.question;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.onclick = () => selectAnswer(index);
        button.innerHTML = `
            <span>${option}</span>
            <span class="result-icon"></span>
        `;
        optionsContainer.appendChild(button);
    });
    
    document.getElementById('next-btn').classList.add('hidden');
    document.getElementById('result-message').classList.add('hidden');
    updateScore();
}

function selectAnswer(answerIndex) {
    if (showResult) return;
    
    selectedAnswer = answerIndex;
    const options = document.querySelectorAll('.option-btn');
    
    options.forEach((option, index) => {
        option.classList.remove('selected');
        if (index === answerIndex) {
            option.classList.add('selected');
        }
    });
    
    document.getElementById('next-btn').classList.remove('hidden');
}

function nextQuestion() {
    if (selectedAnswer === null) return;
    
    const currentQuestions = questions[selectedLanguage];
    const correctAnswer = currentQuestions[currentQuestionIndex].correct;
    
    if (selectedAnswer === correctAnswer) {
        score++;
    }
    
    showQuestionResult(correctAnswer);
    
    setTimeout(() => {
        if (currentQuestionIndex < currentQuestions.length - 1) {
            currentQuestionIndex++;
            selectedAnswer = null;
            showResult = false;
            timeLeft = 30;
            displayQuestion();
            startTimer();
        } else {
            finishQuiz();
        }
    }, 1500);
}

function showQuestionResult(correctAnswer) {
    showResult = true;
    clearInterval(timer);
    
    const options = document.querySelectorAll('.option-btn');
    const resultMessage = document.getElementById('result-message');
    
    options.forEach((option, index) => {
        const resultIcon = option.querySelector('.result-icon');
        if (index === correctAnswer) {
            option.classList.add('correct');
            resultIcon.innerHTML = '<i class="fas fa-check-circle correct"></i>';
        } else if (index === selectedAnswer && selectedAnswer !== correctAnswer) {
            option.classList.add('incorrect');
            resultIcon.innerHTML = '<i class="fas fa-times-circle incorrect"></i>';
        }
        option.style.pointerEvents = 'none';
    });
    
    const isCorrect = selectedAnswer === correctAnswer;
    resultMessage.textContent = isCorrect ? 'Correct! 🎉' : 'Incorrect 😞';
    resultMessage.classList.remove('hidden');
    
    document.getElementById('next-btn').classList.add('hidden');
    updateScore();
}

function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = `${timeLeft}s`;
        document.getElementById('progress-bar').style.width = `${(timeLeft / 30) * 100}%`;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            if (selectedAnswer === null) {
                selectedAnswer = -1; // No answer selected
            }
            nextQuestion();
        }
    }, 1000);
}

function updateScore() {
    document.getElementById('current-score').textContent = score;
    document.getElementById('current-total').textContent = showResult ? 
        currentQuestionIndex + 1 : currentQuestionIndex;
}

function finishQuiz() {
    clearInterval(timer);
    showLeaderboard();
}

function resetQuiz() {
    clearInterval(timer);
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 30;
    selectedAnswer = null;
    showResult = false;
    quizStarted = false;
}

// Leaderboard Functions
function setupLeaderboard() {
    const maxScore = questions[selectedLanguage].length;
    const percentage = Math.round((score / maxScore) * 100);
    
    // Update results header
    document.getElementById('completed-language').textContent = `${selectedLanguage} Programming Quiz`;
    document.getElementById('final-score').textContent = `${score}/${maxScore}`;
    document.getElementById('accuracy').textContent = `${percentage}%`;
    
    // Performance message
    const performanceBadge = document.getElementById('performance-badge');
    performanceBadge.textContent = getPerformanceMessage(score);
    
    // Generate leaderboard data
    const leaderboardData = generateLeaderboardData();
    const userRank = leaderboardData.findIndex(player => player.name === 'You') + 1;
    document.getElementById('user-rank').textContent = `#${userRank}`;
    
    // Update leaderboard language
    document.getElementById('leaderboard-language').textContent = `${selectedLanguage} Quiz Rankings`;
    
    // Populate leaderboard
    populateLeaderboard(leaderboardData);
}

function getPerformanceMessage(score) {
    if (score === 5) return 'Perfect! 🎉';
    if (score >= 4) return 'Excellent! 🌟';
    if (score >= 3) return 'Good job! 👍';
    if (score >= 2) return 'Keep practicing! 📚';
    return "Don't give up! 💪";
}

function generateLeaderboardData() {
    const mockData = [
        { name: 'CodeMaster', score: 5, time: '2:15' },
        { name: 'DevNinja', score: 5, time: '2:30' },
        { name: 'ProgGuru', score: 4, time: '1:45' },
        { name: 'You', score: score, time: '3:00' },
        { name: 'TechWhiz', score: 4, time: '2:45' },
        { name: 'CodeExplorer', score: 3, time: '2:20' },
        { name: 'AlgoPro', score: 3, time: '1:55' },
        { name: 'ByteHacker', score: 2, time: '1:40' }
    ];
    
    return mockData.sort((a, b) => {
        if (a.score !== b.score) return b.score - a.score;
        return a.time.localeCompare(b.time);
    });
}

function populateLeaderboard(data) {
    const list = document.getElementById('leaderboard-list');
    list.innerHTML = '';
    
    data.forEach((player, index) => {
        const entry = document.createElement('div');
        entry.className = `leaderboard-entry ${player.name === 'You' ? 'user-entry' : ''}`;
        
        const rankIcon = getRankIcon(index + 1);
        const percentage = Math.round((player.score / 5) * 100);
        
        entry.innerHTML = `
            <div class="entry-left">
                <div class="rank-icon ${getRankClass(index + 1)}">${rankIcon}</div>
                <div class="player-info">
                    <h4>${player.name}${player.name === 'You' ? ' (You)' : ''}</h4>
                    <p>Completed in ${player.time}</p>
                </div>
            </div>
            <div class="entry-right">
                <div class="player-score">${player.score}/5</div>
                <div class="player-percentage">${percentage}%</div>
            </div>
        `;
        
        list.appendChild(entry);
    });
}

function getRankIcon(position) {
    switch (position) {
        case 1: return '<i class="fas fa-trophy"></i>';
        case 2: return '<i class="fas fa-medal"></i>';
        case 3: return '<i class="fas fa-award"></i>';
        default: return `#${position}`;
    }
}

function getRankClass(position) {
    switch (position) {
        case 1: return 'gold';
        case 2: return 'silver';
        case 3: return 'bronze';
        default: return 'number';
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    showHome();
});