console.log('game.js CARGADO');

let score = 0;
const timeouts = [];
let audio, cajaSound, bomboSound, platilloSound;
let notesUI = {};

window.addEventListener('load', async () => {

  // Reiniciar puntuación al iniciar cualquier nivel
  score = 0;
  document.getElementById('score').innerText = score;

  // Referencias de audio y UI
  audio = document.getElementById('game-audio');
  cajaSound = document.getElementById('caja-sound');
  bomboSound = document.getElementById('bombo-sound');
  platilloSound = document.getElementById('platillo-sound');

  // Volumen de los sonidos
  cajaSound.volume = 0.5;
  bomboSound.volume = 0.5;
  platilloSound.volume = 0.5;

  notesUI = {
    caja:     document.getElementById('note-1'),
    bombo:    document.getElementById('note-2'),
    platillo: document.getElementById('note-3')
  };

  // Mostrar puntuación inicial
  document.getElementById('score').innerText = score;

  // Limpiar beats si por error fueron definidos antes
  if (typeof beats !== 'undefined') {
    beats.length = 0;
  }

  await loadBeats(); // Carga los beats desde beats.js o beats2.js

  try {
    await audio.play(); // Intenta reproducir audio
  } catch (err) {
    console.warn('Error al reproducir audio:', err);
    showMessage('Permite el audio en tu navegador.');
    return;
  }

  scheduleBeats(); // Empieza el juego
});

// Mostrar una nota en pantalla 
function showNote(inst) {
  const el = notesUI[inst];
  el.style.display = 'block';
  setTimeout(() => el.style.display = 'none', 400);
}

// Programar los beats con delays correctos
function scheduleBeats() {
  const t0 = audio.currentTime;

  beats.forEach((beat) => {
    const delay = (beat.time - t0) * 1000;
    if (delay >= 0) {
      const t = setTimeout(() => showNote(beat.instrument), delay);
      timeouts.push(t);
    }
  });

// Final del juego

const last = beats[beats.length - 1];
const finish = (last.time - t0) * 1000 + 500;

timeouts.push(setTimeout(() => {
  if (window.location.pathname.includes('game.html')) {
    if (score >= 10000) {
      console.log('Puntuación suficiente, redirigiendo a game2.html');
      showMessage(`¡Felicidades! Avanzaste al siguiente nivel.`, () => {
        window.location.href = 'game2.html';
      });
      return; // Impide que se ejecute otro showMessage
    } else {
      showMessage(`Nivel completado, pero intenta conseguir 10000 puntos o más.`, () => {
      // Recargar la página para reiniciar el nivel
      window.location.reload();
    });
    }
  } else {
    // Nivel 2
    showMessage(`¡Nivel completado! Puntos: ${score}`, () => {
      window.location.href = 'index.html';
    });
  }
}, finish));
}

// Pulsación de teclas A, D, K
document.addEventListener('keydown', e => {
  const k = e.key.toUpperCase();
  if (['A', 'D', 'K'].includes(k)) {
    hitButton(k);
  }
});

// Manejo visual y puntuación de un golpe
function hitButton(key) {
  const k = key.toUpperCase();
  const btn = document.getElementById(`button-${k.toLowerCase()}`);
  btn.classList.add('active-press');
  setTimeout(() => btn.classList.remove('active-press'), 150);

  let inst, snd;
  if (k === 'A') { inst = 'caja'; snd = cajaSound; }
  if (k === 'D') { inst = 'bombo'; snd = bomboSound; }
  if (k === 'K') { inst = 'platillo'; snd = platilloSound; }

  playSound(snd);

  if (notesUI[inst].style.display === 'block') {
    score += 100;
    document.getElementById('score').innerText = score;
  }
}

// Reproduce un clon del sonido (para que no se corte)
function playSound(sound) {
  const clone = sound.cloneNode();
  clone.volume = sound.volume;
  clone.currentTime = 0;
  clone.play();
}

// Volver al menú y reiniciar puntaje
function goToMenu() {
  score = 0;
  window.location.href = 'index.html';
}

// Logs para depurar
function showMessage(text, callback) {
  console.log('showMessage:', text);
  document.getElementById('message-text').innerText = text;
  document.getElementById('custom-message').style.display = 'flex';
  window._onMessageClose = callback;
}

function closeMessage() {
  document.getElementById('custom-message').style.display = 'none';
  console.log('closeMessage ejecutado');
  if (typeof window._onMessageClose === 'function') {
    console.log('Ejecutando callback...');
    window._onMessageClose();
    window._onMessageClose = null;
  } else {
    console.warn('No hay callback definido');
  }
}