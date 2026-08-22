export type Suit = 'major' | 'wands' | 'cups' | 'swords' | 'pentacles'

export interface TarotCard {
  id: number
  name: string
  nameEn: string
  suit: Suit
  keywordsUpright: string
  keywordsReversed: string
}

const major: Array<[string, string, string, string]> = [
  ['Kẻ Ngốc', 'The Fool', 'khởi đầu mới, tinh thần tự do, hồn nhiên', 'liều lĩnh, thiếu định hướng, do dự'],
  ['Ảo Thuật Gia', 'The Magician', 'năng lực hiện thực hóa ý tưởng, nguồn lực sẵn có', 'mưu cầu hư danh, năng lượng phân tán'],
  ['Nữ Tư Tế', 'The High Priestess', 'trực giác sâu sắc, bí mật ẩn giấu, sự tĩnh lặng', 'bỏ qua trực giác, tiết lộ quá sớm'],
  ['Hoàng Hậu', 'The Empress', 'nuôi dưỡng, sung túc, kết nối với thiên nhiên', 'quản lý cảm xúc yếu, tự thương mình quá mức'],
  ['Hoàng Đế', 'The Emperor', 'trật tự, kỷ luật, quyền lực ổn định', 'cứng nhắc, độc đoán, thiếu linh hoạt'],
  ['Giáo Chủ', 'The Hierophant', 'truyền thống, lời khuyên từ người đi trước', 'gò bó khuôn khổ, chất vấn quy tắc cũ'],
  ['Tình Nhân', 'The Lovers', 'lựa chọn xuất phát từ trái tim, hòa hợp', 'mâu thuẫn giá trị, do dự trong tình cảm'],
  ['Chiến Xa', 'The Chariot', 'ý chí tiến tới, chiến thắng nhờ kỷ luật', 'hướng đi mờ mịt, mất kiểm soát nhịp độ'],
  ['Sức Mạnh', 'Strength', 'can đảm dịu dàng, làm chủ bản năng', 'tự vấn năng lực, buông lòng hoài nghi'],
  ['Ẩn Sĩ', 'The Hermit', 'thời gian cho riêng mình, chiêm nghiệm nội tâm', 'cô lập quá lâu, né tránh chia sẻ'],
  ['Bánh Xe Số Phận', 'The Wheel', 'vòng xoáy vận may thay đổi, cơ hội đến tự nhiên', 'kháng cự thay đổi, chu kỳ lặp lại xấu'],
  ['Công Lý', 'Justice', 'sự thật được sáng tỏ, quyết định công bằng', 'thiên vị, né tránh trách nhiệm'],
  ['Người Treo Ngược', 'The Hanged Man', 'nhìn vấn đề theo góc mới, tạm dừng để hiểu', 'hy sinh vô ích, trì hoãn kéo dài'],
  ['Tử Thần', 'Death', 'kết thúc một chu kỳ để mở chương mới', 'níu kéo điều đã cũ, sợ chuyển mình'],
  ['Điều Độ', 'Temperance', 'cân bằng, kiên nhẫn, dung hòa các phía', 'thiếu cân bằng, thái cực'],
  ['Ác Ma', 'The Devil', 'ràng buộc vật chất, ham muốn cần nhìn thẳng', 'tháo gỡ trói buộc, vượt lên nợ nần'],
  ['Tòa Tháp', 'The Tower', 'đột biến phá cấu trúc cũ, sự thật sụp đổ', 'tránh né khủng hoảng, chậm thay đổi'],
  ['Ngôi Sao', 'The Star', 'hi vọng, chữa lành, tầm nhìn dài hạn', 'tin tưởng giảm sút, mục tiêu xa rời'],
  ['Vầng Trăng', 'The Moon', 'mơ hồ, tiềm thức, trực giác cần lắng nghe', 'sương mù tan dần, sáng tỏ nỗi sợ'],
  ['Vầng Dương', 'The Sun', 'rạng rỡ, thành công, năng lượng sống tích cực', 'niềm vui chững lại, lạc quan hạn chế'],
  ['Phán Xét', 'Judgement', 'thức tỉnh, tổng kết và tái sinh', 'tự phán xét gắt gao, bỏ lỡ bài học'],
  ['Thế Giới', 'The World', 'hoàn thành trọn vẹn, hội nhập rộng mở', 'dở dang khép lại, chưa trọn vòng kết'],
]

interface RankMeta {
  rank: string
  rankEn: string
  gist: string
}

const ranks: RankMeta[] = [
  { rank: 'Át', rankEn: 'Ace', gist: 'khởi đầu' },
  { rank: 'Hai', rankEn: 'Two', gist: 'lựa chọn' },
  { rank: 'Ba', rankEn: 'Three', gist: 'hợp tác' },
  { rank: 'Bốn', rankEn: 'Four', gist: 'ổn định' },
  { rank: 'Năm', rankEn: 'Five', gist: 'thử thách' },
  { rank: 'Sáu', rankEn: 'Six', gist: 'trao đổi' },
  { rank: 'Bảy', rankEn: 'Seven', gist: 'đánh giá' },
  { rank: 'Tám', rankEn: 'Eight', gist: 'tiến trình' },
  { rank: 'Chín', rankEn: 'Nine', gist: 'cận đích' },
  { rank: 'Mười', rankEn: 'Ten', gist: 'hoàn tất' },
  { rank: 'Trai', rankEn: 'Page', gist: 'học hỏi' },
  { rank: 'Kỵ Sĩ', rankEn: 'Knight', gist: 'hành động' },
  { rank: 'Nữ Hoàng', rankEn: 'Queen', gist: 'chăm sóc' },
  { rank: 'Vua', rankEn: 'King', gist: 'làm chủ' },
]

interface SuitMeta {
  suit: Suit
  vn: string
  up: string
  rev: string
}

const suitMeta: SuitMeta[] = [
  {
    suit: 'wands',
    vn: 'Gậy',
    up: 'đam mê, hành động và sự nghiệp',
    rev: 'cháy hết mình, trì hoãn kế hoạch',
  },
  {
    suit: 'cups',
    vn: 'Cốc',
    up: 'cảm xúc, tình yêu và kết nối',
    rev: 'nội tâm dậy sóng, cảm xúc dồn nén',
  },
  {
    suit: 'swords',
    vn: 'Kiếm',
    up: 'tư duy, chân lý và giao tiếp',
    rev: 'suy nghĩ quá tải, lời nói gây tổn thương',
  },
  {
    suit: 'pentacles',
    vn: 'Xu',
    up: 'tài chính, công việc và sự bền vững',
    rev: 'lo toan tiền bạc, đầu tư thiếu chắc',
  },
]

const suitEn = (suit: Suit) => suit[0].toUpperCase() + suit.slice(1)

export const CARDS: TarotCard[] = (() => {
  const list: TarotCard[] = major.map((m, i) => ({
    id: i + 1,
    name: m[0],
    nameEn: m[1],
    suit: 'major',
    keywordsUpright: m[2],
    keywordsReversed: m[3],
  }))
  for (const meta of suitMeta) {
    ranks.forEach((r) => {
      list.push({
        id: list.length + 1,
        name: `${r.rank} ${meta.vn}`,
        nameEn: `${r.rankEn} of ${suitEn(meta.suit)}`,
        suit: meta.suit,
        keywordsUpright: `${r.gist} trong ${meta.up}`,
        keywordsReversed: `${r.gist} chững lại — ${meta.rev}`,
      })
    })
  }
  return list
})()

const byId = new Map(CARDS.map((c) => [c.id, c]))

export function cardById(id: number): TarotCard {
  const card = byId.get(id)
  if (!card) throw new Error(`Unknown card id: ${id}`)
  return card
}

export const SUIT_LABEL: Record<Suit, string> = {
  major: 'Ẩn chính',
  wands: 'Gậy',
  cups: 'Cốc',
  swords: 'Kiếm',
  pentacles: 'Xu',
}
