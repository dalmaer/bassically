import { create } from 'zustand';
import { AudioEngine } from '../audio/AudioEngine';

export const useAudioStore = create((set, get) => ({
  engine: null,
  isInitialized: false,
  volume: 0.8,
  isMuted: false,

  initEngine: () => {
    if (get().isInitialized) return;
    const engine = new AudioEngine();
    engine.init();
    set({ engine, isInitialized: true });
  },

  setVolume: (volume) => {
    const { engine } = get();
    if (engine) engine.setVolume(volume);
    set({ volume });
  },

  toggleMute: () => {
    const { engine, isMuted, volume } = get();
    if (engine) {
      engine.setVolume(isMuted ? volume : 0);
    }
    set({ isMuted: !isMuted });
  },
}));
