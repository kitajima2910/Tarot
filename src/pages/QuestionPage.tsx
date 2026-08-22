import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CardFan } from '../components/CardFan'
import { CountdownDialog } from '../components/CountdownDialog'
import { FlipCard } from '../components/FlipCard'
import { QuestionInput } from '../components/QuestionInput'
import { chosenCards, useDrawFlow } from '../hooks/useDrawFlow'
import { saveSession } from '../lib/session'

export function QuestionPage() {
  const navigate = useNavigate()
  const flow = useDrawFlow()
  const [question, setQuestion] = useState('')
  const [revealedCount, setRevealedCount] = useState(0)
  const selected = chosenCards(flow.deck, flow.selectedIds)
  const hiddenIds = new Set(
    flow.phase === 'reveal' ? flow.deck.filter((c) => !flow.selectedIds.includes(c.id)).map((c) => c.id) : [],
  )

  useEffect(() => {
    if (flow.phase !== 'reveal') return
    if (revealedCount >= 3) return
    const t = setTimeout(() => setRevealedCount((n) => n + 1), revealedCount === 0 ? 600 : 400)
    return () => clearTimeout(t)
  }, [flow.phase, revealedCount])

  const viewResult = () => {
    saveSession({ type: 'question', question: question.trim(), cards: selected })
    navigate('/question-result')
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-center text-3xl font-bold text-white">Trải bài theo câu hỏi</h1>

      {flow.phase === 'setup' && (
        <>
          <p className="mx-auto mt-2 max-w-xl text-center text-sm text-slate-400">
            Gửi một câu hỏi rõ ràng (20–200 ký tự), hệ thống sẽ kiểm tra rồi mở bàn bài cho bạn rút 3 lá.
          </p>
          <div className="mt-8">
            <QuestionInput onSubmit={(q) => { setQuestion(q); flow.start() }} />
          </div>
        </>
      )}

      {(flow.phase === 'table' || flow.phase === 'countdown' || flow.phase === 'reveal') && (
        <>
          <p className="mt-2 text-center text-sm text-slate-400">
            Câu hỏi: <span className="italic text-violet-300">"{question}"</span>
          </p>
          <CardFan
            deck={flow.deck}
            selectedIds={flow.selectedIds}
            hiddenIds={hiddenIds}
            interactive={flow.phase === 'table'}
            onSelect={flow.toggle}
          />
        </>
      )}

      {flow.phase === 'table' && (
        <div className="text-center">
          <button
            type="button"
            disabled={flow.selectedIds.length < 3}
            onClick={flow.beginCountdown}
            className="rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-10 py-3 font-semibold text-white shadow-lg shadow-indigo-950/40 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Xác nhận 3 lá
          </button>
        </div>
      )}

      {flow.phase === 'reveal' && (
        <div className="flex flex-wrap items-start justify-center gap-6 py-8">
          {selected.map((c, i) => (
            <figure key={c.id} className="text-center">
              <FlipCard card={c} revealed={i < revealedCount} size="lg" />
              <figcaption className="mt-2 text-xs uppercase tracking-widest text-slate-500">
                Lá {i + 1}
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      {flow.phase === 'reveal' && revealedCount >= 3 && (
        <div className="text-center">
          <button
            type="button"
            onClick={viewResult}
            className="rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-10 py-3 font-semibold text-white shadow-lg shadow-indigo-950/40 transition hover:brightness-110"
          >
            Xem kết quả luận giải
          </button>
        </div>
      )}

      {flow.phase === 'countdown' && <CountdownDialog onDone={flow.finishCountdown} />}
    </div>
  )
}
