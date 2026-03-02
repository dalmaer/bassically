import { useState, useRef, useEffect } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { useAudioStore } from '../../stores/useAudioStore';

export default function Header() {
  const setIsSettingsOpen = useAppStore((s) => s.setIsSettingsOpen);
  const { volume, isMuted, setVolume, toggleMute } = useAudioStore();
  const [showSlider, setShowSlider] = useState(false);
  const sliderRef = useRef(null);

  // Close slider on outside click
  useEffect(() => {
    if (!showSlider) return;
    const handleClick = (e) => {
      if (sliderRef.current && !sliderRef.current.contains(e.target)) {
        setShowSlider(false);
      }
    };
    document.addEventListener('pointerdown', handleClick);
    return () => document.removeEventListener('pointerdown', handleClick);
  }, [showSlider]);

  const volumeIcon = isMuted || volume === 0
    ? 'volume_off'
    : volume < 0.5
      ? 'volume_down'
      : 'volume_up';

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
        <div className="relative" ref={sliderRef}>
          <button
            onClick={toggleMute}
            onContextMenu={(e) => { e.preventDefault(); setShowSlider((s) => !s); }}
            onDoubleClick={() => setShowSlider((s) => !s)}
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-metal-dark text-text-main transition-colors border border-transparent hover:border-metal-light group"
          >
            <span className={`material-symbols-outlined transition-colors ${isMuted ? 'text-text-muted' : 'group-hover:text-neon-cyan'}`}>
              {volumeIcon}
            </span>
          </button>
          {showSlider && (
            <div className="absolute top-full right-0 mt-2 bg-surface border border-metal-dark rounded-lg p-3 shadow-2xl z-[100] flex items-center gap-3 min-w-[180px]">
              <span className="material-symbols-outlined text-text-muted text-sm">volume_down</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  const v = parseFloat(e.target.value);
                  setVolume(v);
                  if (isMuted && v > 0) toggleMute();
                }}
                className="flex-1 h-1 bg-metal-dark rounded-lg appearance-none cursor-pointer accent-neon-cyan"
              />
              <span className="material-symbols-outlined text-text-muted text-sm">volume_up</span>
            </div>
          )}
        </div>
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
