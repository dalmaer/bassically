import { cn } from '../../utils/cn';

const COLOR_CLASSES = {
  'neon-cyan': {
    border: 'border-neon-cyan',
    shadow: 'shadow-glow-cyan',
    text: 'text-neon-cyan',
    bg: 'bg-neon-cyan',
  },
  'neon-magenta': {
    border: 'border-neon-magenta',
    shadow: 'shadow-glow-magenta',
    text: 'text-neon-magenta',
    bg: 'bg-neon-magenta',
  },
  'neon-lime': {
    border: 'border-neon-lime',
    shadow: 'shadow-glow-lime',
    text: 'text-neon-lime',
    bg: 'bg-neon-lime',
  },
  'neon-amber': {
    border: 'border-neon-amber',
    shadow: 'shadow-glow-amber',
    text: 'text-neon-amber',
    bg: 'bg-neon-amber',
  },
};

export default function NoteBubble({ note, color = 'neon-cyan', opacity = 1, pulse = false }) {
  const colors = COLOR_CLASSES[color] || COLOR_CLASSES['neon-cyan'];

  return (
    <div
      className={cn(
        'absolute inset-0 flex items-center justify-center z-30 animate-pop-in',
        pulse && 'animate-pulse-glow'
      )}
      style={{ opacity }}
    >
      <div
        className={cn(
          'w-8 h-8 rounded-full bg-surface border-2 flex items-center justify-center',
          colors.border,
          colors.shadow
        )}
      >
        <span className={cn('font-display font-bold text-xs', 'text-white')}>
          {note}
        </span>
      </div>
    </div>
  );
}
