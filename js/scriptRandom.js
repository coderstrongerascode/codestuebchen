// Funktion zum Generieren einer zufälligen Zahl basierend auf den Schranken
function generateRandomNumbers() {
    const lowerBound = parseFloat(document.getElementById('lower-bound').value);
    const upperBound = parseFloat(document.getElementById('upper-bound').value);
    const numNumbers = parseInt(document.getElementById('num-numbers').value);
    const generateDecimals = document.getElementById('decimal-checkbox').checked;
    const showInModal = document.getElementById('show-modal-checkbox').checked; // Neue Checkbox

    // Validierung der Schranken und der Anzahl
    if (isNaN(lowerBound) || isNaN(upperBound) || isNaN(numNumbers)) {
        document.getElementById('random-number-output').innerHTML = 'ERROR: Bitte geben Sie gültige Zahlen ein.';
        openErrorModal('ERROR: Bitte geben Sie gültige Zahlen ein.');
        return;
    }
    if (lowerBound >= upperBound) {
        document.getElementById('random-number-output').innerHTML = 'ERROR: Die untere Schranke muss kleiner als die obere Schranke sein.';
        openErrorModal('Die untere Schranke muss kleiner als die obere Schranke sein.');
        return;
    }
    if (numNumbers <= 0) {
        document.getElementById('random-number-output').innerHTML = 'ERROR: Die Anzahl der Zahlen muss größer als Null sein.';
        openErrorModal('Die Anzahl der Zahlen muss größer als Null sein.');
        return;
    }

    let randomNumbers = [];
    for (let i = 0; i < numNumbers; i++) {
        let randomNumber;
        if (generateDecimals) {
            randomNumber = Math.random() * (upperBound - lowerBound) + lowerBound;
            randomNumbers.push(`Die Zufallszahl ${i + 1} ist: ${randomNumber.toFixed(2)}`); // Bis auf zwei Dezimalstellen
        } else {
            randomNumber = Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;
            randomNumbers.push(`Die Zufallszahl ${i + 1} ist: ${randomNumber}`);
        }
    }

    // Ausgabe im HTML-Element
    document.getElementById('random-number-output').innerHTML = randomNumbers.join('<br>'); // Zeilenumbruch für jede Zufallszahl

    // Wenn die Checkbox aktiviert ist, zeigen Sie die Zahlen im Modal an
    if (showInModal) {
        openNumbersModal(randomNumbers.join('<br>'));
    }
}

// Funktion zur Validierung der Eingaben
function validateNumber(input) {
    const pattern = /^-?\d*\.?\d*$/;
    if (!pattern.test(input.value)) {
        input.setCustomValidity("Nur Zahlen sind erlaubt");
        input.reportValidity();
    } else {
        input.setCustomValidity("");
    }
}

// Funktion zum Öffnen des Fehler-Modals
function openErrorModal(message) {
    const modal = document.getElementById('errorModal');
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    modal.style.display = 'block';
}

// Funktion zum Schließen des Fehler-Modals
function closeErrorModal() {
    document.getElementById('errorModal').style.display = 'none';
}

// Event-Listener für den "OK"-Button im Fehler-Modal
document.getElementById('error-ok-button').addEventListener('click', closeErrorModal);

// Event-Listener für den "OK"-Button im Zahlen-Modal
document.getElementById('numbers-ok-button').addEventListener('click', closeNumbersModal);

// Funktion zum Öffnen des Zahlen-Modals
function openNumbersModal(message) {
    const modal = document.getElementById('numbersModal');
    const numbersMessage = document.getElementById('numbers-message');
    numbersMessage.innerHTML = message;
    modal.style.display = 'block';
}

// Funktion zum Schließen des Zahlen-Modals
function closeNumbersModal() {
    document.getElementById('numbersModal').style.display = 'none';
}

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

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('lower-bound').value = '';
    document.getElementById('upper-bound').value = '';
    document.getElementById('num-numbers').value = '';
    document.getElementById('decimal-checkbox').checked = false;
    document.getElementById('show-modal-checkbox').checked = false; // Neue Checkbox zurücksetzen
});