import { cardById } from '../data/cards'
import { cardImage } from '../data/cardImages'
import type { DrawnCard } from '../lib/tarot'

const SIZE = {
  sm: 'w-24 h-40 text-[10px]',
  md: 'w-32 h-52 text-xs',
  lg: 'w-48 h-80 text-sm',
} as const

interface FlipCardProps {
  card: DrawnCard
  onFlip?: () => void
  size?: keyof typeof SIZE
  revealed?: boolean
  showBadge?: boolean
}

export function FlipCard({ card, onFlip, size = 'md', revealed = false, showBadge = true }: FlipCardProps) {
  const info = cardById(card.id)
  const image = cardImage(card.id)
  const reversed = card.orientation === 'reversed'
  return (
    <div
      className={`flip-perspective ${SIZE[size]} shrink-0 cursor-pointer`
      }
      onClick={onFlip}
    >
      <div className={`flip-inner relative h-full w-full ${revealed ? 'is-flipped' : ''}`}>
        <div className="flip-face card-back absolute inset-0 rounded-xl border border-indigo-400/30 shadow-lg shadow-indigo-950/50">
          <div className="p-4 text-slate-300 text-xs">
            <p className="font-medium text-gold-soft uppercase tracking-wider">{info.nameEn}</p>
            <p className="mt-2 line-clamp-3">{info.keywordsUpright}</p>
          </div>
        </div>
        <div
          className="flip-face flip-front absolute inset-0 overflow-hidden rounded-xl border border-indigo-400/40 bg-gradient-to-br from-indigo-950 via-[#171731] to-violet-950 text-center text-slate-100 shadow-lg shadow-indigo-950/60"
        >
          <div className="relative h-full w-full">
            {image && (
              <div className={`absolute inset-0 ${reversed ? 'rotate-180' : ''}`}>
                <img
                  src={image}
                  alt={info.nameEn}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            )}
            {image && showBadge && (
              <span className="name-badge absolute inset-x-0 top-0 z-10 px-2 py-1 text-[10px] font-medium tracking-wide text-slate-100">
                {info.nameEn}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
