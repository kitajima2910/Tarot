import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const NAV = [
  { to: '/', label: 'Trang chủ', end: true },
  { to: '/tarot-reading', label: 'Tra cứu chủ đề' },
  { to: '/question-reading', label: 'Tra cứu câu hỏi' },
  { to: '/card-meanings', label: '78 lá bài' },
  { to: '/about', label: 'Giới thiệu' },
  { to: '/contact', label: 'Liên hệ' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-3 py-2 text-sm transition hover:bg-white/10 ${
      isActive ? 'text-violet-300' : 'text-slate-300'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0f0f1a]/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-lg text-white">
            ✦
          </span>
          <span className="text-lg font-bold tracking-wide text-white">Tarot Huyền Bí</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkCls}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Mở menu"
          aria-expanded={open}
          className="rounded-lg p-2 text-slate-200 hover:bg-white/10 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/10 px-4 pb-4 md:hidden">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 text-sm ${
                  isActive ? 'bg-white/10 text-violet-300' : 'text-slate-300'
                }`
              }
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
