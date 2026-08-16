/* Cinta diagonal roja en la esquina superior derecha de la foto. */
export function CintaAgotado() {
  return (
    <div className="pointer-events-none absolute right-0 top-0 z-10 h-24 w-24 overflow-hidden">
      <span className="absolute right-[-42px] top-[16px] w-44 rotate-45 bg-[#d63031] py-1 text-center text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-md">
        Agotado
      </span>
    </div>
  );
}
