import { useMemo } from 'react';
import { useSequencerStore } from '../stores/useSequencerStore';
import { resolveProgression, getScaleNotes } from '../music/nashville';

export function useNashville(useFlats = false) {
  const key = useSequencerStore((s) => s.key);
  const progression = useSequencerStore((s) => s.progression);

  const resolvedNotes = useMemo(
    () => resolveProgression(key, progression),
    [key, progression]
  );

  const scaleNotes = useMemo(
    () => getScaleNotes(key, useFlats),
    [key, useFlats]
  );

  return { resolvedNotes, scaleNotes };
}
