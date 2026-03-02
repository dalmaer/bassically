export default function FretNumbers({ fretWidths, displayFretNumbers, fretCount, isLeftHanded }) {
  // Calculate center position of each fret
  const fretCenters = [];
  let cumulative = 0;
  for (let i = 0; i < fretWidths.length; i++) {
    fretCenters.push(cumulative + fretWidths[i] / 2);
    cumulative += fretWidths[i];
  }

  // Account for string labels width + nut width
  const offsetLeft = 'calc(2rem + 40px)'; // 32px labels + 40px nut

  return (
    <div
      className="relative h-6 mt-2 font-code text-xs text-text-muted opacity-50"
      style={{
        marginLeft: offsetLeft,
        direction: isLeftHanded ? 'rtl' : 'ltr',
      }}
    >
      {displayFretNumbers.map((fretNum) => {
        const center = fretCenters[fretNum - 1];
        if (center === undefined) return null;
        return (
          <span
            key={fretNum}
            className="absolute -translate-x-1/2"
            style={{ left: `${center}%` }}
          >
            {fretNum}
          </span>
        );
      })}
    </div>
  );
}
