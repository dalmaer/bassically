export default function StringLabels({ stringNames, isLeftHanded }) {
  return (
    <div className="w-8 shrink-0 flex flex-col justify-between py-[42px] text-right font-mono text-text-muted text-sm font-bold opacity-60 pr-1 h-[280px] md:h-[320px]">
      {stringNames.map((name, i) => (
        <span key={i}>{name}</span>
      ))}
    </div>
  );
}
