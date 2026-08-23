import { cardById } from '../data/cards'
import { cardImage } from '../data/cardImages'
import type { DrawnCard } from '../lib/tarot'
import { useI18n } from '../i18n/useI18n'
import { cardName } from '../i18n/localize'

const SIZE = {
  xs: 'w-11 h-[72px] text-[7px]',
  sm: 'w-24 h-40 text-[10px]',
  md: 'w-32 h-52 text-xs',
  lg: 'w-48 h-80 text-sm',
  xl: 'w-[500px] h-[836px] text-base',
} as const

interface FlipCardProps {
  card: DrawnCard
  onFlip?: () => void
  size?: keyof typeof SIZE
  revealed?: boolean
  showBadge?: boolean
  objectFit?: 'cover' | 'contain'
}

export function FlipCard({ card, onFlip, size = 'md', revealed = false, showBadge = true, objectFit = 'cover' }: FlipCardProps) {
  const { locale } = useI18n()
  const info = cardById(card.id)
  const image = cardImage(card.id)
  const reversed = card.orientation === 'reversed'
  const name = cardName(info, locale)
  return (
    <div
      className={`flip-perspective ${SIZE[size]} shrink-0 cursor-pointer`
      }
      onClick={onFlip}
    >
      <div className={`flip-inner relative h-full w-full ${revealed ? 'is-flipped' : ''}`}>
        <div className="flip-face card-back absolute inset-0 rounded-xl border border-indigo-400/30 shadow-lg shadow-indigo-950/50" />
        <div
          className="flip-face flip-front absolute inset-0 overflow-hidden rounded-xl border border-indigo-400/40 bg-gradient-to-br from-indigo-950 via-[#171731] to-violet-950 text-center text-slate-100 shadow-lg shadow-indigo-950/60"
        >
          <div className="relative h-full w-full">
            {image && (
              <div className={`absolute inset-0 ${reversed ? 'rotate-180' : ''}`}>
                <img
                  src={image}
                  alt={name}
                  loading="lazy"
                  className={`absolute inset-0 h-full w-full ${
                    objectFit === 'contain' ? 'object-contain' : 'object-cover'
                  }`}
                />
              </div>
            )}
            {image && showBadge && (
              <span className="name-badge absolute inset-x-0 top-0 z-10 px-2 py-1 text-[10px] font-medium tracking-wide text-slate-100">
                {name}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
