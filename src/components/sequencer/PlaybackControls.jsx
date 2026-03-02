import { useSequencerStore } from '../../stores/useSequencerStore';

export default function PlaybackControls() {
  const isPlaying = useSequencerStore((s) => s.isPlaying);
  const togglePlayback = useSequencerStore((s) => s.togglePlayback);
  const nextStep = useSequencerStore((s) => s.nextStep);
  const prevStep = useSequencerStore((s) => s.prevStep);

  return (
    <div className="flex flex-col gap-2 items-end">
      <span className="text-xs font-display uppercase tracking-wider text-text-muted">
        Sequencer
      </span>
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
    </div>
  );
}
