import { useEffect, useMemo, useState } from 'react'
import { CARDS, cardById } from '../data/cards'
import type { Suit } from '../data/cards'
import { FlipCard } from '../components/FlipCard'
import { Ornament } from '../components/Ornament'
import { useI18n } from '../i18n/useI18n'
import { cardKeywordsReversed, cardKeywordsUpright, cardName, suitLabel } from '../i18n/localize'

const FILTERS: Array<{ key: Suit | 'all'; label: string }> = [
  { key: 'all', label: 'cards.filterAll' },
  { key: 'major', label: 'cards.filterMajor' },
  { key: 'wands', label: 'cards.filterWands' },
  { key: 'cups', label: 'cards.filterCups' },
  { key: 'swords', label: 'cards.filterSwords' },
  { key: 'pentacles', label: 'cards.filterPentacles' },
]

export function AllCardsPage() {
  const { t } = useI18n()
  const [filter, setFilter] = useState<Suit | 'all'>('all')
  const [query, setQuery] = useState('')
  const [zoom, setZoom] = useState<number | null>(null)

  const cards = useMemo(() => {
    const q = query.trim().toLowerCase()
    return CARDS.filter(
      (c) =>
        (filter === 'all' || c.suit === filter) &&
        (q === '' ||
          c.name.toLowerCase().includes(q) ||
          c.nameEn.toLowerCase().includes(q)),
    )
  }, [filter, query])

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Ornament text="Tarot" />
      <h1 className="text-center font-serif text-3xl font-bold tracking-wide text-gold-soft sm:text-4xl">{t('cards.title')}</h1>
      <p className="mt-3 text-center text-sm text-slate-400">
        {t('cards.subtitle')}
      </p>

      <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={`rounded-full px-4 py-1.5 text-sm transition ${
              filter === f.key
                ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white ring-1 ring-white/20'
                : 'border border-white/10 bg-white/5 text-slate-300 hover:border-violet-400/40 hover:bg-white/10'
            }`}
          >
            {t(f.label)}
          </button>
        ))}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('cards.searchPlaceholder')}
          aria-label={t('cards.searchAria')}
          className="w-44 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-violet-400 focus:outline-none"
        />
      </div>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <CardRow key={c.id} id={c.id} onZoom={() => setZoom(c.id)} />
        ))}
      </ul>
      {cards.length === 0 && (
        <p className="py-10 text-center text-slate-400">{t('cards.empty')}</p>
      )}

      {zoom !== null && <CardZoom id={zoom} onClose={() => setZoom(null)} />}
    </div>
  )
}

function CardRow({ id, onZoom }: { id: number; onZoom: () => void }) {
  const { locale } = useI18n()
  const c = cardById(id)
  return (
    <li className="group flex flex-col items-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent transition hover:-translate-y-1 hover:border-violet-400/40 hover:shadow-lg hover:shadow-violet-950/30">
      <div className="flex w-full justify-center pt-4">
        <FlipCard
          card={{ id: c.id, orientation: 'upright' }}
          size="sm"
          revealed
          showBadge={false}
          onFlip={onZoom}
        />
      </div>
      <div className="mt-3 w-full border-t border-white/10 px-4 pb-4 pt-3 text-center">
        <span className="block font-serif text-base font-semibold tracking-wide text-gold-soft">
          {String(c.id).padStart(2, '0')}. {cardName(c, locale)}
        </span>
        <span className="mt-0.5 block text-xs text-slate-500">
          {cardName(c, locale === 'vi' ? 'en' : 'vi')} · {suitLabel(c.suit, locale)}
        </span>
      </div>
    </li>
  )
}

function CardZoom({ id, onClose }: { id: number; onClose: () => void }) {
  const { t, locale } = useI18n()
  const c = cardById(id)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  return (
    <div
      className="modal-overlay fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={cardName(c, locale)}
    >
      <div className="modal-zoom relative m-auto" onClick={(e) => e.stopPropagation()}>
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6">
          <div className="text-center">
            <p className="font-serif text-lg font-semibold tracking-wide text-gold-soft">
              {String(c.id).padStart(2, '0')}. {cardName(c, locale)}
            </p>
            <p className="mt-1 text-sm text-slate-300">{cardName(c, locale === 'vi' ? 'en' : 'vi')} · {suitLabel(c.suit, locale)}</p>
          </div>
          <div className="mt-6 flex flex-col items-center justify-center gap-6 xl:flex-row xl:items-center xl:gap-10">
            <div className="max-w-xs text-center xl:text-right">
              <p className="text-xs font-semibold uppercase tracking-wider text-gold-soft">{t('cards.upright')}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{cardKeywordsUpright(c, locale)}</p>
            </div>
            <FlipCard card={{ id: c.id, orientation: 'upright' }} size="xl" revealed showBadge={false} objectFit="contain" />
            <div className="max-w-xs text-center xl:text-left">
              <p className="text-xs font-semibold uppercase tracking-wider text-gold-soft">{t('cards.reversed')}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{cardKeywordsReversed(c, locale)}</p>
            </div>
          </div>
        </div>
        <button
          type="button"
          aria-label={t('cards.close')}
          onClick={onClose}
          className="absolute -top-3 -right-3 grid h-8 w-8 place-items-center rounded-full bg-white/10 text-lg text-slate-200 transition hover:bg-white/20"
        >
          ×
        </button>
      </div>
    </div>
  )
}
