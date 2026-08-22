import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FlipCard } from '../components/FlipCard'
import { buildQuestionReading } from '../lib/reading'
import { clearSession, loadSession } from '../lib/session'
import { useI18n } from '../i18n/useI18n'

export function QuestionResultPage() {
  const navigate = useNavigate()
  const { t, locale } = useI18n()
  const reading = useMemo(() => {
    const session = loadSession()
    if (!session || session.type !== 'question' || !session.question) return null
    return {
      question: session.question,
      result: buildQuestionReading(session.question, session.cards, locale),
    }
  }, [locale])

  if (!reading) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-white">{t('result.emptyTitle')}</h1>
        <p className="mt-3 text-slate-400">
          {t('result.emptyQuestionBody')}
        </p>
        <Link
          to="/question-reading"
          className="mt-6 inline-block rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-8 py-3 font-semibold text-white transition hover:brightness-110"
        >
          {t('result.askNow')}
        </Link>
      </div>
    )
  }

  const startOver = () => {
    clearSession()
    navigate('/question-reading')
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <p className="text-center text-sm uppercase tracking-widest text-slate-500">
        {t('result.questionKicker')}
      </p>
      <h1 className="mt-2 text-balance text-center text-2xl font-bold italic leading-relaxed text-violet-200">
        "{reading.question}"
      </h1>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {reading.result.cards.map((c) => (
          <article
            key={c.id}
            className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <h2 className="font-serif text-lg font-semibold tracking-wide text-gold-soft">
              {c.nameEn}{' '}
              <span className={`ml-1 rounded-full px-2 py-0.5 font-sans text-xs font-normal ${
                c.orientation === 'reversed' ? 'bg-fuchsia-500/20 text-fuchsia-300' : 'bg-emerald-500/20 text-emerald-300'
              }`}>
                {c.orientation === 'reversed' ? t('result.orientationReversed') : t('result.orientationUpright')}
              </span>
            </h2>
            {locale === 'vi' && <p className="-mt-2 text-xs text-slate-400">{c.name}</p>}
            <FlipCard card={{ id: c.id, orientation: c.orientation }} revealed size="lg" />
            <p className="text-xs uppercase tracking-widest text-slate-500">{c.position}</p>
            <p className="text-sm leading-relaxed text-slate-300">{c.meaning}</p>
            <p className="text-sm italic leading-relaxed text-violet-300">{c.advice}</p>
          </article>
        ))}
      </div>

      <section className="mt-10 rounded-2xl border border-violet-400/30 bg-gradient-to-b from-violet-950/40 to-transparent p-6">
        <h2 className="font-bold text-white">{t('result.summary')}</h2>
        <p className="mt-2 leading-relaxed text-slate-300">{reading.result.summary}</p>
      </section>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button
          type="button"
          onClick={startOver}
          className="rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-8 py-3 font-semibold text-white transition hover:brightness-110"
        >
          {t('result.askOther')}
        </button>
        <Link
          to="/tarot-reading"
          className="rounded-xl border border-violet-400/40 px-8 py-3 font-semibold text-violet-200 transition hover:bg-white/5"
        >
          {t('result.drawByTopic')}
        </Link>
      </div>
    </div>
  )
}
