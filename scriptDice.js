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

// Funktion zur Berechnung des Würfelergebnisses
function getDiceResult(x, y, z) {
    // Logik zur Berechnung des Würfelergebnisses basierend auf der Rotation
    // Dies ist nur ein Beispiel; passen Sie die Logik entsprechend Ihrem Würfeldesign an
    return Math.floor(Math.random() * 6) + 1; // Beispiel für einen 6-seitigen Würfel
}

document.addEventListener('DOMContentLoaded', () => {
	document.getElementById('show-modal-dice-checkbox').checked = true;
});