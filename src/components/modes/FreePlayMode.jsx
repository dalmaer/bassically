import Fretboard from '../fretboard/Fretboard';
import NoteHistory from '../fretboard/NoteHistory';

export default function FreePlayMode() {
  return (
    <div className="flex-1 relative flex flex-col items-center justify-center w-full p-4 md:p-10">
      {/* Ambient Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-neon-cyan/5 blur-[120px] rounded-full" />
      </div>

      <NoteHistory />
      <Fretboard />
    </div>
  );
}
