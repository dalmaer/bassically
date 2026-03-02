export default function FretMarkers({ fretWidths, markers }) {
  // Calculate the center position of each fret as a percentage
  const fretCenters = [];
  let cumulative = 0;
  for (let i = 0; i < fretWidths.length; i++) {
    const center = cumulative + fretWidths[i] / 2;
    fretCenters.push(center);
    cumulative += fretWidths[i];
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {markers.map(({ fret, type }) => {
        const centerPct = fretCenters[fret - 1];
        if (centerPct === undefined) return null;

        if (type === 'double') {
          return (
            <div key={fret} className="absolute top-0 bottom-0" style={{ left: `${centerPct}%` }}>
              <div className="absolute top-[30%] -translate-x-1/2 w-3 h-3 bg-metal-dark rotate-45 rounded-[1px]" />
              <div className="absolute top-[65%] -translate-x-1/2 w-3 h-3 bg-metal-dark rotate-45 rounded-[1px]" />
            </div>
          );
        }

        return (
          <div
            key={fret}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-metal-dark rotate-45 rounded-[1px]"
            style={{ left: `${centerPct}%` }}
          />
        );
      })}
    </div>
  );
}
