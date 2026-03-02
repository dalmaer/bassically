export default function FretWires({ fretWidths, fretCount }) {
  return (
    <div className="absolute inset-0 flex w-full h-full pointer-events-none">
      {fretWidths.map((width, i) => (
        <div
          key={i}
          className="h-full border-r-[2px] border-white/10"
          style={{ flexBasis: `${width}%` }}
        />
      ))}
    </div>
  );
}
