import { useState } from 'react'
import { useI18n } from '../i18n/useI18n'

export function ContactPage() {
  const { t } = useI18n()
  const [sent, setSent] = useState(false)

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">{t('contact.title')}</h1>
      <p className="mt-3 text-slate-300">
        {t('contact.intro')}
      </p>

      {sent ? (
        <p role="status" className="mt-8 rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-emerald-200">
          {t('contact.sent')}
        </p>
      ) : (
        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            setSent(true)
          }}
        >
          <div>
            <label htmlFor="name" className="mb-1 block text-sm text-slate-300">{t('contact.name')}</label>
            <input
              id="name"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-slate-100 focus:border-violet-400 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm text-slate-300">{t('contact.email')}</label>
            <input
              id="email"
              type="email"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-slate-100 focus:border-violet-400 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-1 block text-sm text-slate-300">{t('contact.message')}</label>
            <textarea
              id="message"
              rows={5}
              required
              minLength={10}
              className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-slate-100 focus:border-violet-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-8 py-3 font-semibold text-white transition hover:brightness-110"
          >
            {t('contact.submit')}
          </button>
        </form>
      )}
    </div>
  )
}
