export default function FretboardNeck({ children, isLeftHanded }) {
  return (
    <div
      className="neck-wood relative w-full h-[280px] md:h-[320px] rounded-xl border border-metal-dark shadow-2xl flex overflow-hidden"
      style={{ direction: isLeftHanded ? 'rtl' : 'ltr' }}
    >
      {children}
    </div>
  );
}
