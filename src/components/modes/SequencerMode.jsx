import { useMemo, useEffect, useRef, useCallback } from 'react';
import Fretboard from '../fretboard/Fretboard';
import KeySelector from '../sequencer/KeySelector';
import ProgressionSlots from '../sequencer/ProgressionSlots';
import PlaybackControls from '../sequencer/PlaybackControls';
import ProgressionLegend from '../sequencer/ProgressionLegend';
import { useSequencerStore } from '../../stores/useSequencerStore';
import { useAppStore } from '../../stores/useAppStore';
import { useAudioEngine } from '../../hooks/useAudioEngine';
import { TUNINGS } from '../../music/tunings';
import { findNotePositions } from '../../music/fretboard';
import { resolveProgression, getNashvilleColor } from '../../music/nashville';
import { semitoneToNote } from '../../music/noteMap';

export default function SequencerMode() {
  const tuning = useAppStore((s) => s.tuning);
  const fretCount = useAppStore((s) => s.fretCount);
  const useFlats = useAppStore((s) => s.useFlats);
  const tuningData = TUNINGS[tuning];

  const key = useSequencerStore((s) => s.key);
  const progression = useSequencerStore((s) => s.progression);
  const activeStep = useSequencerStore((s) => s.activeStep);
  const isPlaying = useSequencerStore((s) => s.isPlaying);
  const tempo = useSequencerStore((s) => s.tempo);
  const nextStep = useSequencerStore((s) => s.nextStep);

  const intervalRef = useRef(null);
  const stepCountRef = useRef(0);
  const { playNote, ensureReady } = useAudioEngine();

  // Pick an interesting MIDI note for the current step's chord
  // Varies the voicing across steps so it doesn't just drone on the lowest note
  const playStepNote = useCallback(
    (stepIndex) => {
      const semitone = resolveProgression(key, progression)[stepIndex];
      if (semitone === undefined) return;

      const positions = findNotePositions(semitone, tuningData.notes, fretCount);
      if (positions.length === 0) return;

      // Get all possible MIDI notes for this chord tone
      const midiNotes = positions.map(
        (pos) => tuningData.midiBase[pos.stringIndex] + pos.fret
      );

      // Sort and deduplicate
      const unique = [...new Set(midiNotes)].sort((a, b) => a - b);

      // Vary which octave we pick based on the step count to create movement:
      // alternates between mid-range and lower voicings
      const count = stepCountRef.current++;
      const patterns = [
        // Root position (lower-mid), higher voicing, lowest, mid
        Math.floor(unique.length * 0.3),
        Math.min(unique.length - 1, Math.floor(unique.length * 0.7)),
        0,
        Math.floor(unique.length * 0.5),
      ];
      const pickIndex = patterns[count % patterns.length];
      const midiNote = unique[Math.min(pickIndex, unique.length - 1)];

      playNote(midiNote, { duration: (60 / tempo) * 1.8 });
    },
    [key, progression, tuningData, fretCount, playNote, tempo]
  );

  // Auto-advance when playing
  useEffect(() => {
    if (isPlaying) {
      // Play the current step immediately when starting
      ensureReady().then(() => playStepNote(activeStep));

      intervalRef.current = setInterval(() => {
        nextStep();
      }, (60 / tempo) * 1000 * 2); // 2 beats per step
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, tempo, nextStep, ensureReady]);

  // Play note whenever activeStep changes while playing
  useEffect(() => {
    if (isPlaying) {
      playStepNote(activeStep);
    }
  }, [activeStep, isPlaying, playStepNote]);

  const resolvedNotes = useMemo(
    () => resolveProgression(key, progression),
    [key, progression]
  );

  const highlightedNotes = useMemo(() => {
    const notes = [];
    resolvedNotes.forEach((semitone, stepIndex) => {
      const positions = findNotePositions(semitone, tuningData.notes, fretCount);
      const nashNum = progression[stepIndex];
      const color = getNashvilleColor(nashNum);
      const noteName = semitoneToNote(semitone, useFlats);
      const isActive = stepIndex === activeStep;

      positions.forEach((pos) => {
        notes.push({
          ...pos,
          note: noteName,
          color,
          opacity: isActive ? 1 : 0.3,
          pulse: isActive,
          id: `${stepIndex}-${pos.stringIndex}-${pos.fret}`,
        });
      });
    });
    return notes;
  }, [resolvedNotes, tuningData, fretCount, activeStep, progression, useFlats]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* NNS Control Panel */}
      <div className="w-full bg-surface border-b border-metal-dark py-5 px-6 lg:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-40">
        <KeySelector />
        <ProgressionSlots />
        <PlaybackControls />
      </div>

      {/* Fretboard Stage */}
      <div className="flex-1 w-full bg-void relative flex flex-col items-center justify-center overflow-hidden py-8">
        {/* Background Grid */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(#333338 1px, transparent 1px), linear-gradient(90deg, #333338 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="w-full max-w-[95%] xl:max-w-[1400px] px-4">
          <Fretboard highlightedNotes={highlightedNotes} />
        </div>
        <ProgressionLegend />
      </div>
    </div>
  );
}
