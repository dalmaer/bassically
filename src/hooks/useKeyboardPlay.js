import { useEffect } from 'react';
import { useAppStore } from '../stores/useAppStore';
import { useAudioStore } from '../stores/useAudioStore';
import { TUNINGS } from '../music/tunings';
import { findNotePositions } from '../music/fretboard';
import { semitoneToNote } from '../music/noteMap';

const KEY_TO_SEMITONE = {
  a: 9,  // A
  b: 11, // B
  c: 0,  // C
  d: 2,  // D
  e: 4,  // E
  f: 5,  // F
  g: 7,  // G
};

export function useKeyboardPlay() {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
      // Ignore repeats
      if (e.repeat) return;

      const semitone = KEY_TO_SEMITONE[e.key.toLowerCase()];
      if (semitone === undefined) return;

      const { tuning, fretCount, useFlats, addActiveNote, removeActiveNote } = useAppStore.getState();
      const tuningData = TUNINGS[tuning];
      const positions = findNotePositions(semitone, tuningData.notes, fretCount);
      if (positions.length === 0) return;

      // Sort by MIDI note low to high
      const sorted = positions
        .map((pos) => ({
          ...pos,
          midi: tuningData.midiBase[pos.stringIndex] + pos.fret,
        }))
        .sort((a, b) => a.midi - b.midi);

      // Normal = lowest position, Shift = pick one ~octave higher
      let pick;
      if (e.shiftKey) {
        // Find first position at least 12 semitones above the lowest
        const lowMidi = sorted[0].midi;
        pick = sorted.find((p) => p.midi >= lowMidi + 12) || sorted[sorted.length - 1];
      } else {
        pick = sorted[0];
      }

      // Init audio if needed
      const audioStore = useAudioStore.getState();
      if (!audioStore.isInitialized) audioStore.initEngine();

      // Play the note
      const engine = useAudioStore.getState().engine;
      if (engine) engine.playNote(pick.midi);

      // Visual feedback
      const noteName = semitoneToNote(semitone, useFlats);
      const id = `kb-${pick.stringIndex}-${pick.fret}-${Date.now()}`;
      addActiveNote({
        id,
        stringIndex: pick.stringIndex,
        fret: pick.fret,
        note: noteName,
        color: 'neon-cyan',
        filled: true,
      });
      setTimeout(() => removeActiveNote(id), 500);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
}
