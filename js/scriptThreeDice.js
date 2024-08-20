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


// Funktion zum Laden eines zufälligen Bildes
document.addEventListener('DOMContentLoaded', () => {

    // Event-Listener für das Würfel-Menü
   /* document.getElementById('toggleDiceMenuLink').addEventListener('click', function() {
        toggleDiceMenu();
    });*/

    // Array mit den Bild-Dateinamen
    const images = [
        'resources/images/pic_1.png',
        'resources/images/pic_2.png',
        'resources/images/pic_3.png',
        'resources/images/pic_4.png',
        'resources/images/pic_5.png',
        'resources/images/pic_6.png'
    ];

    // Zufälligen Index wählen
    const randomIndex = Math.floor(Math.random() * images.length);

    // Bildpfad setzen aber nicht über arrsy
    
	//const imagePath = `/${images[randomIndex]}`;
	const imagePath = `resources/images/Pic_${Math.floor(Math.random() * (9 - 1 +1)) +1}.png`;

    // Bild-Element finden und src setzen
    const imgElement = document.getElementById('randomImage');
    imgElement.setAttribute('src', imagePath);

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
                document.getElementById("toDicePage").textContent = data.toDicePage;
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
}



