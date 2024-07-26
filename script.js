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

// Funktion zum Öffnen des Modals
function openModal() {
    document.getElementById('diceModal').style.display = 'block';
}

// Funktion zum Schließen des Modals
function closeModal() {
    document.getElementById('diceModal').style.display = 'none';
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

// Event-Listener für den "OK"-Button im Zahlen-Modal
document.getElementById('numbers-ok-button').addEventListener('click', closeNumbersModal);

// Funktion zum Würfeln und den Würfel im Modalen Fenster anzeigen
function rollDice() {
    const dice = document.getElementById('dice');
    const modalDice = document.getElementById('modal-dice');
	const showInModal = document.getElementById('show-modal-dice-checkbox').checked; // Neue Checkbox

    // Zufällige Rotation für den Würfel
    const randomX = Math.floor(Math.random() * 4) * 90; // Begrenzung auf 90 Grad Schritten
    const randomY = Math.floor(Math.random() * 4) * 90; // Begrenzung auf 90 Grad Schritten
    const randomZ = Math.floor(Math.random() * 4) * 90; // Begrenzung auf 90 Grad Schritten

    // Setze die Rotation für den Würfel auf der Hauptseite
    dice.style.transition = 'transform 1s cubic-bezier(0.17, 0.67, 0.83, 0.67)'; // Animationseffekt
    dice.style.transform = `rotateX(${randomX}deg) rotateY(${randomY}deg) rotateZ(${randomZ}deg)`;

    // Setze die Rotation für den Würfel im Modal (gleiche Rotation wie auf der Hauptseite)
    modalDice.style.transform = `rotateX(${randomX}deg) rotateY(${randomY}deg) rotateZ(${randomZ}deg)`;

    // Warten, bis die Transition des Würfels endet, bevor das Modal angezeigt wird
	if (showInModal) {
    dice.addEventListener('transitionend', showModalAfterTransition, { once: true });
	}
}

// Funktion, um das Modal nach Abschluss der Transition anzuzeigen
function showModalAfterTransition() {
    // Kurze Verzögerung, um sicherzustellen, dass die Transition abgeschlossen ist
    setTimeout(() => {
        openModal();
    }, 50);
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

// Sicherstellen, dass die Eingabefelder beim Laden der Seite leer sind und die Checkboxen nicht markiert sind
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('lower-bound').value = '';
    document.getElementById('upper-bound').value = '';
    document.getElementById('num-numbers').value = '';
    document.getElementById('decimal-checkbox').checked = false;
    document.getElementById('show-modal-checkbox').checked = false; // Neue Checkbox zurücksetzen
	document.getElementById('show-modal-dice-checkbox').checked = true; 
});
