import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FlipCard } from '../components/FlipCard'
import { TOPICS } from '../data/topics'
import { drawDeck } from '../lib/tarot'

const TILTS = ['-rotate-[24deg] translate-y-4', '-rotate-2 -translate-y-6 z-10', 'rotate-[24deg] translate-y-4']

export function HomePage() {
  const heroCards = useMemo(() => drawDeck(3), [])
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:py-28">
          <h1 className="text-balance bg-gradient-to-r from-indigo-200 via-violet-200 to-fuchsia-200 bg-clip-text font-serif text-4xl font-bold leading-tight tracking-wide text-transparent sm:text-5xl">
            Lắng Nghe Vũ Trụ — Giải Mã Con Đường Của Bạn
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Chọn một chủ đề hoặc gửi câu hỏi, rút ba lá bài và nhận luận giải ngay trên trình duyệt.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/tarot-reading"
              className="rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-8 py-3 font-semibold text-white shadow-lg shadow-indigo-950/40 transition hover:brightness-110"
            >
              Rút bài theo chủ đề
            </Link>
            <Link
              to="/question-reading"
              className="rounded-xl border border-violet-400/40 px-8 py-3 font-semibold text-violet-200 transition hover:bg-white/5"
            >
              Hỏi theo câu hỏi của bạn
            </Link>
          </div>
          <div className="mt-16 flex items-center justify-center gap-4 sm:gap-8">
            {heroCards.map((c, i) => (
              <div key={c.id} className={`transition-transform duration-300 hover:-translate-y-3 ${TILTS[i]}`}>
                <FlipCard card={c} revealed size="lg" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-center text-2xl font-bold text-white">Tarot có thể làm gì cho bạn?</h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm text-slate-400">
          Bốn mảng cuộc sống thường được hỏi nhất — chọn một chủ đề để bắt đầu.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TOPICS.map((t) => (
            <Link
              key={t.id}
              to="/tarot-reading"
              state={{ topicId: t.id }}
              className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-5 transition hover:border-violet-400/50 hover:bg-white/10"
            >
              <p className="font-semibold text-white">{t.name}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">{t.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/30 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold text-white">78 lá bài, 78 thông điệp</h2>
          <p className="mt-3 leading-relaxed text-slate-300">
            Bộ Rider–Waite gồm 22 lá ẩn chính và 56 lá ẩn phụ chia thành bốn bộ: Gậy, Cốc,
            Kiếm và Xu. Mỗi lá khi xuôi hay ngược đều mang một tầng ý nghĩa riêng.
          </p>
          <Link
            to="/card-meanings"
            className="mt-6 inline-block rounded-xl border border-violet-400/40 px-6 py-2 font-semibold text-violet-200 transition hover:bg-white/5"
          >
            Tra cứu toàn bộ lá bài
          </Link>
        </div>
      </section>
    </div>
  )
}
