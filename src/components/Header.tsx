import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useI18n } from '../i18n/useI18n'

const NAV = [
  { to: '/', label: 'nav.home', end: true },
  { to: '/tarot-reading', label: 'nav.topic' },
  { to: '/question-reading', label: 'nav.question' },
  { to: '/card-meanings', label: 'nav.cards' },
  { to: '/about', label: 'nav.about' },
  { to: '/contact', label: 'nav.contact' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const { t, locale, setLocale } = useI18n()
  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-3 py-2 text-sm transition hover:bg-white/10 ${
      isActive ? 'text-violet-300' : 'text-slate-300'
    }`

  const toggleLocale = () => setLocale(locale === 'vi' ? 'en' : 'vi')

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0f0f1a]/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-lg text-white">
            ✦
          </span>
          <span className="text-lg font-bold tracking-wide text-white">{t('brand')}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkCls}>
              {t(item.label)}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={toggleLocale}
            aria-label={locale === 'vi' ? 'Switch to English' : 'Chuyển sang tiếng Việt'}
            className="rounded-lg border border-white/10 px-2.5 py-1.5 text-xs font-semibold text-slate-200 transition hover:bg-white/10"
          >
            {locale === 'vi' ? 'EN' : 'VI'}
          </button>
          <button
            type="button"
            aria-label={t('nav.openMenu')}
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
              {t(item.label)}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
