import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAppStore = create(
  persist(
    (set) => ({
      activeMode: 'freeplay',
      setActiveMode: (mode) => set({ activeMode: mode }),

      // Settings
      tuning: 'standard',
      fretCount: 20,
      isLeftHanded: false,
      useFlats: false,
      isSettingsOpen: false,

      setTuning: (tuning) => set({ tuning }),
      setFretCount: (fretCount) => set({ fretCount }),
      setIsLeftHanded: (isLeftHanded) => set({ isLeftHanded }),
      setUseFlats: (useFlats) => set({ useFlats }),
      setIsSettingsOpen: (isSettingsOpen) => set({ isSettingsOpen }),

      // Active notes (free play visual feedback)
      activeNotes: [],
      addActiveNote: (note) =>
        set((state) => ({ activeNotes: [...state.activeNotes, note] })),
      removeActiveNote: (id) =>
        set((state) => ({
          activeNotes: state.activeNotes.filter((n) => n.id !== id),
        })),
      clearActiveNotes: () => set({ activeNotes: [] }),
    }),
    {
      name: 'bassically-settings',
      partialize: (state) => ({
        tuning: state.tuning,
        fretCount: state.fretCount,
        isLeftHanded: state.isLeftHanded,
        useFlats: state.useFlats,
      }),
    }
  )
);
