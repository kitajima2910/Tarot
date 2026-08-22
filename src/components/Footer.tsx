import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-black/40 py-10 text-sm text-slate-400">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-3">
        <div>
          <p className="mb-2 flex items-center gap-2 font-semibold text-white">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white">
              ✦
            </span>
            Tarot Huyền Bí
          </p>
          <p className="leading-relaxed">
            Bản clone demo phục vụ học tập. Nội dung luận giải là placeholder tự viết,
            không sao chép từ site gốc.
          </p>
        </div>
        <div>
          <p className="mb-2 font-semibold text-white">Khám phá</p>
          <ul className="space-y-1">
            <li><Link className="hover:text-violet-300" to="/tarot-reading">Tra cứu theo chủ đề</Link></li>
            <li><Link className="hover:text-violet-300" to="/question-reading">Tra cứu theo câu hỏi</Link></li>
            <li><Link className="hover:text-violet-300" to="/card-meanings">Ý nghĩa 78 lá bài</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-2 font-semibold text-white">Thông tin</p>
          <ul className="space-y-1">
            <li><Link className="hover:text-violet-300" to="/about">Giới thiệu</Link></li>
            <li><Link className="hover:text-violet-300" to="/contact">Liên hệ</Link></li>
          </ul>
        </div>
      </div>
      <p className="mt-8 text-center text-xs text-slate-500">
        Tarot mang tính tham khảo và giải trí — quyết định cuối cùng vẫn thuộc về bạn.
      </p>
    </footer>
  )
}
