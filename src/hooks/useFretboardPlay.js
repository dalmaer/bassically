import { useCallback } from 'react';
import { useAppStore } from '../stores/useAppStore';
import { useAudioEngine } from './useAudioEngine';
import { TUNINGS } from '../music/tunings';
import { noteAtPosition } from '../music/fretboard';
import { semitoneToNote } from '../music/noteMap';

export function useFretboardPlay() {
  const tuning = useAppStore((s) => s.tuning);
  const useFlats = useAppStore((s) => s.useFlats);
  const addActiveNote = useAppStore((s) => s.addActiveNote);
  const removeActiveNote = useAppStore((s) => s.removeActiveNote);
  const { playNote, ensureReady } = useAudioEngine();

  const tuningData = TUNINGS[tuning];

  const handleNotePress = useCallback(
    (stringIndex, fret) => {
      ensureReady();
      const semitone = noteAtPosition(tuningData.notes[stringIndex], fret);
      const noteName = semitoneToNote(semitone, useFlats);
      const midiNote = tuningData.midiBase[stringIndex] + fret;
      const id = `play-${stringIndex}-${fret}-${Date.now()}`;

      addActiveNote({ id, stringIndex, fret, note: noteName, color: 'neon-cyan', filled: true });
      playNote(midiNote);

      setTimeout(() => removeActiveNote(id), 500);
    },
    [tuningData, useFlats, addActiveNote, removeActiveNote, playNote, ensureReady]
  );

  return handleNotePress;
}
