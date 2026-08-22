# PHÂN TÍCH tarotmienphi.com — Phase ANALYZE

> Evidence cho phase tiếp theo. Nguồn: fetch HTML/JS thật ngày 2026-08-22.

## 1. Tổng quan

- Site bói tarot online tiếng Việt, CMS PHP tự viết (không phải WordPress/Laravel).
- Dark theme "bầu trời đêm huyền bí", nền #0f0f0f, hiệu ứng sao/twinkling.
- Font: Mulish (Google Fonts). Icon: Font Awesome 6 (self-host).
- Monetization: Google AdSense (ca-pub-3063006025282270) + bản tính phí.

## 2. Tech stack gốc

- Bootstrap 5.0.2 (CSS CDN jsdelivr, JS bundle self-host)
- jQuery 3.2.1 (Google Hosted Libraries)
- WOW.js + animate.css (scroll animation), jquery.sticky.js (sticky header)
- Cloudflare Turnstile CAPTCHA (sitekey 0x4AAAAAAEUMdYtjgzMCDM1w)
- FingerprintJS (/js/fp.min.js) — rate limit theo visitorId
- CSRF token per-page, gửi kèm mọi POST tới /tarot/*
- Backend AI: /tarot/check_question.php và /tarot/get_cards_ai.php
  (comment trong code nói prompt dựng ở server, gọi Gemini)

## 3. Sơ đồ trang & luồng chính

### Trang chủ /
- Header sticky: logo + menu (Giới thiệu, Tra cứu, Tra cứu theo câu hỏi,
  78 lá bài, dropdown Bài viết 5 danh mục, Liên hệ) + hamburger mobile
- Hero: tiêu đề "Lắng Nghe Vũ Trụ...", 3 lá bài nghiêng -30/0/+30 độ,
  animation moveUp, hover nâng lên; 2 CTA; nền stars + twinkling
- Section parallax tối: giới thiệu Tarot + 2 ảnh bàn tay animate
- Section "Tarot có thể làm gì cho bạn?": 4 box dịch vụ
- 2 lưới blog: "Bài viết mới" (~16 bài) + "Ý nghĩa lá bài" (~14 bài)
- Footer: logo, social (FB/YT/IG/TikTok), cột Chính sách, cột Liên hệ
- Support icons nổi (desktop) + phonebar dưới cùng (mobile)

### /boi-tarot-online/ — Tra cứu theo chủ đề
1. Chọn 1 trong 4 chủ đề: Tình cảm(1), Công việc(2), Sức khỏe(3), Tài chính(4)
   - data-topic trên div.topic, tên lấy từ alt của img
2. Hiện bộ bài: server render 22 lá ngẫu nhiên từ 78 lá
   - Mỗi lá: .tarot-card > .card-wrap > .card[data-id][data-orientation]
   - orientation=true = lá ngược (-reversed), kèm nhãn "(Lá bài ngược)"
   - CSS fan spread qua biến --n (1..22) và --spread
3. Chọn đúng 3 lá (click; mobile có kéo/vuốt deck qua translateX)
4. Animation: countdown 3-2-1-0 → lá không chọn fly-out → 3 lá selected
   bay vào final-pos-1/2/3 → lật lần lượt (revealed, cách 400ms)
5. submitTarotResult(): tạo form POST action=../ket-qua-boi-tarot/ với:
   - topicName (text), topicId (số)
   - cards[i][id], cards[i][orientation] ("upright"|"reversed") i=0..2

### /trai-bai-theo-cau-hoi/ — Tra cứu theo câu hỏi (AI)
1. Input câu hỏi (min 20, max 200 ký tự) + nút "Gửi câu hỏi"
2. POST /tarot/check_question.php {question, csrf_token} — AI kiểm tra
   câu hỏi có liên quan tarot không; lỗi hiện tooltip
3. Rút 3 lá giống luồng trên (FingerprintJS load trước)
4. submitTarotResult() async:
   - POST /tarot/get_cards_ai.php {question, cards[{id,orientation}],
     visitorId, csrf_token, cf_turnstile}
   - Response JSON trong ```json fence hoặc JSON thuần:
     {card1:{meaning,advice}, card2:..., card3:..., summary}
   - Lỗi LIMIT_REACHED → canUse=false, vẫn cho xem kết quả cơ bản
5. Form POST action=../ket-qua-trai-bai-theo-cau-hoi/ với question,
   can_use, summary, cards[i]{id,orientation,meaning,advice}

### Trang khác
- /y-nghia-cac-la-bai-tarot/: tra cứu 78 lá
- Blog: danh mục {slug}-{id} (vd kien-thuc-nen-tang-1),
  bài chi tiết {slug}-{id}.html (id 22..123)
- Tĩnh: /gioi-thieu/, /contact-us/, /privacy-policy/, /disclaimer/
- Bản phí: /trai-bai-theo-cau-hoi-tinh-phi/

## 4. Dữ liệu lá bài

- 78 lá: id 1-22 Major Arcana (The Fool=1 ... The World=22),
  23-78 Minor Arcana (Wands 23-36, Cups 37-50, Swords 51-64, Pentacles 65-78)
- Ảnh lá: /upload/thumb/{timestamp}_{ten-lá}.png|.jpg
- Mặt sau bài: /tarot/video/card-back.jpg
- Ảnh chủ đề: /tarot/video/card-{love|work|health|finance}.jpg

## 5. Điểm cần lưu ý khi clone

- KHÔNG sao chép nội dung văn bản (bài blog, luận giải) — thuộc bản quyền
  của chủ site. Clone cấu trúc/luồng/UI, dùng nội dung placeholder tự viết.
- Không dùng được API AI của họ (có CSRF + Turnstile + fingerprint).
  Thay bằng: DB ý nghĩa lá bài tĩnh (JSON) hoặc hook AI riêng nếu user có key.
- Kết quả trang gốc nhận POST form; bản clone có thể render client-side
  từ sessionStorage để tránh cần backend.
- Template gốc còn sót placeholder {NEWS_WIDTH}/{NEWS_HEIGHT} chưa render.

## 6. Đề xuất kiến trúc clone (cho phase BUILD)

- Stack theo web workflow: React + Vite + TypeScript + Tailwind CSS
- Router: / , /boi-tarot-online , /trai-bai-theo-cau-hoi ,
  /ket-qua-boi-tarot , /ket-qua-trai-bai-theo-cau-hoi ,
  /y-nghia-cac-la-bai-tarot , /gioi-thieu , /lien-he
- Data: src/data/cards.ts (78 lá: id, name, slug, upright/reversed meaning
  tự viết ngắn gọn), src/data/topics.ts (4 chủ đề)
- Components: Header, Footer, CardFan (spread + drag mobile), FlipCard,
  CountdownDialog, TopicGrid, QuestionInput, StarField (CSS stars/twinkling)
- Logic rút bài: shuffle 78 lá client-side, chọn 22 lá ngẫu nhiên hiển thị,
  orientation random ~50%, chọn tối đa 3 lá, animation theo class như gốc
- Kết quả: lưu selection vào sessionStorage, trang kết quả đọc ra và hiển thị
  meaning/advice từ data tĩnh (không cần server)
- UI text tiếng Việt, code tiếng Anh (luật workflow web)
