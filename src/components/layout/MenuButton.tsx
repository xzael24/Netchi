"use client";

export function MenuButton({ onClick, label = "Menu" }: { onClick: () => void; label?: string }) {
  return (
    <button
      onClick={onClick}
      className="font-display font-bold uppercase tracking-widest px-4 py-1.5 hover:bg-[#EF4444] transition-colors text-[0.875rem]"
    >
      {label}
    </button>
  );
}