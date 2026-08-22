import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ActionButton } from '../components/ActionButton'
import { CardFan } from '../components/CardFan'
import { CountdownDialog } from '../components/CountdownDialog'
import { FlipCard } from '../components/FlipCard'
import { Ornament } from '../components/Ornament'
import { QuestionInput } from '../components/QuestionInput'
import { chosenCards, useDrawFlow } from '../hooks/useDrawFlow'
import { saveSession } from '../lib/session'
import { useI18n } from '../i18n/useI18n'

export function QuestionPage() {
  const navigate = useNavigate()
  const flow = useDrawFlow()
  const { t } = useI18n()
  const [question, setQuestion] = useState('')
  const [revealedCount, setRevealedCount] = useState(0)
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

  const viewResult = () => {
    saveSession({ type: 'question', question: question.trim(), cards: selected })
    navigate('/question-result')
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Ornament text="Tarot" />
      <h1 className="text-center font-serif text-3xl font-bold tracking-wide text-gold-soft sm:text-4xl">
        {t('question.title')}
      </h1>

      {flow.phase === 'setup' && (
        <>
          <div className="mx-auto mt-4 max-w-xl text-center">
            <p className="text-sm text-slate-400">{t('question.step1')}</p>
            <div className="mx-auto mt-3 h-px w-24 bg-gradient-to-r from-transparent to-violet-400/40" />
          </div>
          <div className="mt-10">
            <QuestionInput onSubmit={(q) => { setQuestion(q); flow.start() }} />
          </div>
        </>
      )}

      {(flow.phase === 'table' || flow.phase === 'countdown' || flow.phase === 'reveal') && (
        <div className="mt-6">
          <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
            <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1">
              {t('question.questionLabel')} <span className="italic text-violet-300">"{question}"</span>
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              {t('question.step2')} <span className="font-semibold text-gold-soft">{flow.selectedIds.length}/3</span>
            </span>
          </div>
          <div className="relative mt-4 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4">
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-56 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/15 blur-3xl"
            />
            <CardFan
              deck={flow.deck}
              selectedIds={flow.selectedIds}
              hiddenIds={hiddenIds}
              interactive={flow.phase === 'table'}
              onSelect={flow.toggle}
            />
          </div>
        </div>
      )}

      {flow.phase === 'table' && (
        <div className="mt-6 text-center">
          <ActionButton disabled={flow.selectedIds.length < 3} onClick={flow.beginCountdown}>
            {t('question.confirm')}
          </ActionButton>
        </div>
      )}

      {flow.phase === 'reveal' && (
        <div className="mt-8 flex flex-wrap items-start justify-center gap-6 py-4">
          {selected.map((c, i) => (
            <figure key={c.id} className="text-center">
              <FlipCard card={c} revealed={i < revealedCount} size="lg" />
              <figcaption className="mt-3 text-xs uppercase tracking-widest text-gold-soft/70">
                ✦ {t('question.card', { n: i + 1 })} ✦
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      {flow.phase === 'reveal' && revealedCount >= 3 && (
        <div className="mt-8 text-center">
          <ActionButton onClick={viewResult}>
            {t('question.viewResult')}
          </ActionButton>
        </div>
      )}

      {flow.phase === 'countdown' && <CountdownDialog onDone={flow.finishCountdown} />}
    </div>
  )
}
