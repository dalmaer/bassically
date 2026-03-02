import { semitoneToNote } from './noteMap';

export const MAJOR_SCALE = [0, 2, 4, 5, 7, 9, 11];

export function nashvilleToSemitone(keySemitone, nashvilleNumber) {
  const interval = MAJOR_SCALE[nashvilleNumber - 1];
  return (keySemitone + interval) % 12;
}

export function resolveProgression(keySemitone, progression) {
  return progression.map((num) => nashvilleToSemitone(keySemitone, num));
}

export function getScaleNotes(keySemitone, useFlats = false) {
  return MAJOR_SCALE.map((interval) =>
    semitoneToNote((keySemitone + interval) % 12, useFlats)
  );
}

export const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

export const NNS_LABELS = {
  1: { roman: 'I', name: 'ROOT', color: 'neon-cyan' },
  2: { roman: 'ii', name: 'SECOND', color: 'neon-amber' },
  3: { roman: 'iii', name: 'THIRD', color: 'neon-amber' },
  4: { roman: 'IV', name: 'FOURTH', color: 'neon-magenta' },
  5: { roman: 'V', name: 'FIFTH', color: 'neon-lime' },
  6: { roman: 'vi', name: 'SIXTH', color: 'neon-amber' },
  7: { roman: 'vii', name: 'SEVENTH', color: 'neon-magenta' },
};

// Color mapping for note highlighting
export function getNashvilleColor(nashvilleNumber) {
  const label = NNS_LABELS[nashvilleNumber];
  return label ? label.color : 'neon-cyan';
}
