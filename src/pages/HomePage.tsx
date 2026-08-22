import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FlipCard } from '../components/FlipCard'
import { TOPICS } from '../data/topics'
import { drawDeck } from '../lib/tarot'
import { useI18n } from '../i18n/useI18n'
import { topicName, topicTagline } from '../i18n/localize'

const TILTS = ['-rotate-[24deg] translate-y-4', '-rotate-2 -translate-y-6 z-10', 'rotate-[24deg] translate-y-4']

function Ornament({ text }: { text: string }) {
  return (
    <div className="mb-3 flex items-center justify-center gap-4 text-gold-soft/80">
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold-soft/40 sm:w-16" />
      <span className="text-xs tracking-[0.35em] uppercase">{text}</span>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold-soft/40 sm:w-16" />
    </div>
  )
}

export function HomePage() {
  const { t, locale } = useI18n()
  const heroCards = useMemo(() => drawDeck(3), [])
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold-soft/80">
            {t('home.eyebrow')}
          </p>
          <h1 className="mt-4 text-balance bg-gradient-to-r from-indigo-200 via-violet-200 to-fuchsia-200 bg-clip-text font-serif text-4xl font-bold leading-tight tracking-wide text-transparent sm:text-5xl">
            {t('home.title')}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-serif text-lg text-slate-300 sm:text-xl">
            {t('home.subtitle')}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/tarot-reading"
              className="rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 px-8 py-3 font-semibold text-white shadow-lg shadow-indigo-950/40 ring-1 ring-white/10 transition hover:brightness-110"
            >
              {t('home.ctaTopic')}
            </Link>
            <Link
              to="/question-reading"
              className="rounded-full border border-violet-400/40 px-8 py-3 font-semibold text-violet-200 transition hover:bg-white/5"
            >
              {t('home.ctaQuestion')}
            </Link>
          </div>
          <div className="relative mt-16">
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 -z-10 h-64 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-3xl"
            />
            <div className="flex items-center justify-center gap-4 sm:gap-8">
              {heroCards.map((c, i) => (
                <div key={c.id} className={`transition-transform duration-300 hover:-translate-y-3 ${TILTS[i]}`}>
                  <FlipCard card={c} revealed size="lg" showBadge={false} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-20">
        <Ornament text={t('home.ornamentTopics')} />
        <h2 className="text-center font-serif text-3xl font-bold text-white">{t('home.topicsTitle')}</h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm text-slate-400">
          {t('home.topicsSub')}
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TOPICS.map((topic) => (
            <Link
              key={topic.id}
              to="/tarot-reading"
              state={{ topicId: topic.id }}
              className="group rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6 transition hover:-translate-y-1 hover:border-violet-400/50 hover:bg-white/10 hover:shadow-lg hover:shadow-violet-950/30"
            >
              <p className="flex items-center gap-2 font-serif text-xl font-semibold text-white">
                <span className="text-gold-soft/70 transition group-hover:text-gold-soft">✦</span>
                {topicName(topic, locale)}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{topicTagline(topic, locale)}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-gradient-to-b from-white/5 to-transparent py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <Ornament text={t('home.ornamentCards')} />
          <h2 className="font-serif text-3xl font-bold text-white">{t('home.cardsTitle')}</h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-slate-300">
            {t('home.cardsBody')}
          </p>
          <Link
            to="/card-meanings"
            className="mt-8 inline-block rounded-full border border-gold-soft/40 px-7 py-3 font-semibold text-gold-soft transition hover:bg-gold-soft/10"
          >
            {t('home.ctaCards')}
          </Link>
        </div>
      </section>
    </div>
  )
}

