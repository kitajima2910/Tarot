export function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 leading-relaxed text-slate-300">
      <h1 className="text-3xl font-bold text-white">Giới thiệu</h1>
      <p className="mt-4">
        Tarot Huyền Bí là bản clone demo được xây dựng nhằm tái hiện trải nghiệm bói tarot
        online: chọn chủ đề hoặc đặt câu hỏi, rút ba lá bài và nhận luận giải ngay trên
        trình duyệt.
      </p>
      <h2 className="mt-8 text-xl font-semibold text-white">Tarot là gì?</h2>
      <p className="mt-2">
        Tarot là bộ 78 lá bài tượng trưng, gồm 22 lá ẩn chính nói về các vòng đời lớn của
        con người và 56 lá ẩn phụ phản chiếu sự vụ thường ngày qua bốn bộ Gậy, Cốc, Kiếm
        và Xu. Việc đọc bài không phải tiên đoán mệnh lệnh, mà là tấm gương giúp người hỏi
        nhìn rõ suy nghĩ và cảm xúc của chính mình.
      </p>
      <h2 className="mt-8 text-xl font-semibold text-white">Cách dùng site</h2>
      <ol className="mt-2 list-decimal space-y-1 pl-6">
        <li>Chọn "Tra cứu theo chủ đề" hoặc "Tra cứu theo câu hỏi".</li>
        <li>Chọn chủ đề phù hợp, hoặc nhập câu hỏi từ 20 đến 200 ký tự.</li>
        <li>Rút đúng ba lá từ bàn bài 22 lá rồi xác nhận.</li>
        <li>Xem luận giải từng lá cùng phần tổng kết.</li>
      </ol>
      <p className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
        Lưu ý: mọi luận giải mang tính tham khảo và giải trí. Quyết định cuộc sống vẫn
        thuộc về bạn.
      </p>
    </article>
  )
}
