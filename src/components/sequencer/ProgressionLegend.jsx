import { useSequencerStore } from '../../stores/useSequencerStore';
import { NNS_LABELS } from '../../music/nashville';
import { cn } from '../../utils/cn';

const COLOR_BG = {
  'neon-cyan': 'bg-neon-cyan',
  'neon-magenta': 'bg-neon-magenta',
  'neon-lime': 'bg-neon-lime',
  'neon-amber': 'bg-neon-amber',
};

const COLOR_SHADOW = {
  'neon-cyan': 'shadow-glow-cyan',
  'neon-magenta': 'shadow-glow-magenta',
  'neon-lime': 'shadow-glow-lime',
  'neon-amber': 'shadow-glow-amber',
};

export default function ProgressionLegend() {
  const progression = useSequencerStore((s) => s.progression);
  const activeStep = useSequencerStore((s) => s.activeStep);

  // Deduplicate: show each unique degree once, in order of first appearance
  const seen = new Set();
  const uniqueDegrees = [];
  for (const num of progression) {
    if (!seen.has(num)) {
      seen.add(num);
      uniqueDegrees.push(num);
    }
  }

  return (
    <div className="mt-8 text-text-muted text-sm font-code flex items-center gap-6 flex-wrap justify-center">
      {uniqueDegrees.map((num) => {
        const label = NNS_LABELS[num] || { roman: `${num}`, name: `#${num}`, color: 'neon-cyan' };
        const isActive = progression[activeStep] === num;

        return (
          <div key={num} className="flex items-center gap-2">
            <span
              className={cn(
                'size-3 rounded-full',
                COLOR_BG[label.color] || 'bg-neon-cyan',
                isActive && (COLOR_SHADOW[label.color] || 'shadow-glow-cyan')
              )}
            />
            <span className={cn(isActive && 'text-text-main font-bold')}>
              {label.name} ({label.roman})
            </span>
          </div>
        );
      })}
    </div>
  );
}
