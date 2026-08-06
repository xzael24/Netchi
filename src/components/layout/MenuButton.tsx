"use client";

export function MenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="font-display font-bold uppercase tracking-widest px-4 py-1.5 hover:bg-[#EF4444] transition-colors cq-hero-nav"
    >
      Menu
    </button>
  );
}