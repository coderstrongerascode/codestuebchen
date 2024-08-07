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

let selectedWord = '';
let attempts = 6;
let guessedLetters = [];

const wordDisplay = document.getElementById('word-display');
const letterInput = document.getElementById('letter-input');
const guessButton = document.getElementById('guess-button');
const message = document.getElementById('message');
const guessedLettersDisplay = document.getElementById('guessed-letters');
const attemptsDisplay = document.getElementById('attempts');
const canvas = document.getElementById('hangman-canvas');
const ctx = canvas.getContext('2d');

function updateWordDisplay() {
    let display = '';
    for (let char of selectedWord) {
        display += guessedLetters.includes(char) ? char + ' ' : '_ ';
    }
    wordDisplay.textContent = display.trim();
}

function drawHangman(attempts) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    if (attempts <= 5) { ctx.moveTo(10, 190); ctx.lineTo(190, 190); } // Base
    if (attempts <= 4) { ctx.moveTo(100, 190); ctx.lineTo(100, 10); } // Pole
    if (attempts <= 3) { ctx.lineTo(180, 10); } // Arm
    if (attempts <= 2) { ctx.lineTo(180, 30); } // Rope
    if (attempts <= 1) { ctx.arc(180, 50, 20, 0, Math.PI * 2, true); } // Head
    if (attempts === 0) {
        ctx.moveTo(180, 70); ctx.lineTo(180, 130); // Body
        ctx.moveTo(180, 80); ctx.lineTo(160, 110); // Left Arm
        ctx.moveTo(180, 80); ctx.lineTo(200, 110); // Right Arm
        ctx.moveTo(180, 130); ctx.lineTo(160, 160); // Left Leg
        ctx.moveTo(180, 130); ctx.lineTo(200, 160); // Right Leg
    }
    ctx.stroke();
}

function checkGameStatus() {
    if (!wordDisplay.textContent.includes('_')) {
        message.textContent = 'Congratulations! You won!';
        guessButton.disabled = true;
    } else if (attempts === 0) {
        message.textContent = `Game over! The word was ${selectedWord}.`;
        guessButton.disabled = true;
    }
}

function startGame(words) {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    attempts = 6;
    guessedLetters = [];
    updateWordDisplay();
    drawHangman(attempts);
    message.textContent = '';
    guessButton.disabled = false;
    guessedLettersDisplay.textContent = '';
    attemptsDisplay.textContent = attempts;
}

guessButton.addEventListener('click', () => {
    const guessedLetter = letterInput.value.toLowerCase();
    if (guessedLetter && !guessedLetters.includes(guessedLetter)) {
        guessedLetters.push(guessedLetter);
        if (!selectedWord.includes(guessedLetter)) {
            attempts--;
        }
        updateWordDisplay();
        drawHangman(attempts);
        guessedLettersDisplay.textContent = guessedLetters.join(', ');
        attemptsDisplay.textContent = attempts;
        checkGameStatus();
    }
    letterInput.value = '';
});

// Fetch words from JSON file
fetch('resources/Wort/hangmanAllWort.json')
    .then(response => response.json())
    .then(data => {
        const words = data.words;
        startGame(words);
    })
    .catch(error => console.error('Error loading words:', error));
