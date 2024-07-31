const flagImage = document.getElementById('flag-image');
const nextButton = document.getElementById('next-button');
const answerButtons = document.getElementById('answer-buttons');

let questions = [];
let currentQuestionIndex = 0;
let score = 0;

// Funktion zum Laden der Fragen und Antwortmöglichkeiten
async function loadQuestions() {
    const response = await fetch('leander.data');
    const text = await response.text();
    const lines = text.trim().split('\n');
    const questions = [];

    for (const line of lines) {
        const [correctAnswer, ...options] = line.split('::');
        questions.push({
            flag: `${correctAnswer.toLowerCase()}.png`, // Flaggen-Dateiname basierend auf der Antwort
            correctAnswer,
            options: shuffleArray([correctAnswer, ...options])
        });
    }

    return questions;
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
    flagImage.src = question.flag;
    answerButtons.innerHTML = '';
    question.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(button, option, question.correctAnswer));
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
