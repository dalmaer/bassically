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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="size-9 shrink-0 group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.6)] transition-all duration-300">
          <defs>
            <filter id="header-glow">
              <feGaussianBlur stdDeviation="1.5" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          {/* Bass clef symbol */}
          <path
            d="M8 6 C8 6, 14 6, 17 9 C20 12, 20 16, 17 19 C14 22, 8 22, 8 19 C8 17, 10 15, 13 15 C16 15, 18 17, 16 20 L16 26"
            fill="none"
            stroke="#00F0FF"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#header-glow)"
          />
          {/* Two dots */}
          <circle cx="21" cy="11" r="2" fill="#00F0FF" filter="url(#header-glow)"/>
          <circle cx="21" cy="17" r="2" fill="#00F0FF" filter="url(#header-glow)"/>
        </svg>
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
