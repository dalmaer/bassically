import { useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { TUNINGS } from '../../music/tunings';
import { useAudioEngine } from '../../hooks/useAudioEngine';

export default function SettingsModal() {
  const store = useAppStore();
  const { playNote, ensureReady } = useAudioEngine();

  // Local state for editing (commit on save)
  const [localTuning, setLocalTuning] = useState(store.tuning);
  const [localFretCount, setLocalFretCount] = useState(store.fretCount);
  const [localLeftHanded, setLocalLeftHanded] = useState(store.isLeftHanded);

  const handleSave = () => {
    store.setTuning(localTuning);
    store.setFretCount(localFretCount);
    store.setIsLeftHanded(localLeftHanded);
    store.setIsSettingsOpen(false);
  };

  const handleCancel = () => {
    store.setIsSettingsOpen(false);
  };

  const handleTestTone = async () => {
    await ensureReady();
    playNote(33); // A1
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-void/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-[600px] flex flex-col rounded-xl border border-metal-dark bg-surface shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-metal-dark bg-surface/50 p-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold tracking-wider text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-neon-cyan">tune</span>
              SYSTEM CONFIGURATION
            </h2>
            <p className="text-text-muted text-xs uppercase tracking-widest font-ui">
              Settings / Calibrate
            </p>
          </div>
          <button
            onClick={handleCancel}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-transparent text-text-muted hover:border-metal-dark hover:bg-white/5 hover:text-white transition-all"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-8 p-8 overflow-y-auto max-h-[70vh]">
          {/* Instrument Setup */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2 pb-2 border-b border-metal-dark/50">
              <span className="material-symbols-outlined text-text-muted text-sm">piano</span>
              <h3 className="text-sm font-bold uppercase tracking-widest text-text-muted">
                Instrument Setup
              </h3>
            </div>

            {/* Tuning */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-center">
              <div>
                <label className="block text-base font-medium text-white mb-1">
                  Tuning Standard
                </label>
                <p className="text-xs text-text-muted font-ui">
                  Select the base tuning for your strings.
                </p>
              </div>
              <div className="relative w-full md:w-48">
                <select
                  value={localTuning}
                  onChange={(e) => setLocalTuning(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-metal-dark bg-void py-2.5 pl-4 pr-10 text-sm text-text-main focus:border-neon-cyan focus:outline-none focus:ring-1 focus:ring-neon-cyan"
                >
                  {Object.entries(TUNINGS).map(([key, t]) => (
                    <option key={key} value={key}>
                      {t.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-text-muted">
                  <span className="material-symbols-outlined text-sm">expand_more</span>
                </div>
              </div>
            </div>

            {/* Fret Count */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-end">
                <div>
                  <label className="block text-base font-medium text-white">Fret Count</label>
                  <p className="text-xs text-text-muted font-ui">
                    Visible range of the fretboard.
                  </p>
                </div>
                <span className="font-code text-neon-cyan text-lg font-bold bg-neon-cyan/10 px-2 py-0.5 rounded border border-neon-cyan/20">
                  {localFretCount}
                </span>
              </div>
              <input
                type="range"
                min="12"
                max="24"
                value={localFretCount}
                onChange={(e) => setLocalFretCount(Number(e.target.value))}
                className="w-full h-1 bg-metal-dark rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-text-muted uppercase font-code">
                <span>12 Frets</span>
                <span>24 Frets</span>
              </div>
            </div>

            {/* Left Handed */}
            <div className="flex items-center justify-between p-4 rounded-lg border border-metal-dark bg-void/50">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-text-muted">pan_tool</span>
                <div>
                  <p className="text-sm font-medium text-white">Left Handed Mode</p>
                  <p className="text-xs text-text-muted font-ui">
                    Flips the fretboard horizontally.
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={localLeftHanded}
                  onChange={(e) => setLocalLeftHanded(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-metal-dark peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-neon-cyan/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-text-main after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-cyan peer-checked:after:bg-void" />
              </label>
            </div>
          </div>

          {/* Audio Output */}
          <div className="flex flex-col gap-5 pt-2">
            <div className="flex items-center gap-2 pb-2 border-b border-metal-dark/50">
              <span className="material-symbols-outlined text-text-muted text-sm">speaker</span>
              <h3 className="text-sm font-bold uppercase tracking-widest text-text-muted">
                Audio Output
              </h3>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleTestTone}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-metal-dark/30 hover:bg-metal-dark/60 border border-metal-dark hover:border-text-muted transition-all text-sm font-medium text-text-main"
              >
                <span className="material-symbols-outlined text-base">play_arrow</span>
                Test Tone
              </button>
              <div className="h-1 flex-1 bg-metal-dark rounded-full overflow-hidden">
                <div className="h-full w-0 bg-neon-cyan shadow-glow-cyan transition-all duration-75" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-metal-dark bg-surface/50 p-6">
          <button
            onClick={handleCancel}
            className="px-6 py-2.5 rounded-lg text-sm font-medium text-text-muted hover:text-white hover:bg-white/5 transition-colors uppercase tracking-wide"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-8 py-2.5 rounded-lg bg-neon-cyan text-void text-sm font-bold hover:bg-white hover:shadow-glow-cyan transition-all shadow-[0_0_5px_rgba(0,240,255,0.3)] uppercase tracking-wide"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
