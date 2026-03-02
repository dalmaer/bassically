// Tuning arrays ordered top-to-bottom as displayed: G, D, A, E
// Values are chromatic semitone numbers (C=0, C#=1, ... B=11)
export const TUNINGS = {
  standard: {
    label: 'E A D G (Standard)',
    notes: [7, 2, 9, 4],       // G, D, A, E
    stringNames: ['G', 'D', 'A', 'E'],
    midiBase: [43, 38, 33, 28], // G2, D2, A1, E1
  },
  dropD: {
    label: 'D A D G (Drop D)',
    notes: [7, 2, 9, 2],       // G, D, A, D
    stringNames: ['G', 'D', 'A', 'D'],
    midiBase: [43, 38, 33, 26], // G2, D2, A1, D1
  },
  lowB: {
    label: 'B E A D (Low B)',
    notes: [2, 9, 4, 11],      // D, A, E, B
    stringNames: ['D', 'A', 'E', 'B'],
    midiBase: [38, 33, 28, 23], // D2, A1, E1, B0
  },
};
