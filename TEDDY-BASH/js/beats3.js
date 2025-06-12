// Se definen los 3 MIDIs para el segundo nivel
const midiFiles = [
  { url: './media/MIDI/C3/KICK3.mid',  instrument: 'bombo'   },  // kick → bombo
  { url: './media/MIDI/C3/SNARE3.mid', instrument: 'caja'    },  // snare → caja
  { url: './media/MIDI/C3/HH3.mid',   instrument: 'platillo'}  // hat   → platillo
];

// Guardamos los eventos de nota para el nivel 2
let beats = [];


 //Se carga un MIDI local y se extrae sus notas asociándolas al instrumento
async function loadBeatsFromMidi(file) {
  console.log(`→ (Nivel 3) Cargando ${file.url} como ${file.instrument}`);
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
  console.log(`Nivel 3: ${beats.length} beats cargados`);
};