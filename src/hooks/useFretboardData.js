import { useMemo } from 'react';
import { useAppStore } from '../stores/useAppStore';
import { TUNINGS } from '../music/tunings';
import { generateFretboardGrid, getFretMarkers, getDisplayFretNumbers } from '../music/fretboard';
import { calculateFretWidths } from '../utils/fretSpacing';

export function useFretboardData() {
  const tuning = useAppStore((s) => s.tuning);
  const fretCount = useAppStore((s) => s.fretCount);
  const isLeftHanded = useAppStore((s) => s.isLeftHanded);

  const tuningData = TUNINGS[tuning];

  const grid = useMemo(
    () => generateFretboardGrid(tuningData.notes, fretCount),
    [tuningData, fretCount]
  );

  const fretWidths = useMemo(
    () => calculateFretWidths(fretCount),
    [fretCount]
  );

  const markers = useMemo(
    () => getFretMarkers(fretCount),
    [fretCount]
  );

  const displayFretNumbers = useMemo(
    () => getDisplayFretNumbers(fretCount),
    [fretCount]
  );

  return {
    grid,
    fretWidths,
    markers,
    displayFretNumbers,
    fretCount,
    tuningData,
    isLeftHanded,
  };
}
