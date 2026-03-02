import { useState, useEffect, useRef } from 'react';
import { useAppStore } from '../../stores/useAppStore';

const NOTE_LIFETIME = 4000; // ms before fully faded

export default function NoteHistory() {
  const activeNotes = useAppStore((s) => s.activeNotes);
  const [history, setHistory] = useState([]);
  const seenRef = useRef(new Set());

  // When new activeNotes appear, add them to history
  useEffect(() => {
    activeNotes.forEach((note) => {
      if (!seenRef.current.has(note.id)) {
        seenRef.current.add(note.id);
        setHistory((prev) => [
          ...prev.slice(-20), // keep last 20
          { id: note.id, note: note.note, timestamp: Date.now() },
        ]);
      }
    });
  }, [activeNotes]);

  // Clean up expired notes
  useEffect(() => {
    if (history.length === 0) return;
    const timer = setTimeout(() => {
      const cutoff = Date.now() - NOTE_LIFETIME;
      setHistory((prev) => {
        const next = prev.filter((n) => n.timestamp > cutoff);
        // Clean seenRef for removed entries
        prev.forEach((n) => {
          if (n.timestamp <= cutoff) seenRef.current.delete(n.id);
        });
        return next;
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [history]);

  return (
    <div className="w-full max-w-[1400px] h-10 flex items-center justify-center overflow-hidden relative">
      {/* Fade masks on both edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-void to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-void to-transparent z-10 pointer-events-none" />
      <div className="flex items-center gap-2">
        {history.map((item) => (
          <div
            key={item.id}
            className="note-history-item shrink-0 flex items-center justify-center px-3 py-1 rounded-full border border-neon-cyan/40 bg-neon-cyan/10"
          >
            <span className="font-display font-bold text-sm text-neon-cyan whitespace-nowrap">
              {item.note}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
