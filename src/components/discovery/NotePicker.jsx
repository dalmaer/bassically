import { SHARPS, FLATS } from '../../music/noteMap';
import { cn } from '../../utils/cn';

export default function NotePicker({ selectedSemitone, onSelect, useFlats }) {
  const notes = useFlats ? FLATS : SHARPS;

  return (
    <div className="flex w-full gap-2 overflow-x-auto pb-2 justify-center">
      {notes.map((note, i) => {
        const isSelected = i === selectedSemitone;
        return (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className={cn(
              'flex-1 min-w-[50px] h-12 rounded font-display font-bold transition-all',
              isSelected
                ? 'bg-neon-cyan border border-neon-cyan text-void shadow-glow-cyan scale-110'
                : 'bg-transparent border border-metal-dark text-text-muted hover:border-text-muted hover:text-white'
            )}
          >
            {note}
          </button>
        );
      })}
    </div>
  );
}
