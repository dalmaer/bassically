import { useState, useMemo, useCallback, useRef } from 'react';
import Fretboard from '../fretboard/Fretboard';
import NotePicker from '../discovery/NotePicker';
import { useAppStore } from '../../stores/useAppStore';
import { useAudioEngine } from '../../hooks/useAudioEngine';
import { TUNINGS } from '../../music/tunings';
import { findNotePositions } from '../../music/fretboard';
import { semitoneToNote } from '../../music/noteMap';

export default function DiscoveryMode() {
  const [selectedSemitone, setSelectedSemitone] = useState(7); // G by default
  const tuning = useAppStore((s) => s.tuning);
  const fretCount = useAppStore((s) => s.fretCount);
  const useFlats = useAppStore((s) => s.useFlats);
  const addActiveNote = useAppStore((s) => s.addActiveNote);
  const removeActiveNote = useAppStore((s) => s.removeActiveNote);
  const { playNote, ensureReady } = useAudioEngine();
  const arpeggioTimeouts = useRef([]);

  const tuningData = TUNINGS[tuning];

  const highlightedNotes = useMemo(() => {
    const positions = findNotePositions(selectedSemitone, tuningData.notes, fretCount);
    const noteName = semitoneToNote(selectedSemitone, useFlats);
    return positions.map((pos) => ({
      ...pos,
      note: noteName,
      color: 'neon-cyan',
      id: `${pos.stringIndex}-${pos.fret}`,
    }));
  }, [selectedSemitone, tuningData, fretCount, useFlats]);

  // Arpeggiate all found positions from lowest pitch to highest
  const arpeggiate = useCallback(
    async (semitone) => {
      // Clear any running arpeggio
      arpeggioTimeouts.current.forEach(clearTimeout);
      arpeggioTimeouts.current = [];

      await ensureReady();

      const positions = findNotePositions(semitone, tuningData.notes, fretCount);
      if (positions.length === 0) return;

      // Convert to MIDI notes and sort low to high
      const notes = positions.map((pos) => ({
        midi: tuningData.midiBase[pos.stringIndex] + pos.fret,
        ...pos,
      })).sort((a, b) => a.midi - b.midi);

      // Play every position even if same MIDI pitch — each is a
      // different spot on the neck and the user wants to hear them all
      const delayMs = 200;
      const noteName = semitoneToNote(semitone, useFlats);
      notes.forEach((note, i) => {
        const timeout = setTimeout(() => {
          playNote(note.midi, { duration: 1.2, velocity: 0.5 });
          // Flash the specific position being played
          const id = `arp-${note.stringIndex}-${note.fret}-${Date.now()}`;
          addActiveNote({
            id,
            stringIndex: note.stringIndex,
            fret: note.fret,
            note: noteName,
            color: 'neon-cyan',
          });
          setTimeout(() => removeActiveNote(id), 400);
        }, i * delayMs);
        arpeggioTimeouts.current.push(timeout);
      });
    },
    [tuningData, fretCount, useFlats, playNote, ensureReady, addActiveNote, removeActiveNote]
  );

  const handleSelect = useCallback(
    (semitone) => {
      setSelectedSemitone(semitone);
      arpeggiate(semitone);
    },
    [arpeggiate]
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Mode Indicator */}
      <div className="flex items-center justify-center gap-2 py-4 opacity-80">
        <span className="material-symbols-outlined text-neon-cyan text-lg">travel_explore</span>
        <span className="font-mono text-neon-cyan text-sm tracking-widest uppercase font-bold drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]">
          Discovery Mode
        </span>
      </div>

      {/* Fretboard */}
      <div className="flex-1 flex items-center justify-center px-4 md:px-10">
        <Fretboard highlightedNotes={highlightedNotes} />
      </div>

      {/* Bottom Control Deck */}
      <div className="bg-surface/80 backdrop-blur-md border-t border-metal-dark py-6 px-4 shrink-0">
        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          <div className="flex justify-between items-end">
            <h2 className="font-mono text-sm tracking-widest text-text-muted uppercase">
              Select Root Note
            </h2>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neon-cyan shadow-glow-cyan" />
              <span className="text-xs text-text-muted font-ui">Octaves</span>
            </div>
          </div>
          <NotePicker
            selectedSemitone={selectedSemitone}
            onSelect={handleSelect}
            useFlats={useFlats}
          />
        </div>
      </div>
    </div>
  );
}
