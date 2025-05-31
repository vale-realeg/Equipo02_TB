const menuMusic = document.getElementById("menu-music");

// Reproducir el audio al cargar la página
window.addEventListener("DOMContentLoaded", () => {
    menuMusic.volume = 0.5;
    menuMusic.play().catch((error) => {
        console.warn("Autoplay falló, permite el audio en tu navegador", error);
    });
});

// Función para iniciar el juego
function startGame() {
    menuMusic.pause();
    menuMusic.currentTime = 0;
    window.location.href = 'game.html';
}

// Función para mostrar el tutorial
function showTutorial() {
    document.getElementById("menu-container").style.display = "none";
    document.getElementById("tutorial-container").style.display = "flex";
}

// Función para cerrar el tutorial
function closeTutorial() {
    document.getElementById("tutorial-container").style.display = "none";
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