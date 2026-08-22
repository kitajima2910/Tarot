import { useEffect, useMemo, useState } from 'react'
import { CARDS, SUIT_LABEL, cardById } from '../data/cards'
import type { Suit } from '../data/cards'
import { FlipCard } from '../components/FlipCard'

const FILTERS: Array<{ key: Suit | 'all'; label: string }> = [
  { key: 'all', label: 'Tất cả' },
  { key: 'major', label: 'Ẩn chính' },
  { key: 'wands', label: 'Gậy' },
  { key: 'cups', label: 'Cốc' },
  { key: 'swords', label: 'Kiếm' },
  { key: 'pentacles', label: 'Xu' },
]

export function AllCardsPage() {
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
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-center font-serif text-3xl font-bold tracking-wide text-gold-soft">Ý nghĩa 78 lá bài Tarot</h1>
      <p className="mt-2 text-center text-sm text-slate-400">
        Bấm vào lá để phóng to xem chi tiết.
      </p>

      <div className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={`rounded-full px-4 py-1.5 text-sm transition ${
              filter === f.key ? 'bg-violet-500 text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            {f.label}
          </button>
        ))}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm lá bài..."
          aria-label="Tìm lá bài"
          className="ml-2 w-44 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-violet-400 focus:outline-none"
        />
      </div>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <CardRow key={c.id} id={c.id} onZoom={() => setZoom(c.id)} />
        ))}
      </ul>
      {cards.length === 0 && (
        <p className="py-10 text-center text-slate-400">Không tìm thấy lá bài nào.</p>
      )}

      {zoom !== null && <CardZoom id={zoom} onClose={() => setZoom(null)} />}
    </div>
  )
}

function CardRow({ id, onZoom }: { id: number; onZoom: () => void }) {
  const c = cardById(id)
  return (
    <li className="rounded-xl border border-white/10 bg-white/5 transition hover:border-violet-400/40">
      <FlipCard
        card={{ id: c.id, orientation: 'upright' }}
        size="sm"
        revealed
        showBadge={false}
        onFlip={onZoom}
      />
      <span>
        <span className="block font-serif text-base font-semibold tracking-wide text-gold-soft">
          {String(c.id).padStart(2, '0')}. {c.nameEn}
        </span>
        <span className="block text-xs text-slate-500">
          {c.name} · {SUIT_LABEL[c.suit]}
        </span>
      </span>
    </li>
  )
}

function CardZoom({ id, onClose }: { id: number; onClose: () => void }) {
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
      className="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={c.nameEn}
    >
      <div className="modal-zoom relative" onClick={(e) => e.stopPropagation()}>
        <FlipCard card={{ id: c.id, orientation: 'upright' }} size="md" revealed showBadge={false} />
        <div className="mt-4 text-center">
          <p className="font-serif text-lg font-semibold tracking-wide text-gold-soft">
            {String(c.id).padStart(2, '0')}. {c.nameEn}
          </p>
          <p className="mt-1 text-sm text-slate-300">{c.name} · {SUIT_LABEL[c.suit]}</p>
          <p className="mt-1 text-xs leading-relaxed text-slate-400">
            Xuôi: {c.keywordsUpright}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-slate-400">
            Ngược: {c.keywordsReversed}
          </p>
        </div>
        <button
          type="button"
          aria-label="Đóng"
          onClick={onClose}
          className="absolute -top-3 -right-3 grid h-8 w-8 place-items-center rounded-full bg-white/10 text-lg text-slate-200 transition hover:bg-white/20"
        >
          ×
        </button>
      </div>
    </div>
  )
}
