import type { ReactNode } from 'react'

export function ActionButton({ children, onClick, disabled }: { children: ReactNode; onClick?: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 px-10 py-3 font-semibold text-white shadow-lg shadow-indigo-950/40 ring-1 ring-white/10 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  )
}
