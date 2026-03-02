export function midiToFrequency(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

// MIDI note numbers for open strings (standard tuning)
export const OPEN_STRING_MIDI = {
  G: 43, // G2
  D: 38, // D2
  A: 33, // A1
  E: 28, // E1
};
