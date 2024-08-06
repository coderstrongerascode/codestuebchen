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
    if (quizMenu.style.display === "block") {
        quizMenu.style.display = "none";
    } else {
        quizMenu.style.display = "block";
    }
}

// Funktion zum Laden eines zufälligen Bildes
document.addEventListener('DOMContentLoaded', () => {
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
});
