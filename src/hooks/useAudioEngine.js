import { useCallback } from 'react';
import { useAudioStore } from '../stores/useAudioStore';

export function useAudioEngine() {
  const engine = useAudioStore((s) => s.engine);
  const isInitialized = useAudioStore((s) => s.isInitialized);
  const initEngine = useAudioStore((s) => s.initEngine);

  const ensureReady = useCallback(async () => {
    if (!isInitialized) await initEngine();
  }, [isInitialized, initEngine]);

  const playNote = useCallback(
    (midiNote, options) => {
      if (engine) return engine.playNote(midiNote, options);
      return null;
    },
    [engine]
  );

  return { engine, ensureReady, isReady: isInitialized, playNote };
}
