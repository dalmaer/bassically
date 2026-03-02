export const SHARPS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
export const FLATS = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

export function noteToSemitone(note) {
  let idx = SHARPS.indexOf(note);
  if (idx === -1) idx = FLATS.indexOf(note);
  return idx;
}

export function semitoneToNote(semitone, useFlats = false) {
  const normalized = ((semitone % 12) + 12) % 12;
  return useFlats ? FLATS[normalized] : SHARPS[normalized];
}

export const ALL_KEYS = [
  { label: 'C', semitone: 0 },
  { label: 'C#/Db', semitone: 1 },
  { label: 'D', semitone: 2 },
  { label: 'D#/Eb', semitone: 3 },
  { label: 'E', semitone: 4 },
  { label: 'F', semitone: 5 },
  { label: 'F#/Gb', semitone: 6 },
  { label: 'G', semitone: 7 },
  { label: 'G#/Ab', semitone: 8 },
  { label: 'A', semitone: 9 },
  { label: 'A#/Bb', semitone: 10 },
  { label: 'B', semitone: 11 },
];
