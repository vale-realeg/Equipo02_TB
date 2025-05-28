
// Se define los 3 MIDIs con su instrumento asociado
const midiFiles = [
  { url: './media/MIDI/C1/KICK1.mid',  instrument: 'bombo'   },  // kick → bombo
  { url: './media/MIDI/C1/SNARE1.mid', instrument: 'caja'    },  // snare → caja
  { url: './media/MIDI/C1/HAT1.mid',   instrument: 'platillo'}  // hat   → platillo
];

// Guardamos todos los eventos de nota para el primer nivel
let beats = [];

//Se carga un MIDI local y se extrae sus notas asociándolas al instrumentos
async function loadBeatsFromMidi(file) {
  console.log(`→ Cargando ${file.url} como ${file.instrument}`);

  const midi = await Midi.fromUrl(file.url);

  // Recorremos todas las pistas, extraemos cada nota y la mapeamos
  midi.tracks.forEach(track => {
    track.notes.forEach(note => {
      beats.push({
        time: note.time, // tiempo en segundos
        instrument: file.instrument
      });
    });
  });
}

// Carga los 3 MIDIs en serie del primer nivel
window.loadBeats = async function() {
  beats = [];
  for (const f of midiFiles) {
    await loadBeatsFromMidi(f);
  }
  // Ordenamos por tiempo
  beats.sort((a, b) => a.time - b.time);
  console.log(`Total de beats cargados: ${beats.length}`);
};