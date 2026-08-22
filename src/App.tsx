import { Component, type ReactNode, useEffect } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { CursorGlow } from './components/CursorGlow'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { StarField } from './components/StarField'
import { useI18n } from './i18n/useI18n'
import { AboutPage } from './pages/AboutPage'
import { AllCardsPage } from './pages/AllCardsPage'
import { ContactPage } from './pages/ContactPage'
import { HomePage } from './pages/HomePage'
import { QuestionPage } from './pages/QuestionPage'
import { QuestionResultPage } from './pages/QuestionResultPage'
import { TopicPage } from './pages/TopicPage'
import { TopicResultPage } from './pages/TopicResultPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  render() {
    if (this.state.hasError) {
      return <ErrorFallback />
    }
    return this.props.children
  }
}

function ErrorFallback() {
  const { t } = useI18n()
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="text-2xl font-bold text-white">{t('error.title')}</h1>
      <p className="mt-3 text-slate-400">
        {t('error.body')}
      </p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-8 py-3 font-semibold text-white transition hover:brightness-110"
      >
        {t('error.home')}
      </Link>
    </div>
  )
}

export default function App() {
  return (
    <div className="isolate flex min-h-screen flex-col bg-[#0b0b14] text-slate-200">
      <ScrollToTop />
      <CursorGlow />
      <div aria-hidden className="nebula-sky pointer-events-none fixed inset-0 -z-10">
        <StarField />
      </div>
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tarot-reading" element={<TopicPage />} />
          <Route path="/question-reading" element={<QuestionPage />} />
          <Route
            path="/tarot-result"
            element={
              <ErrorBoundary>
                <TopicResultPage />
              </ErrorBoundary>
            }
          />
          <Route
            path="/question-result"
            element={
              <ErrorBoundary>
                <QuestionResultPage />
              </ErrorBoundary>
            }
          />
          <Route path="/card-meanings" element={<AllCardsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
