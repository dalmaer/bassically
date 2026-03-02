import { useState, useRef, useEffect } from 'react';
import { useSequencerStore } from '../../stores/useSequencerStore';
import { useAppStore } from '../../stores/useAppStore';
import { semitoneToNote } from '../../music/noteMap';
import { getScaleNotes } from '../../music/nashville';
import { cn } from '../../utils/cn';

export default function KeySelector() {
  const key = useSequencerStore((s) => s.key);
  const setKey = useSequencerStore((s) => s.setKey);
  const useFlats = useAppStore((s) => s.useFlats);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const keyName = semitoneToNote(key, useFlats);
  const scaleNotes = getScaleNotes(key, useFlats);

  // Close dropdown on outside click
  useEffect(() => {
    if (!isOpen) return;
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('pointerdown', handleClick);
    return () => document.removeEventListener('pointerdown', handleClick);
  }, [isOpen]);

  const handleSelect = (semitone) => {
    setKey(semitone);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-display uppercase tracking-wider text-text-muted">
        Key Signature
      </span>
      <div className="flex items-center gap-3">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 bg-surface hover:bg-metal-dark border border-metal-dark rounded-lg px-4 py-2 transition-all group"
          >
            <span className="font-display font-bold text-xl text-neon-cyan">{keyName}</span>
            <span className="font-display font-medium text-lg text-text-main">Major</span>
            <span
              className={cn(
                'material-symbols-outlined text-text-muted group-hover:text-neon-cyan transition-all ml-2',
                isOpen && 'rotate-180 text-neon-cyan'
              )}
            >
              expand_more
            </span>
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 mt-2 w-56 bg-surface border border-metal-dark rounded-lg shadow-2xl z-[100] overflow-hidden max-h-[400px] overflow-y-auto">
              {Array.from({ length: 12 }, (_, i) => {
                const noteName = semitoneToNote(i, useFlats);
                const scale = getScaleNotes(i, useFlats);
                const isSelected = i === key;
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors',
                      isSelected
                        ? 'bg-neon-cyan/10 text-neon-cyan'
                        : 'text-text-main hover:bg-metal-dark/50'
                    )}
                  >
                    <span className={cn(
                      'font-display font-bold text-base w-6',
                      isSelected ? 'text-neon-cyan' : 'text-text-main'
                    )}>
                      {noteName}
                    </span>
                    <span className="font-ui text-sm text-text-muted">Major</span>
                    <span className="ml-auto font-code text-[10px] text-text-muted tracking-wide">
                      {scale.join(' ')}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="h-8 w-px bg-metal-dark mx-2" />
        <div className="flex flex-col">
          <span className="text-[10px] text-text-muted uppercase tracking-widest">Scale</span>
          <span className="font-code text-sm text-text-main">{scaleNotes.join(' ')}</span>
        </div>
      </div>
    </div>
  );
}
