const STRING_HEIGHTS = [2.5, 4, 5.5, 7.5]; // G (thinnest) to E (thickest)

export default function StringSet({ stringCount = 4 }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-between py-10 pointer-events-none z-10">
      {STRING_HEIGHTS.slice(0, stringCount).map((height, i) => (
        <div
          key={i}
          className="string-bass w-full rounded-full"
          style={{ height: `${height}px` }}
        />
      ))}
    </div>
  );
}
