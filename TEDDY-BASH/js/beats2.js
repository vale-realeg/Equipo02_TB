// Se definen los 3 MIDIs para el segundo nivel
const midiFiles = [
  { url: './media/MIDI/C2/KICK2.mid',  instrument: 'bombo'   },  // kick → bombo
  { url: './media/MIDI/C2/SNARE2.mid', instrument: 'caja'    },  // snare → caja
  { url: './media/MIDI/C2/HAT2.mid',   instrument: 'platillo'}  // hat   → platillo
];

// Guardamos los eventos de nota para el nivel 2
let beats = [];


 //Se carga un MIDI local y se extrae sus notas asociándolas al instrumento
async function loadBeatsFromMidi(file) {
  console.log(`→ (Nivel 2) Cargando ${file.url} como ${file.instrument}`);
  const midi = await Midi.fromUrl(file.url);

  midi.tracks.forEach(track => {
    track.notes.forEach(note => {
      beats.push({
        time: note.time,
        instrument: file.instrument
      });
    });
  });
}

// Carga los 3 MIDIs del segundo nivel, ordena los beats
window.loadBeats = async function() {
  beats = [];
  for (const f of midiFiles) {
    await loadBeatsFromMidi(f);
  }
  beats.sort((a, b) => a.time - b.time);
  console.log(`Nivel 2: ${beats.length} beats cargados`);
};