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

/*const questionContainer = document.getElementById('question-container');
const nextButton = document.getElementById('next-button');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');

let questions = [];
let currentQuestionIndex = 0;
let score = 0;

// Funktion zum Laden von Daten aus einer Datei
async function loadFile(url) {
    const response = await fetch(url);
    const text = await response.text();
    return text.trim().split('\n').map(line => line.split('::'));
}

// Funktion zum Starten des Spiels
async function startGame() {
    const [questionsData, answersData] = await Promise.all([
        loadFile('FrageAntwort.data'),
        loadFile('Hauptstaedte.data')
    ]);

    const allAnswers = answersData.flat();

    questions = questionsData.map(([question, correctAnswer]) => ({
        question,
        correctAnswer,
        answers: generateAnswers(correctAnswer, allAnswers)
    }));

    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add('hide');
    showQuestion(questions[currentQuestionIndex]);
}

// Funktion zum Generieren der Antworten
function generateAnswers(correctAnswer, allAnswers) {
    const possibleAnswers = allAnswers.filter(answer => answer !== correctAnswer);
    const randomAnswers = [];
    while (randomAnswers.length < 3) {
        const randomIndex = Math.floor(Math.random() * possibleAnswers.length);
        const answer = possibleAnswers.splice(randomIndex, 1)[0];
        randomAnswers.push(answer);
    }
    randomAnswers.push(correctAnswer);
    return randomAnswers.sort(() => Math.random() - 0.5);
}

// Funktion zum Anzeigen der Frage
function showQuestion(question) {
    questionElement.innerText = question.question;
    answerButtons.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(button, answer, question.correctAnswer));
        answerButtons.appendChild(button);
    });
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
        startGame();
    }
});

startGame();*/
const questionElement = document.getElementById('question');
const nextButton = document.getElementById('next-button');
const answerButtons = document.getElementById('answer-buttons');

let countries = [];
let capitals = {};
let currentQuestion = {};
let score = 0;

// Funktion zum Laden der Länder und Hauptstädte
async function loadCapitals() {
    const response = await fetch('hauptstaedte.json');
    capitals = await response.json();
    countries = Object.keys(capitals);
}

// Funktion zum Starten des Spiels
async function startGame() {
    await loadCapitals();
    score = 0;
    nextButton.classList.add('hide');
    showNextQuestion();
}

// Funktion zum Anzeigen der nächsten Frage
function showNextQuestion() {
    const correctCountry = getRandomCountry();

    currentQuestion = {
        correctCountry,
        options: generateOptions(correctCountry)
    };

    questionElement.innerText = `Was ist die Hauptstadt von ${correctCountry}?`;

    answerButtons.innerHTML = '';
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(button, option));
        answerButtons.appendChild(button);
    });

    nextButton.classList.add('hide');
}

// Funktion zum Generieren der Antwortmöglichkeiten
function generateOptions(correctCountry) {
    const correctAnswer = capitals[correctCountry];
    const options = new Set([correctAnswer]);

    while (options.size < 4) {
        const randomCountry = getRandomCountry();
        options.add(capitals[randomCountry]);
    }

    return Array.from(options).sort(() => Math.random() - 0.5);
}

// Funktion zum Abrufen eines zufälligen Landes
function getRandomCountry() {
    return countries[Math.floor(Math.random() * countries.length)];
}

// Funktion zur Auswahl der Antwort
function selectAnswer(button, selectedAnswer) {
    const correct = selectedAnswer === capitals[currentQuestion.correctCountry];
    if (correct) {
        score++;
        button.style.backgroundColor = 'green';
    } else {
        button.style.backgroundColor = 'red';
        // Highlight the correct answer
        Array.from(answerButtons.children).forEach(btn => {
            if (btn.innerText === capitals[currentQuestion.correctCountry]) {
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
nextButton.addEventListener('click', showNextQuestion);

// Starte das Spiel
startGame();



