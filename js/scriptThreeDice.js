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

// Funktion zum Ein- und Ausklappen des Würfels-Menüs
/*function toggleDiceMenu() {
    var diceMenu = document.getElementById("diceMenu");
    var arrow = document.querySelector('#alldicelink + .arrow');
    if (diceMenu.style.display === "block") {
        diceMenu.style.display = "none";
        arrow.classList.remove('down');
    } else {
        diceMenu.style.display = "block";
        arrow.classList.add('down');
    }
}*/
function toggleDiceMenuLink() {
    var diceMenu = document.getElementById("diceMenu");
    var arrow = document.querySelector('.arrow');
    //var label = document.getElementById("alldicelink"); // Stelle sicher, dass das Label existiert

    if (diceMenu.style.display === "block") {
        diceMenu.style.display = "none";
        arrow.classList.remove('down');
    } else {
        diceMenu.style.display = "block";
        arrow.classList.add('down');
    
    }
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
    setFace();
    document.getElementById("face1-symbol1").innerText = document.getElementById("symbol1").value || "A";
            document.getElementById("face1-symbol2").innerText = document.getElementById("symbol2").value || "B";
            document.getElementById("face1-symbol3").innerText = document.getElementById("symbol3").value || "C";
    const dice = document.getElementById('dice');
    const modalDice = document.getElementById('modal-dice');
    const showInModal = document.getElementById('showmodaldicecheckbox').checked; // Neue Checkbox

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

//Set the face of dice
function setFace()
{
    //Face 1
    document.getElementById("face1-symbol1").innerText = document.getElementById("symbol1").value || "A";
    document.getElementById("face1-symbol2").innerText = document.getElementById("symbol2").value || "B";
    document.getElementById("face1-symbol3").innerText = document.getElementById("symbol3").value || "C";

    //Face 2
    document.getElementById("face2-symbol1").innerText = document.getElementById("symbol1").value || "A";
    document.getElementById("face2-symbol2").innerText = document.getElementById("symbol3").value || "C";
    document.getElementById("face2-symbol3").innerText = document.getElementById("symbol2").value || "B";

    //Face 3
    document.getElementById("face3-symbol1").innerText = document.getElementById("symbol2").value || "B";
    document.getElementById("face3-symbol2").innerText = document.getElementById("symbol1").value || "A";
    document.getElementById("face3-symbol3").innerText = document.getElementById("symbol3").value || "C";

    //Face 4
    document.getElementById("face4-symbol1").innerText = document.getElementById("symbol2").value || "B";
    document.getElementById("face4-symbol2").innerText = document.getElementById("symbol3").value || "C";
    document.getElementById("face4-symbol3").innerText = document.getElementById("symbol1").value || "A";

    //Face 5
    document.getElementById("face5-symbol1").innerText = document.getElementById("symbol3").value || "C";
    document.getElementById("face5-symbol2").innerText = document.getElementById("symbol1").value || "A";
    document.getElementById("face5-symbol3").innerText = document.getElementById("symbol2").value || "B";

    //Face 6
    document.getElementById("face6-symbol1").innerText = document.getElementById("symbol3").value || "C";
    document.getElementById("face6-symbol2").innerText = document.getElementById("symbol2").value || "B";
    document.getElementById("face6-symbol3").innerText = document.getElementById("symbol1").value || "A";
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
	document.getElementById('showmodaldicecheckbox').checked = true;

    // Sprachinhalt laden
    loadLanguage();
});

// Sprachumschaltung und Laden der Inhalte
function loadLanguage() {
    const languageSelector = document.getElementById("languageSelector");
    let currentLanguage = 'en'; // Standardmäßig auf Deutsch

    function switchLanguage(language) {
        currentLanguage = language;
        localStorage.setItem("language", currentLanguage);
        fetchLanguageContent(currentLanguage);
    }

    function fetchLanguageContent(language) {
        fetch(`resources/language/dice/threedice/${language}.json`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('pageTitle').textContent = data.pageTitle;
                document.getElementById('languageLabel').textContent = data.languageLabel;
                document.getElementById('homeLink').textContent = data.homeLink;
                document.getElementById('diceLink').textContent = data.diceLink;
                document.getElementById("allQuizzesLink").textContent = data.allQuizzesLink;
                document.getElementById('randomLink').textContent = data.randomLink;
                document.getElementById('quizCapitalLink').textContent = data.quizCapitalLink;
                document.getElementById('quizFlagLink').textContent = data.quizFlagLink;
                document.getElementById('hangmanLink').textContent = data.hangmanLink;
                document.getElementById('showmodaldicecheckboxlabel').textContent = data.showmodaldicecheckbox;
                document.getElementById('rollDiceButton').textContent = data.rollDiceButton;
                document.getElementById('modalTitle').textContent = data.modalTitle;
                document.getElementById('modalOkButton').textContent = data.modalOkButton;
                document.getElementById("dicepage").textContent = data.dicemenulink             
                document.getElementById("threediceLink").textContent = data.threeDiceLink;
            });
    }

    // Sprachumschaltung
    languageSelector.addEventListener("change", function() {
        const selectedLanguage = this.value;
        switchLanguage(selectedLanguage);
    });

    // Gespeicherte Sprache laden
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
        currentLanguage = savedLanguage;
        languageSelector.value = currentLanguage;
    }
    fetchLanguageContent(currentLanguage);
}






















/*document.addEventListener('DOMContentLoaded', () => {
	document.getElementById('showmodaldicecheckbox').checked = true;

    // Sprachinhalt laden
    loadLanguage();
});


// Sprachumschaltung und Laden der Inhalte
function loadLanguage() {
    const languageSelector = document.getElementById("languageSelector");
    let currentLanguage = 'en'; // Standardmäßig auf Deutsch

    function switchLanguage(language) {
        currentLanguage = language;
        localStorage.setItem("language", currentLanguage);
        fetchLanguageContent(currentLanguage);
    }

    function fetchLanguageContent(language) {
        fetch(`resources/language/index/${language}.json`)
            .then(response => response.json())
            .then(data => {
                document.getElementById("pageTitle").textContent = data.pageTitle;
                document.getElementById("languageLabel").textContent = data.languageLabel;
                document.getElementById("homeLink").textContent = data.homeLink;
                document.getElementById("diceLink").textContent = data.diceLink;
                document.getElementById("randomLink").textContent = data.randomLink;
                document.getElementById("allQuizzesLink").textContent = data.allQuizzesLink;
                document.getElementById("quizCapitalLink").textContent = data.quizCapitalLink;
                document.getElementById("quizFlagLink").textContent = data.quizFlagLink;
                document.getElementById("hangmanLink").textContent = data.hangmanLink;
                document.getElementById("welcomeMessage").textContent = data.welcomeMessage;
                document.getElementById("description").textContent = data.description;
                document.getElementById("toDicePaged").textContent = data.toDicePage;
                document.getElementById("toRandomPage").textContent = data.toRandomPage;
                document.getElementById("dicepage").textContent = data.dicemenulink
                //document.getElementById("alldicelink").textContent = data.diceMenu;
               
                document.getElementById("threediceLink").textContent = data.threeDiceLink;

            });
    }

    // Sprachumschaltung
    languageSelector.addEventListener("change", function() {
        const selectedLanguage = this.value;
        switchLanguage(selectedLanguage);
    });

    // Gespeicherte Sprache laden
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
        currentLanguage = savedLanguage;
        languageSelector.value = currentLanguage;
    }
    fetchLanguageContent(currentLanguage);
}*/



