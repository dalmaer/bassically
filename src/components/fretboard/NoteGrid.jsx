import NoteCell from './NoteCell';
import { useAppStore } from '../../stores/useAppStore';
import { semitoneToNote } from '../../music/noteMap';

export default function NoteGrid({ grid, fretWidths, highlightedNotes = [], onNotePress, isLeftHanded }) {
  const useFlats = useAppStore((s) => s.useFlats);

  // Build a lookup for highlighted notes: "stringIndex-fret" -> note data
  const highlightMap = new Map();
  highlightedNotes.forEach((n) => {
    highlightMap.set(`${n.stringIndex}-${n.fret}`, n);
  });

  return (
    <div className="absolute inset-0 flex flex-col w-full h-full z-20">
      {grid.map((stringNotes, stringIndex) => (
        <div key={stringIndex} className="flex-1 flex w-full">
          {stringNotes.slice(1).map((semitone, fretIndex) => {
            const fret = fretIndex + 1; // fretIndex 0 = fret 1 (skip open string)
            const key = `${stringIndex}-${fret}`;
            const highlight = highlightMap.get(key);
            const noteName = semitoneToNote(semitone, useFlats);

            return (
              <NoteCell
                key={key}
                stringIndex={stringIndex}
                fret={fret}
                noteName={noteName}
                width={fretWidths[fretIndex]}
                highlight={highlight}
                onPress={onNotePress}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
