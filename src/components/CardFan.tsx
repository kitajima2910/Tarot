import { useRef } from 'react'
import type { DrawnCard } from '../lib/tarot'
import { useI18n } from '../i18n/useI18n'
import { FlipCard } from './FlipCard'

interface CardFanProps {
  deck: DrawnCard[]
  selectedIds: number[]
  hiddenIds: Set<number>
  interactive: boolean
  onSelect: (id: number) => void
  layout?: 'linear' | 'circular'
}

/* ── Circular constants ─────────────────────────────────────────── */
const C_RADIUS = 400
const C_CARD_W = 72
const C_CARD_H = 116
const C_CONTAINER = 1000

/* ── Linear (original) ──────────────────────────────────────────── */
function LinearFan({ deck, selectedIds, hiddenIds, interactive, onSelect }: Omit<CardFanProps, 'layout'>) {
  const { t } = useI18n()
  const scroller = useRef<HTMLDivElement>(null)
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: 0 })

  const onPointerDown = (e: React.PointerEvent) => {
    if (!scroller.current || !e.isPrimary) return
    drag.current = { active: true, startX: e.clientX, startLeft: scroller.current.scrollLeft, moved: 0 }
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.active || !scroller.current) return
    const dx = e.clientX - drag.current.startX
    drag.current.moved = Math.max(drag.current.moved, Math.abs(dx))
    scroller.current.scrollLeft = drag.current.startLeft - dx
  }
  const endDrag = () => { drag.current.active = false }
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved > 6) { e.preventDefault(); e.stopPropagation() }
  }

  const mid = (deck.length - 1) / 2

  return (
    <div
      ref={scroller}
      className="cursor-grab overflow-x-auto pb-4 active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      onClickCapture={onClickCapture}
    >
      <div className="flex w-max items-end gap-1 px-6 py-6">
        {deck.map((c, i) => {
          const offset = i - mid
          const picked = selectedIds.includes(c.id)
          return (
            <button
              key={c.id}
              type="button"
              disabled={!interactive || hiddenIds.has(c.id)}
              aria-pressed={picked}
              aria-label={t('fan.card', { n: i + 1 })}
              onClick={() => onSelect(c.id)}
              className={`transition-all duration-500 ${
                hiddenIds.has(c.id) ? 'fly-out pointer-events-none' : picked ? '-translate-y-4' : 'hover:-translate-y-3'
              }`}
            >
              <span
                className="block"
                style={{ transform: `rotate(${offset * 2}deg) translateY(${Math.abs(offset) * 3}px)` }}
              >
                <FlipCard card={c} revealed={false} size="sm" />
                <span
                  className={`mt-1 block rounded-full px-2 py-0.5 text-center text-[10px] transition ${
                    picked
                      ? 'bg-violet-500 text-white'
                      : selectedIds.length < 3 && interactive
                        ? 'bg-white/5 text-slate-400'
                        : 'bg-white/5 text-slate-600'
                  }`}
                >
                  {picked ? t('fan.chosen') : interactive ? t('fan.select') : ''}
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ── Circular fan ───────────────────────────────────────────────── */
function CircularFan({ deck, selectedIds, hiddenIds, interactive, onSelect }: Omit<CardFanProps, 'layout'>) {
  const { t } = useI18n()
  const cx = C_CONTAINER / 2
  const cy = C_CONTAINER / 2

  return (
    <div
      className="relative mx-auto"
      style={{ width: C_CONTAINER, height: C_CONTAINER }}
    >
      {/* centre glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/15 blur-3xl"
      />

      {deck.map((c, i) => {
        const angleDeg = (i / deck.length) * 360 - 90
        const angleRad = (angleDeg * Math.PI) / 180
        const picked = selectedIds.includes(c.id)
        const r = picked ? C_RADIUS + 18 : C_RADIUS
        const x = cx + r * Math.cos(angleRad) - C_CARD_W / 2
        const y = cy + r * Math.sin(angleRad) - C_CARD_H / 2
        const rotation = angleDeg + 90
        const isHidden = hiddenIds.has(c.id)
        /* z-index: cards at bottom of circle sit in front */
        const baseZ = Math.round(((angleDeg + 90) / 360) * 50) + 10

        return (
          <button
            key={c.id}
            type="button"
            disabled={!interactive || isHidden}
            aria-pressed={picked}
            aria-label={t('fan.card', { n: i + 1 })}
            onClick={() => onSelect(c.id)}
            className={`absolute rounded-xl transition-[transform,opacity,box-shadow] duration-300 ${
              isHidden
                ? 'pointer-events-none opacity-0 scale-50'
                : picked
                  ? 'z-30 ring-2 ring-violet-400 shadow-lg shadow-violet-500/30'
                  : interactive
                    ? 'hover:z-40 hover:shadow-md hover:shadow-violet-400/20'
                    : ''
            }`}
            style={{
              left: x,
              top: y,
              width: C_CARD_W,
              height: C_CARD_H,
              transform: `rotate(${rotation}deg) scale(${picked ? 1.12 : 1})`,
              zIndex: picked ? 60 : baseZ,
            }}
          >
            <FlipCard card={c} revealed={false} size="fan" showBadge={false} />
          </button>
        )
      })}
    </div>
  )
}

/* ── Export ─────────────────────────────────────────────────────── */
export function CardFan({ layout = 'linear', ...props }: CardFanProps) {
  if (layout === 'circular') return <CircularFan {...props} />
  return <LinearFan {...props} />
}
