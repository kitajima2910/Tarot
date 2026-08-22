import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CardFan } from '../components/CardFan'
import { CountdownDialog } from '../components/CountdownDialog'
import { FlipCard } from '../components/FlipCard'
import { TopicGrid } from '../components/TopicGrid'
import { chosenCards, useDrawFlow } from '../hooks/useDrawFlow'
import type { Topic } from '../data/topics'
import { saveSession } from '../lib/session'

export function TopicPage() {
  const navigate = useNavigate()
  const flow = useDrawFlow()
  const [topic, setTopic] = useState<Topic | null>(null)
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
    saveSession({ type: 'topic', topicId: topic?.id, cards: selected })
    navigate('/tarot-result')
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-center text-3xl font-bold text-white">Tra cứu Tarot theo chủ đề</h1>

      {flow.phase === 'setup' && (
        <>
          <p className="mx-auto mt-2 max-w-xl text-center text-sm text-slate-400">
            Bước 1 — chọn chủ đề bạn muốn hỏi.
          </p>
          <div className="mt-8">
            <TopicGrid onPick={(t) => { setTopic(t); flow.start() }} />
          </div>
        </>
      )}

      {(flow.phase === 'table' || flow.phase === 'countdown' || flow.phase === 'reveal') && (
        <>
          <p className="mt-2 text-center text-sm text-slate-400">
            Chủ đề: <span className="font-semibold text-violet-300">{topic?.name}</span>
            {' — '}Bước 2: chọn đúng 3 lá bài ({flow.selectedIds.length}/3).
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
