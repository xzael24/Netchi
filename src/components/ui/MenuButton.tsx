"use client";

export function MenuButton({ onClick, label = "Menu", compact = false, fill = false }: { onClick: () => void; label?: string; compact?: boolean; fill?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`font-display font-bold uppercase tracking-widest hover:bg-[#EF4444] transition-colors ${
        fill
          ? "flex h-full items-center px-2 text-[0.85rem]"
          : compact
            ? "px-2 py-0 leading-none text-[0.85rem]"
            : "px-4 py-1.5 text-[0.875rem]"
      }`}
    >
      {label}
    </button>
  );
}