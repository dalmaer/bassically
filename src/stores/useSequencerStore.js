import { create } from 'zustand';

export const useSequencerStore = create((set, get) => ({
  key: 7, // G
  progression: [1, 4, 5],
  activeStep: 0,
  isPlaying: false,
  tempo: 80,

  setKey: (key) => set({ key }),
  setProgression: (progression) => set({ progression, activeStep: 0 }),
  setTempo: (tempo) => set({ tempo }),

  nextStep: () =>
    set((state) => ({
      activeStep: (state.activeStep + 1) % state.progression.length,
    })),

  prevStep: () =>
    set((state) => ({
      activeStep:
        (state.activeStep - 1 + state.progression.length) % state.progression.length,
    })),

  togglePlayback: () => set((state) => ({ isPlaying: !state.isPlaying })),

  reset: () => set({ activeStep: 0, isPlaying: false }),
}));
