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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="size-8 shrink-0 group-hover:drop-shadow-[0_0_6px_rgba(0,240,255,0.5)] transition-all duration-300">
          <defs>
            <filter id="header-glow">
              <feGaussianBlur stdDeviation="1.2" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <linearGradient id="header-neck" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2a1f14"/><stop offset="100%" stopColor="#1a1208"/>
            </linearGradient>
          </defs>
          <rect width="32" height="32" rx="6" fill="#050505"/>
          <rect x="12" y="6" width="8" height="22" rx="2" fill="url(#header-neck)" opacity="0.8"/>
          <line x1="12" y1="12" x2="20" y2="12" stroke="#4A4A52" strokeWidth="0.5"/>
          <line x1="12" y1="17" x2="20" y2="17" stroke="#4A4A52" strokeWidth="0.5"/>
          <line x1="12" y1="21" x2="20" y2="21" stroke="#4A4A52" strokeWidth="0.5"/>
          <line x1="12" y1="24.5" x2="20" y2="24.5" stroke="#4A4A52" strokeWidth="0.5"/>
          <line x1="14" y1="6" x2="14" y2="28" stroke="#9ca3af" strokeWidth="1.2" opacity="0.6"/>
          <line x1="16" y1="6" x2="16" y2="28" stroke="#9ca3af" strokeWidth="0.9" opacity="0.5"/>
          <line x1="18" y1="6" x2="18" y2="28" stroke="#9ca3af" strokeWidth="0.7" opacity="0.4"/>
          <rect x="11.5" y="9" width="9" height="1.5" rx="0.5" fill="#EAEAEA" opacity="0.7"/>
          <circle cx="16" cy="14.5" r="2.5" fill="#050505" stroke="#00F0FF" strokeWidth="1" filter="url(#header-glow)"/>
          <text x="16" y="16" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold" fontSize="3.5" fill="#00F0FF">B</text>
          <circle cx="14" cy="19" r="1.2" fill="#FF00FF" opacity="0.7" filter="url(#header-glow)"/>
          <circle cx="18" cy="23" r="1.2" fill="#CCFF00" opacity="0.6" filter="url(#header-glow)"/>
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
