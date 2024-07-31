// Funktion zum Öffnen der Sidebar
function toggleNav() {
    var nav = document.getElementById("mySidenav");
    if (nav.style.display === "block") {
        nav.style.display = "none";
    } else {
        nav.style.display = "block";
    }
}

// Funktion zum Schließen der Sidebar
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.body.style.marginLeft = "0";
}
const flagImage = document.getElementById('flag-image');
const nextButton = document.getElementById('next-button');
const answerButtons = document.getElementById('answer-buttons');

let countries = [];
let questions = [];
let currentQuestionIndex = 0;
let score = 0;

// Funktion zum Laden der Länder aus der .data-Datei
async function loadCountries() {
    const response = await fetch('leander.data');
    const text = await response.text();
    countries = text.trim().split('\n').map(line => line.trim());
}

// Funktion zum Starten des Spiels
async function startGame() {
    await loadCountries();
    score = 0;
    questions = generateQuestions();
    currentQuestionIndex = 0;
    nextButton.classList.add('hide');
    showNextQuestion();
}

// Funktion zum Generieren der Fragen
function generateQuestions() {
    const shuffledCountries = shuffleArray(countries.slice());
    return shuffledCountries.map(country => ({
        correctAnswer: country,
        flag: `${country.toLowerCase()}.png`,
        options: generateOptions(country)
    }));
}

// Funktion zum Anzeigen der nächsten Frage
function showNextQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        flagImage.src = question.flag;
        currentQuestion = question;
        answerButtons.innerHTML = '';
        question.options.forEach(option => {
            const button = document.createElement('button');
            button.innerText = option;
            button.classList.add('btn');
            button.addEventListener('click', () => selectAnswer(button, option));
            answerButtons.appendChild(button);
        });
        nextButton.classList.add('hide');
    } else {
        alert(`Quiz beendet! Deine Punktzahl: ${score}/${questions.length}`);
        // Startet das Quiz nicht automatisch erneut, um das Endergebnis anzuzeigen.
    }
}


// Funktion zum Generieren der Antwortmöglichkeiten
function generateOptions(correctAnswer) {
    const options = new Set([correctAnswer]);
    while (options.size < 4) {
        const randomCountry = getRandomCountry();
        options.add(randomCountry);
    }
    return Array.from(options).sort(() => Math.random() - 0.5);
}

// Funktion zum Abrufen eines zufälligen Landes
function getRandomCountry() {
    return countries[Math.floor(Math.random() * countries.length)];
}

// Funktion zur Auswahl der Antwort
function selectAnswer(button, selectedAnswer) {
    const correct = selectedAnswer === currentQuestion.correctAnswer;
    if (correct) {
        score++;
        button.style.backgroundColor = 'green';
    } else {
        button.style.backgroundColor = 'red';
        // Highlight the correct answer
        Array.from(answerButtons.children).forEach(btn => {
            if (btn.innerText === currentQuestion.correctAnswer) {
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
    showNextQuestion();
});

// Funktion zum Mischen eines Arrays
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Starte das Spiel
startGame();
