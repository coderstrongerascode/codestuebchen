// Funktion zum Öffnen der Sidebar
function toggleNav() {
    var body = document.body;
    if (body.classList.contains("menu-open")) {
        body.classList.remove("menu-open");
    } else {
        body.classList.add("menu-open");
    }
}

// Funktion zum Schließen der Sidebar
function closeNav() {
    document.getElementById("mySidenav").style.display = "none";
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
