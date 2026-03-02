import { useState, useRef, useEffect } from 'react';
import { useSequencerStore } from '../../stores/useSequencerStore';
import { useAppStore } from '../../stores/useAppStore';
import { NNS_LABELS, nashvilleToSemitone } from '../../music/nashville';
import { semitoneToNote } from '../../music/noteMap';
import { PROGRESSION_PRESETS } from '../../music/progressions';
import { cn } from '../../utils/cn';

const COLOR_MAP = {
  'neon-cyan': { border: 'border-neon-cyan', text: 'text-neon-cyan', shadow: 'shadow-glow-cyan', bg: 'bg-neon-cyan' },
  'neon-magenta': { border: 'border-neon-magenta', text: 'text-neon-magenta', shadow: 'shadow-glow-magenta', bg: 'bg-neon-magenta' },
  'neon-lime': { border: 'border-neon-lime', text: 'text-neon-lime', shadow: 'shadow-glow-lime', bg: 'bg-neon-lime' },
  'neon-amber': { border: 'border-neon-amber', text: 'text-neon-amber', shadow: 'shadow-glow-amber', bg: 'bg-neon-amber' },
};

export default function ProgressionSlots() {
  const key = useSequencerStore((s) => s.key);
  const progression = useSequencerStore((s) => s.progression);
  const activeStep = useSequencerStore((s) => s.activeStep);
  const setProgression = useSequencerStore((s) => s.setProgression);
  const useFlats = useAppStore((s) => s.useFlats);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const pickerRef = useRef(null);

  const patternLabel = progression.map((n) => NNS_LABELS[n]?.roman || n).join(' - ');

  // Match current progression to a preset for highlighting
  const currentPresetIndex = PROGRESSION_PRESETS.findIndex(
    (p) => p.numbers.length === progression.length && p.numbers.every((n, i) => n === progression[i])
  );

  useEffect(() => {
    if (!isPickerOpen) return;
    function handleClick(e) {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setIsPickerOpen(false);
      }
    }
    document.addEventListener('pointerdown', handleClick);
    return () => document.removeEventListener('pointerdown', handleClick);
  }, [isPickerOpen]);

  return (
    <div className="flex-1 w-full max-w-2xl flex flex-col gap-2 items-center">
      <div className="flex items-center justify-between w-full px-1">
        <span className="text-xs font-display uppercase tracking-wider text-text-muted">
          Current Pattern: {patternLabel}
        </span>
        <div className="relative" ref={pickerRef}>
          <button
            onClick={() => setIsPickerOpen(!isPickerOpen)}
            className="text-xs text-text-muted hover:text-neon-cyan transition-colors uppercase font-bold tracking-wider flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[14px]">swap_horiz</span>
            Change
          </button>
          {isPickerOpen && (
            <div className="absolute top-full right-0 mt-2 w-72 bg-surface border border-metal-dark rounded-lg shadow-2xl z-[100] overflow-hidden max-h-[400px] overflow-y-auto">
              {PROGRESSION_PRESETS.map((preset, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setProgression(preset.numbers);
                    setIsPickerOpen(false);
                  }}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-b border-metal-dark/30 last:border-b-0',
                    i === currentPresetIndex
                      ? 'bg-neon-cyan/10 text-neon-cyan'
                      : 'text-text-main hover:bg-metal-dark/50'
                  )}
                >
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className={cn(
                      'font-display font-bold text-sm',
                      i === currentPresetIndex ? 'text-neon-cyan' : 'text-text-main'
                    )}>
                      {preset.label}
                    </span>
                    <span className="text-[11px] text-text-muted truncate">
                      {preset.description}
                    </span>
                  </div>
                  {i === currentPresetIndex && (
                    <span className="material-symbols-outlined text-neon-cyan text-[16px]">check</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="grid gap-3 w-full" style={{ gridTemplateColumns: `repeat(${progression.length}, 1fr)` }}>
        {progression.map((num, i) => {
          const label = NNS_LABELS[num] || { roman: num, name: `#${num}`, color: 'neon-cyan' };
          const colors = COLOR_MAP[label.color] || COLOR_MAP['neon-cyan'];
          const isActive = i === activeStep;
          const resolvedSemitone = nashvilleToSemitone(key, num);
          const noteName = semitoneToNote(resolvedSemitone, useFlats);

          return (
            <button
              key={i}
              className={cn(
                'relative group bg-surface rounded-xl p-3 flex flex-col items-center gap-1 transition-all',
                isActive
                  ? cn('border', colors.border, colors.shadow, 'transform scale-[1.02]')
                  : 'border border-metal-dark opacity-40 hover:opacity-100'
              )}
            >
              <span className={cn('text-xs font-code font-bold tracking-widest', colors.text)}>
                {label.name}
              </span>
              <span className={cn('text-3xl font-display font-bold', colors.text)}>
                {label.roman}
              </span>
              <span className="text-xs text-text-muted mt-1">{noteName} Major</span>
              {isActive && (
                <div className="absolute top-0 right-0 p-1.5">
                  <span className={cn('flex size-2 rounded-full animate-pulse', colors.bg)} />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
