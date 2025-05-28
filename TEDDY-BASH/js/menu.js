// Función para iniciar el juego 
function startGame() {
    window.location.href = 'game.html'; // Redirige a la página de juego
}

// Función para mostrar el tutorial
function showTutorial() {
    document.getElementById("menu-container").style.display = "none"; // Oculta el menú
    document.getElementById("tutorial-container").style.display = "flex"; // Muestra el tutorial
}

// Función para cerrar el tutorial
function closeTutorial() {
    document.getElementById("tutorial-container").style.display = "none"; // Oculta el tutorial
    document.getElementById("menu-container").style.display = "flex";
}

// Función para mostrar las curiosidades
function showCuriosidades() {
    document.getElementById('menu-container').style.display = 'none';
    document.getElementById('curiosidades-container').style.display = 'flex';
}

// Función para cerrar las curiosidades 
function closeCuriosidades() {
    document.getElementById('curiosidades-container').style.display = 'none';
    document.getElementById("menu-container").style.display = "flex";
}