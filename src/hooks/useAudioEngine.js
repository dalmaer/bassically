import { useCallback } from 'react';
import { useAudioStore } from '../stores/useAudioStore';

export function useAudioEngine() {
  const isInitialized = useAudioStore((s) => s.isInitialized);
  const initEngine = useAudioStore((s) => s.initEngine);

  const ensureReady = useCallback(async () => {
    if (!isInitialized) await initEngine();
  }, [isInitialized, initEngine]);

  // Always read engine from store at call time to avoid stale closure
  const playNote = useCallback(
    (midiNote, options) => {
      const engine = useAudioStore.getState().engine;
      if (engine) return engine.playNote(midiNote, options);
      return null;
    },
    []
  );

  return { ensureReady, isReady: isInitialized, playNote };
}
