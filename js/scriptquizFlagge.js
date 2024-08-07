// Funktion zum Öffnen der Sidebar
function toggleNav() {
    var sidenav = document.getElementById("mySidenav");
    var body = document.body;
    if (sidenav.style.display === "block") {
        sidenav.style.display = "none";
        body.classList.remove("menu-open");
    } else {
        sidenav.style.display = "block";
        body.classList.add("menu-open");
    }
}

// Funktion zum Schließen der Sidebar
function closeNav() {
    var sidenav = document.getElementById("mySidenav");
    var body = document.body;
    sidenav.style.display = "none";
    body.classList.remove("menu-open");
}

// Funktion zum Ein- und Ausklappen des Quiz-Menüs
function toggleQuizMenu() {
    var quizMenu = document.getElementById("quizMenu");
    var arrow = document.querySelector('.arrow');
    if (quizMenu.style.display === "block") {
        quizMenu.style.display = "none";
        arrow.classList.remove('down');
    } else {
        quizMenu.style.display = "block";
        arrow.classList.add('down');
    }
}

const flagImage = document.getElementById('flag-image');
const nextButton = document.getElementById('next-button');
const answerButtons = document.getElementById('answer-buttons');

let questions = [];
let currentQuestionIndex = 0;
let score = 0;

// Funktion zum Laden von Daten aus einer JSON-Datei
async function loadQuestions() {
    const response = await fetch('question.json');
    const data = await response.json();
    return data;
}

// Funktion zum Starten des Spiels
async function startGame() {
    questions = await loadQuestions();
    shuffleArray(questions);
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add('hide');
    showQuestion(questions[currentQuestionIndex]);
}

// Funktion zum Anzeigen der Frage
function showQuestion(question) {
    //const imagePath = question.flag;
    flagImage.src = question.flag;
    answerButtons.innerHTML = '';
    const options = generateOptions(question.correctAnswer);
    options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(button, option, question.correctAnswer));
        answerButtons.appendChild(button);
    });
}

// Funktion zur Generierung der Antwortmöglichkeiten
function generateOptions(correctAnswer) {
    // Mische die Fragen, um die Antwortmöglichkeiten zu generieren
    const allCountries = questions.map(q => q.correctAnswer);
    const options = new Set([correctAnswer]);
    
    while (options.size < 4) {
        const randomCountry = allCountries[Math.floor(Math.random() * allCountries.length)];
        options.add(randomCountry);
    }

    return Array.from(options).sort(() => Math.random() - 0.5);
}

// Funktion zur Auswahl der Antwort
function selectAnswer(button, selectedAnswer, correctAnswer) {
    const correct = selectedAnswer === correctAnswer;
    if (correct) {
        score++;
        button.style.backgroundColor = 'green';
    } else {
        button.style.backgroundColor = 'red';
        // Highlight the correct answer
        Array.from(answerButtons.children).forEach(btn => {
            if (btn.innerText === correctAnswer) {
                btn.style.backgroundColor = 'green';
            }
        });
    }
    Array.from(answerButtons.children).forEach(btn => {
        btn.disabled = true;
    });
    nextButton.classList.remove('hide');
}

// Event-Handler für den Nächsten-Button
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        nextButton.classList.add('hide');
    } else {
        alert(`Quiz beendet! Deine Punktzahl: ${score}/${questions.length}`);
        startGame(); // Startet das Quiz erneut
    }
});

// Funktion zum Mischen eines Arrays
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

startGame();
