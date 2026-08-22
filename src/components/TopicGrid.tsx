import { TOPICS } from '../data/topics'
import type { Topic } from '../data/topics'
import { useI18n } from '../i18n/useI18n'
import { topicName, topicTagline } from '../i18n/localize'

interface TopicGridProps {
  onPick: (topic: Topic) => void
}

const TOPIC_ICONS = ['♥', '⚒', '✚', '◈']

export function TopicGrid({ onPick }: TopicGridProps) {
  const { locale } = useI18n()
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {TOPICS.map((t, i) => (
        <button
          key={t.id}
          type="button"
          onClick={() => onPick(t)}
          data-topic={t.slug}
          className="group rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6 text-left transition hover:-translate-y-1 hover:border-violet-400/50 hover:shadow-lg hover:shadow-violet-950/40"
        >
          <span className="mb-3 block text-3xl text-violet-300 transition group-hover:scale-110">
            {TOPIC_ICONS[i]}
          </span>
          <span className="block font-semibold text-white">{topicName(t, locale)}</span>
          <span className="mt-1 block text-xs leading-relaxed text-slate-400">{topicTagline(t, locale)}</span>
        </button>
      ))}
    </div>
  )
}
