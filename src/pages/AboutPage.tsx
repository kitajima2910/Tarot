import { useI18n } from '../i18n/useI18n'

export function AboutPage() {
  const { t } = useI18n()
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 leading-relaxed text-slate-300">
      <h1 className="text-3xl font-bold text-white">{t('about.title')}</h1>
      <p className="mt-4">
        {t('about.intro')}
      </p>
      <h2 className="mt-8 text-xl font-semibold text-white">{t('about.whatTitle')}</h2>
      <p className="mt-2">
        {t('about.whatBody')}
      </p>
      <h2 className="mt-8 text-xl font-semibold text-white">{t('about.howTitle')}</h2>
      <ol className="mt-2 list-decimal space-y-1 pl-6">
        <li>{t('about.step1')}</li>
        <li>{t('about.step2')}</li>
        <li>{t('about.step3')}</li>
        <li>{t('about.step4')}</li>
      </ol>
      <p className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
        {t('about.note')}
      </p>
    </article>
  )
}
