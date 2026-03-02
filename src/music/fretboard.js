export function noteAtPosition(openStringSemitone, fret) {
  return (openStringSemitone + fret) % 12;
}

export function generateFretboardGrid(tuning, fretCount) {
  return tuning.map((openNote) =>
    Array.from({ length: fretCount + 1 }, (_, fret) =>
      noteAtPosition(openNote, fret)
    )
  );
}

export function findNotePositions(targetSemitone, tuning, fretCount) {
  const positions = [];
  tuning.forEach((openNote, stringIndex) => {
    for (let fret = 0; fret <= fretCount; fret++) {
      if (noteAtPosition(openNote, fret) === targetSemitone) {
        positions.push({ stringIndex, fret });
      }
    }
  });
  return positions;
}

// Standard fret markers
export function getFretMarkers(fretCount) {
  const single = [3, 5, 7, 9, 15, 17, 19, 21];
  const double = [12, 24];
  const markers = [];

  for (let fret = 1; fret <= fretCount; fret++) {
    if (double.includes(fret)) {
      markers.push({ fret, type: 'double' });
    } else if (single.includes(fret)) {
      markers.push({ fret, type: 'single' });
    }
  }
  return markers;
}

// Fret numbers to display
export function getDisplayFretNumbers(fretCount) {
  const show = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24];
  return show.filter((n) => n <= fretCount);
}
