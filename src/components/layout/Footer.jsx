import { useAppStore } from '../../stores/useAppStore';
import { cn } from '../../utils/cn';

const MODES = [
  { id: 'freeplay', label: 'STAGE', icon: 'piano_off' },
  { id: 'discovery', label: 'DISCOVERY', icon: 'travel_explore' },
  { id: 'sequencer', label: 'SEQUENCER', icon: 'queue_music' },
];

export default function Footer() {
  const activeMode = useAppStore((s) => s.activeMode);
  const setActiveMode = useAppStore((s) => s.setActiveMode);
  const setIsSettingsOpen = useAppStore((s) => s.setIsSettingsOpen);

  const handleModeClick = (id) => {
    if (id === 'calibrate') {
      setIsSettingsOpen(true);
    } else {
      setActiveMode(id);
    }
  };

  return (
    <footer className="h-[80px] border-t border-metal-dark bg-surface flex items-center justify-center px-4 relative z-50 shrink-0">
      <div className="bg-metal-dark p-1 rounded-xl flex items-center gap-1 shadow-inner max-w-lg w-full">
        {MODES.map((mode) => (
          <button
            key={mode.id}
            onClick={() => handleModeClick(mode.id)}
            className={cn(
              'flex-1 py-2 px-4 rounded-lg font-ui text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition-all',
              (activeMode === mode.id || (mode.id === 'calibrate' && false))
                ? 'bg-surface text-neon-cyan shadow-sm font-display font-bold'
                : 'text-text-muted hover:text-text-main'
            )}
          >
            <span className="material-symbols-outlined text-[18px]">{mode.icon}</span>
            <span className="hidden sm:inline">{mode.label}</span>
          </button>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-metal-dark via-neon-cyan/50 to-metal-dark opacity-30" />
    </footer>
  );
}
