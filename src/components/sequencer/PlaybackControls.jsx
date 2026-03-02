import { useSequencerStore } from '../../stores/useSequencerStore';

export default function PlaybackControls() {
  const isPlaying = useSequencerStore((s) => s.isPlaying);
  const togglePlayback = useSequencerStore((s) => s.togglePlayback);
  const nextStep = useSequencerStore((s) => s.nextStep);
  const prevStep = useSequencerStore((s) => s.prevStep);
  const tempo = useSequencerStore((s) => s.tempo);
  const setTempo = useSequencerStore((s) => s.setTempo);

  return (
    <div className="flex flex-col gap-2 items-end">
      <span className="text-xs font-display uppercase tracking-wider text-text-muted">
        Sequencer
      </span>
      <div className="flex items-center gap-3">
        {/* Transport controls */}
        <div className="flex items-center gap-2 bg-surface rounded-lg p-1 border border-metal-dark">
          <button
            onClick={prevStep}
            className="size-10 flex items-center justify-center rounded bg-void text-text-muted hover:text-neon-cyan transition-colors"
          >
            <span className="material-symbols-outlined">skip_previous</span>
          </button>
          <button
            onClick={togglePlayback}
            className="size-10 flex items-center justify-center rounded bg-neon-cyan text-void font-bold shadow-glow-cyan hover:shadow-lg hover:bg-white transition-all"
          >
            <span className="material-symbols-outlined">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>
          <button
            onClick={nextStep}
            className="size-10 flex items-center justify-center rounded bg-void text-text-muted hover:text-neon-cyan transition-colors"
          >
            <span className="material-symbols-outlined">skip_next</span>
          </button>
        </div>
        {/* Tempo control */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-neon-cyan text-sm font-bold bg-neon-cyan/10 px-2 py-1 rounded border border-neon-cyan/20 min-w-[56px] text-center">
            {tempo}
          </span>
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] text-text-muted uppercase tracking-wider font-display">BPM</span>
            <input
              type="range"
              min="40"
              max="200"
              value={tempo}
              onChange={(e) => setTempo(parseInt(e.target.value))}
              className="w-20 h-1 bg-metal-dark rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
