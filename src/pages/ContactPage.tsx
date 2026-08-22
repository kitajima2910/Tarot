import { useState } from 'react'
import { Ornament } from '../components/Ornament'
import { useI18n } from '../i18n/useI18n'

const inputCls =
  'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-slate-100 placeholder:text-slate-500 transition focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20'

export function ContactPage() {
  const { t } = useI18n()
  const [sent, setSent] = useState(false)

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="text-center">
        <Ornament text="Mystic" />
        <h1 className="font-serif text-3xl font-bold tracking-wide text-gold-soft sm:text-4xl">
          {t('contact.title')}
        </h1>
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6 text-center text-slate-300">
        <p className="leading-relaxed">{t('contact.intro')}</p>
      </div>

      {sent ? (
        <div role="status" className="mt-8 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-8 text-center text-emerald-200">
          <p className="text-2xl">✦</p>
          <p className="mt-2 leading-relaxed">{t('contact.sent')}</p>
        </div>
      ) : (
        <form
          className="mt-8 space-y-5 rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6 sm:p-8"
          onSubmit={(e) => {
            e.preventDefault()
            setSent(true)
          }}
        >
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-300">{t('contact.name')}</label>
            <input id="name" required placeholder={t('contact.name')} className={inputCls} />
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-300">{t('contact.email')}</label>
            <input id="email" type="email" required placeholder={t('contact.email')} className={inputCls} />
          </div>
          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-300">{t('contact.message')}</label>
            <textarea
              id="message"
              rows={5}
              required
              minLength={10}
              placeholder={t('contact.message')}
              className={`${inputCls} resize-none`}
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 px-8 py-3 font-semibold text-white shadow-lg shadow-indigo-950/40 ring-1 ring-white/10 transition hover:brightness-110"
          >
            {t('contact.submit')}
          </button>
        </form>
      )}
    </div>
  )
}
