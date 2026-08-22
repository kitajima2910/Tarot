import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { translate, type Locale, type TFunction } from './messages'
import { I18nContext } from './useI18n'

const STORAGE_KEY = 'tarot-clone-locale'
const METADATA: Record<Locale, { title: string; description: string }> = {
  vi: {
    title: 'Tarot Huyền Bí — Bói Tarot Online',
    description: 'Bói tarot online miễn phí: rút 3 lá bài theo chủ đề hoặc theo câu hỏi của bạn, luận giải ngay trên trình duyệt.',
  },
  en: {
    title: 'Mystic Tarot — Free Online Tarot',
    description: 'Free online tarot reading: draw 3 cards by topic or by question, get a reading right in your browser.',
  },
}

function readInitialLocale(): Locale {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === 'vi' || raw === 'en') return raw
  } catch {
    /* ignore */
  }
  return 'vi'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readInitialLocale)

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = METADATA[locale].title
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', METADATA[locale].description)
  }, [locale])

  const t = useMemo<TFunction>(() => (key, params) => translate(locale, key, params), [locale])

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
