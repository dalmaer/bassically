import { useMemo } from 'react';
import { useFretboardData } from '../../hooks/useFretboardData';
import { useFretboardPlay } from '../../hooks/useFretboardPlay';
import { useAppStore } from '../../stores/useAppStore';
import FretboardNeck from './FretboardNeck';
import FretWires from './FretWires';
import FretMarkers from './FretMarkers';
import FretNumbers from './FretNumbers';
import StringSet from './StringSet';
import StringLabels from './StringLabels';
import NoteGrid from './NoteGrid';

export default function Fretboard({ highlightedNotes = [] }) {
  const { grid, fretWidths, markers, displayFretNumbers, fretCount, tuningData, isLeftHanded } =
    useFretboardData();
  const handleNotePress = useFretboardPlay();
  const activeNotes = useAppStore((s) => s.activeNotes);

  // Merge mode-specific highlights with transient play highlights
  // Active notes (filled) override mode highlights at the same position
  const allHighlights = useMemo(() => {
    const activeSet = new Set(activeNotes.map((n) => `${n.stringIndex}-${n.fret}`));
    const merged = highlightedNotes.map((h) => {
      const key = `${h.stringIndex}-${h.fret}`;
      if (activeSet.has(key)) {
        const active = activeNotes.find((n) => `${n.stringIndex}-${n.fret}` === key);
        return { ...h, ...active };
      }
      return h;
    });
    // Add any active notes not already in highlights
    activeNotes.forEach((note) => {
      if (!highlightedNotes.some((h) => h.stringIndex === note.stringIndex && h.fret === note.fret)) {
        merged.push(note);
      }
    });
    return merged;
  }, [highlightedNotes, activeNotes]);

  return (
    <div className="relative w-full max-w-[1400px] flex flex-col z-10 fretboard-touch">
      <div className="flex">
        {/* String Labels */}
        <StringLabels stringNames={tuningData.stringNames} isLeftHanded={isLeftHanded} />

        {/* The Neck */}
        <FretboardNeck isLeftHanded={isLeftHanded}>
          {/* Nut + Open String Notes */}
          <div className="w-10 h-full bg-text-main/5 border-r-2 border-text-main/20 z-20 shadow-[4px_0_10px_rgba(0,0,0,0.5)] shrink-0 relative flex flex-col">
            {grid.map((stringNotes, stringIndex) => {
              const openHighlight = allHighlights.find(
                (h) => h.stringIndex === stringIndex && h.fret === 0
              );
              return (
                <div
                  key={stringIndex}
                  className="flex-1 flex items-center justify-center cursor-pointer"
                  onPointerDown={(e) => {
                    e.preventDefault();
                    handleNotePress(stringIndex, 0);
                  }}
                >
                  {openHighlight && (
                    <div className="w-7 h-7 rounded-full bg-surface border-2 border-neon-cyan shadow-glow-cyan flex items-center justify-center animate-pop-in z-30">
                      <span className="font-display font-bold text-[10px] text-white">
                        {openHighlight.note}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Frets & Strings Area */}
          <div className="flex-1 relative overflow-x-auto overflow-y-hidden fretboard-scroll">
            <div
              className="relative h-full overflow-hidden"
              style={{
                minWidth: `${Math.max(fretCount * 50, 700)}px`,
                direction: isLeftHanded ? 'rtl' : 'ltr',
              }}
            >
              {/* Fret Wires */}
              <FretWires fretWidths={fretWidths} fretCount={fretCount} />

              {/* Fret Markers (Inlays) */}
              <FretMarkers fretWidths={fretWidths} markers={markers} />

              {/* Strings */}
              <StringSet
                stringCount={tuningData.notes.length}
                vibratingStrings={new Set(activeNotes.map((n) => n.stringIndex))}
              />

              {/* Interactive Note Grid */}
              <NoteGrid
                grid={grid}
                fretWidths={fretWidths}
                highlightedNotes={allHighlights}
                onNotePress={handleNotePress}
                isLeftHanded={isLeftHanded}
              />
            </div>
          </div>
        </FretboardNeck>
      </div>

      {/* Fret Numbers */}
      <FretNumbers
        fretWidths={fretWidths}
        displayFretNumbers={displayFretNumbers}
        fretCount={fretCount}
        isLeftHanded={isLeftHanded}
      />
    </div>
  );
}
