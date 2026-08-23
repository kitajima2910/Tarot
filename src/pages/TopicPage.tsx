import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ActionButton } from '../components/ActionButton'
import { CardFan } from '../components/CardFan'
import { CountdownDialog } from '../components/CountdownDialog'
import { FlipCard } from '../components/FlipCard'
import { Ornament } from '../components/Ornament'
import { TopicGrid } from '../components/TopicGrid'
import { chosenCards, useDrawFlow } from '../hooks/useDrawFlow'
import type { Topic } from '../data/topics'
import { saveSession } from '../lib/session'
import { useI18n } from '../i18n/useI18n'
import { topicName } from '../i18n/localize'

export function TopicPage() {
  const navigate = useNavigate()
  const flow = useDrawFlow()
  const { t, locale } = useI18n()
  const [topic, setTopic] = useState<Topic | null>(null)
  const [revealedCount, setRevealedCount] = useState(0)
  const [shuffled, setShuffled] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false)
  const selected = chosenCards(flow.deck, flow.selectedIds)
  const hiddenIds = new Set(
    flow.phase === 'reveal' ? flow.deck.filter((c) => !flow.selectedIds.includes(c.id)).map((c) => c.id) : [],
  )

  useEffect(() => {
    if (flow.phase !== 'reveal') return
    if (revealedCount >= 3) return
    const timer = setTimeout(() => setRevealedCount((n) => n + 1), revealedCount === 0 ? 600 : 400)
    return () => clearTimeout(timer)
  }, [flow.phase, revealedCount])

  const doShuffle = () => {
    if (isShuffling || shuffled) return
    setIsShuffling(true)
    setTimeout(() => { setIsShuffling(false); setShuffled(true) }, 1500)
  }

  const viewResult = () => {
    saveSession({ type: 'topic', topicId: topic?.id, cards: selected })
    navigate('/tarot-result')
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Ornament text="Tarot" />
      <h1 className="text-center font-serif text-3xl font-bold tracking-wide text-gold-soft sm:text-4xl">
        {t('topic.title')}
      </h1>

      {flow.phase === 'setup' && (
        <>
          <div className="mx-auto mt-4 max-w-xl text-center">
            <p className="text-sm text-slate-400">{t('topic.step1')}</p>
            <div className="mx-auto mt-3 h-px w-24 bg-gradient-to-r from-transparent to-violet-400/40" />
          </div>
          <div className="mt-10">
            <TopicGrid onPick={(t) => { setTopic(t); setShuffled(false); setIsShuffling(false); flow.start() }} />
          </div>
        </>
      )}

      {flow.phase === 'table' && !shuffled && (
        <div className="mt-10 flex flex-col items-center gap-6">
          <div className={`shuffle-stack relative h-40 w-24 ${isShuffling ? 'shuffle-active' : ''}`}>
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="shuffle-card card-back border border-indigo-400/30"
                style={isShuffling ? undefined : {
                  transform: `translateX(${(i - 2) * 3}px) rotate(${(i - 2) * 2}deg) translateY(${Math.abs(i - 2) * 2}px)`,
                }}
              />
            ))}
          </div>
          <ActionButton onClick={doShuffle} disabled={isShuffling}>
            {t('topic.shuffleBtn')}
          </ActionButton>
          <p className="text-xs text-slate-500">{t('topic.shuffleHint')}</p>
        </div>
      )}

      {(flow.phase === 'table' && shuffled) && (
        <div className="mt-6">
          <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
            <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1">
              {t('topic.topicLabel')} <span className="font-semibold text-violet-300">{topicName(topic, locale)}</span>
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              {t('topic.step2')} <span className="font-semibold text-gold-soft">{flow.selectedIds.length}/3</span>
            </span>
          </div>
          <div className="relative mt-4 rounded-3xl border border-white/10 bg-white/5 p-4">
            <CardFan
              deck={flow.deck}
              selectedIds={flow.selectedIds}
              hiddenIds={hiddenIds}
              interactive={flow.phase === 'table'}
              onSelect={flow.toggle}
              layout="circular"
            />
          </div>
        </div>
      )}

      {flow.phase === 'table' && shuffled && (
        <div className="mt-6 text-center">
          <ActionButton disabled={flow.selectedIds.length < 3} onClick={flow.beginCountdown}>
            {t('topic.confirm')}
          </ActionButton>
        </div>
      )}

      {flow.phase === 'reveal' && (
        <div className="mt-8 flex flex-wrap items-start justify-center gap-6 py-4">
          {selected.map((c, i) => (
            <figure key={c.id} className="text-center">
              <FlipCard card={c} revealed={i < revealedCount} size="lg" />
              <figcaption className="mt-3 text-xs uppercase tracking-widest text-gold-soft/70">
                ✦ {t('topic.card', { n: i + 1 })} ✦
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      {flow.phase === 'reveal' && revealedCount >= 3 && (
        <div className="mt-8 text-center">
          <ActionButton onClick={viewResult}>
            {t('topic.viewResult')}
          </ActionButton>
        </div>
      )}

      {flow.phase === 'countdown' && <CountdownDialog onDone={flow.finishCountdown} />}
    </div>
  )
}
