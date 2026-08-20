/* Cinta diagonal en la esquina superior izquierda: producto en oferta. */
export function CintaOferta() {
  return (
    <div className="pointer-events-none absolute left-0 top-0 z-10 h-24 w-24 overflow-hidden">
      <span className="absolute left-[-42px] top-[16px] w-44 -rotate-45 bg-acento py-1 text-center text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-md">
        Oferta
      </span>
    </div>
  );
}
