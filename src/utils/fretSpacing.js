export function calculateFretWidths(fretCount) {
  const rawWidths = [];
  let remainingLength = 1.0;

  for (let i = 0; i < fretCount; i++) {
    const fretWidth = remainingLength / 17.817;
    rawWidths.push(fretWidth);
    remainingLength -= fretWidth;
  }

  const total = rawWidths.reduce((a, b) => a + b, 0);
  return rawWidths.map((w) => (w / total) * 100);
}
