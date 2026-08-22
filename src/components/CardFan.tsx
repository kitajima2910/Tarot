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
}

export function CardFan({ deck, selectedIds, hiddenIds, interactive, onSelect }: CardFanProps) {
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
  const endDrag = () => {
    drag.current.active = false
  }
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved > 6) {
      e.preventDefault()
      e.stopPropagation()
    }
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
