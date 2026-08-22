import { Ornament } from '../components/Ornament'
import { useI18n } from '../i18n/useI18n'

export function AboutPage() {
  const { t } = useI18n()
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <div className="text-center">
        <Ornament text="Mystic" />
        <h1 className="font-serif text-3xl font-bold tracking-wide text-gold-soft sm:text-4xl">
          {t('about.title')}
        </h1>
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6 leading-relaxed text-slate-300">
        <div className="mb-4 flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-lg text-white">
            ✦
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-violet-400/40 to-transparent" />
        </div>
        <p className="text-base">{t('about.intro')}</p>
      </div>

      <section className="mt-10">
        <h2 className="flex items-center gap-3 text-xl font-semibold text-white">
          <span className="h-px w-8 bg-gradient-to-r from-gold-soft/60 to-transparent" />
          {t('about.whatTitle')}
        </h2>
        <p className="mt-3 leading-relaxed text-slate-300">{t('about.whatBody')}</p>
      </section>

      <section className="mt-10">
        <h2 className="flex items-center gap-3 text-xl font-semibold text-white">
          <span className="h-px w-8 bg-gradient-to-r from-gold-soft/60 to-transparent" />
          {t('about.howTitle')}
        </h2>
        <ol className="mt-4 space-y-3">
          {[1, 2, 3, 4].map((n) => (
            <li key={n} className="flex items-start gap-3">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-violet-500/15 text-xs font-semibold text-violet-300 ring-1 ring-violet-400/30">
                {n}
              </span>
              <span className="leading-relaxed text-slate-300">{t(`about.step${n}`)}</span>
            </li>
          ))}
        </ol>
      </section>

      <p className="mt-10 rounded-2xl border border-gold-soft/25 bg-gold-soft/5 p-5 text-sm leading-relaxed text-slate-300">
        ✦ {t('about.note')}
      </p>
    </article>
  )
}
