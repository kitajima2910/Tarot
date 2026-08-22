import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/useI18n'

export function Footer() {
  const { t } = useI18n()
  return (
    <footer className="mt-20 border-t border-white/10 bg-black/40 py-10 text-sm text-slate-400">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-3">
        <div>
          <p className="mb-2 flex items-center gap-2 font-semibold text-white">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white">
              ✦
            </span>
            {t('brand')}
          </p>
          <p className="leading-relaxed">
            {t('footer.desc')}
          </p>
        </div>
        <div>
          <p className="mb-2 font-semibold text-white">{t('footer.explore')}</p>
          <ul className="space-y-1">
            <li><Link className="hover:text-violet-300" to="/tarot-reading">{t('nav.topic')}</Link></li>
            <li><Link className="hover:text-violet-300" to="/question-reading">{t('nav.question')}</Link></li>
            <li><Link className="hover:text-violet-300" to="/card-meanings">{t('nav.cards')}</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-2 font-semibold text-white">{t('footer.info')}</p>
          <ul className="space-y-1">
            <li><Link className="hover:text-violet-300" to="/about">{t('nav.about')}</Link></li>
            <li><Link className="hover:text-violet-300" to="/contact">{t('nav.contact')}</Link></li>
          </ul>
        </div>
      </div>
      <p className="mt-8 text-center text-xs text-slate-500">
        {t('footer.disclaimer')}
      </p>
    </footer>
  )
}
