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

const questionContainer = document.getElementById('question-container');
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

startGame();

