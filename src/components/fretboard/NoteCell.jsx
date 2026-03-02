import { useCallback } from 'react';
import NoteBubble from './NoteBubble';

export default function NoteCell({ stringIndex, fret, noteName, width, highlight, onPress }) {
  const handlePress = useCallback(
    (e) => {
      e.preventDefault();
      if (onPress) onPress(stringIndex, fret);
    },
    [onPress, stringIndex, fret]
  );

  return (
    <div
      className="note-cell relative flex items-center justify-center cursor-pointer border-r-[2px] border-white/10"
      style={{ flexBasis: `${width}%`, minWidth: 0 }}
      onPointerDown={handlePress}
    >
      {highlight ? (
        <NoteBubble
          note={highlight.note}
          color={highlight.color}
          opacity={highlight.opacity}
          pulse={highlight.pulse}
        />
      ) : (
        <div className="note-ghost flex flex-col items-center -translate-y-3">
          <span className="font-display font-bold text-[10px] text-white/50 mb-0.5">{noteName}</span>
          <div className="w-5 h-5 rounded-full border border-white/40 bg-white/5" />
        </div>
      )}
    </div>
  );
}
