import { useAppStore } from '../../stores/useAppStore';

export default function EnharmonicToggle() {
  const useFlats = useAppStore((s) => s.useFlats);
  const setUseFlats = useAppStore((s) => s.setUseFlats);

  return (
    <button
      onClick={() => setUseFlats(!useFlats)}
      className="px-3 py-1 rounded border border-metal-dark text-xs font-code text-text-muted hover:text-text-main hover:border-metal-light transition-all"
    >
      {useFlats ? '♭ Flats' : '♯ Sharps'}
    </button>
  );
}
