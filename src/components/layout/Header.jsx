import { useAppStore } from '../../stores/useAppStore';

export default function Header() {
  const setIsSettingsOpen = useAppStore((s) => s.setIsSettingsOpen);

  return (
    <header className="h-[60px] border-b border-metal-dark bg-void/80 backdrop-blur-md flex items-center justify-between px-6 md:px-10 z-50 shrink-0">
      <div className="flex items-center gap-3 group cursor-pointer">
        <div className="size-8 flex items-center justify-center text-neon-cyan bg-neon-cyan/10 rounded border border-neon-cyan/20 group-hover:shadow-glow-cyan transition-all duration-300">
          <span className="material-symbols-outlined text-[20px]">music_note</span>
        </div>
        <h1 className="font-mono font-bold text-lg tracking-widest text-white uppercase pt-1">
          Bassically
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-metal-dark text-text-main transition-colors border border-transparent hover:border-metal-light group">
          <span className="material-symbols-outlined group-hover:text-neon-cyan transition-colors">
            volume_up
          </span>
        </button>
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-metal-dark text-text-muted hover:text-text-main transition-colors border border-transparent hover:border-metal-light group"
        >
          <span className="material-symbols-outlined group-hover:text-neon-cyan transition-colors">
            settings
          </span>
        </button>
      </div>
    </header>
  );
}
