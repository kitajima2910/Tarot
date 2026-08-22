export type Suit = 'major' | 'wands' | 'cups' | 'swords' | 'pentacles'

export interface TarotCard {
  id: number
  name: string
  nameEn: string
  suit: Suit
  keywordsUpright: string
  keywordsReversed: string
  keywordsUprightEn: string
  keywordsReversedEn: string
}

/** [name VN, name EN, up VN, rev VN, up EN, rev EN] */
const major: Array<[string, string, string, string, string, string]> = [
  ['Kẻ Ngốc', 'The Fool', 'khởi đầu mới, tinh thần tự do, hồn nhiên', 'liều lĩnh, thiếu định hướng, do dự', 'new beginnings, freedom, innocence', 'recklessness, lack of direction, hesitation'],
  ['Ảo Thuật Gia', 'The Magician', 'năng lực hiện thực hóa ý tưởng, nguồn lực sẵn có', 'mưu cầu hư danh, năng lượng phân tán', 'manifestation, having all the tools', 'delusion, scattered energy'],
  ['Nữ Tư Tế', 'The High Priestess', 'trực giác sâu sắc, bí mật ẩn giấu, sự tĩnh lặng', 'bỏ qua trực giác, tiết lộ quá sớm', 'intuition, hidden knowledge, stillness', 'ignoring intuition, revealing too soon'],
  ['Hoàng Hậu', 'The Empress', 'nuôi dưỡng, sung túc, kết nối với thiên nhiên', 'quản lý cảm xúc yếu, tự thương mình quá mức', 'nurture, abundance, connection to nature', 'weak emotional management, over-self-care'],
  ['Hoàng Đế', 'The Emperor', 'trật tự, kỷ luật, quyền lực ổn định', 'cứng nhắc, độc đoán, thiếu linh hoạt', 'order, discipline, stable authority', 'rigidity, domination, inflexibility'],
  ['Giáo Chủ', 'The Hierophant', 'truyền thống, lời khuyên từ người đi trước', 'gò bó khuôn khổ, chất vấn quy tắc cũ', 'tradition, guidance from elders', 'restriction, questioning old rules'],
  ['Tình Nhân', 'The Lovers', 'lựa chọn xuất phát từ trái tim, hòa hợp', 'mâu thuẫn giá trị, do dự trong tình cảm', 'heartfelt choice, harmony', 'value conflict, indecision in love'],
  ['Chiến Xa', 'The Chariot', 'ý chí tiến tới, chiến thắng nhờ kỷ luật', 'hướng đi mờ mịt, mất kiểm soát nhịp độ', 'willpower, victory through discipline', 'unclear direction, loss of pace control'],
  ['Sức Mạnh', 'Strength', 'can đảm dịu dàng, làm chủ bản năng', 'tự vấn năng lực, buông lòng hoài nghi', 'gentle courage, mastery of instinct', 'self-doubt, giving in to fear'],
  ['Ẩn Sĩ', 'The Hermit', 'thời gian cho riêng mình, chiêm nghiệm nội tâm', 'cô lập quá lâu, né tránh chia sẻ', 'alone time, inner contemplation', 'prolonged isolation, avoiding sharing'],
  ['Bánh Xe Số Phận', 'The Wheel', 'vòng xoáy vận may thay đổi, cơ hội đến tự nhiên', 'kháng cự thay đổi, chu kỳ lặp lại xấu', 'turning of fortune, natural opportunity', 'resistance to change, negative cycles'],
  ['Công Lý', 'Justice', 'sự thật được sáng tỏ, quyết định công bằng', 'thiên vị, né tránh trách nhiệm', 'clarity of truth, fair decision', 'bias, avoiding responsibility'],
  ['Người Treo Ngược', 'The Hanged Man', 'nhìn vấn đề theo góc mới, tạm dừng để hiểu', 'hy sinh vô ích, trì hoãn kéo dài', 'new perspective, pausing to understand', 'pointless sacrifice, prolonged delay'],
  ['Tử Thần', 'Death', 'kết thúc một chu kỳ để mở chương mới', 'níu kéo điều đã cũ, sợ chuyển mình', 'end of a cycle, fresh start', 'clinging to the past, fear of change'],
  ['Điều Độ', 'Temperance', 'cân bằng, kiên nhẫn, dung hòa các phía', 'thiếu cân bằng, thái cực', 'balance, patience, blending', 'imbalance, extremes'],
  ['Ác Ma', 'The Devil', 'ràng buộc vật chất, ham muốn cần nhìn thẳng', 'tháo gỡ trói buộc, vượt lên nợ nần', 'material attachment, facing desire', 'release of bondage, overcoming debt'],
  ['Tòa Tháp', 'The Tower', 'đột biến phá cấu trúc cũ, sự thật sụp đổ', 'tránh né khủng hoảng, chậm thay đổi', 'sudden upheaval, collapse of truth', 'avoiding crisis, slow change'],
  ['Ngôi Sao', 'The Star', 'hi vọng, chữa lành, tầm nhìn dài hạn', 'tin tưởng giảm sút, mục tiêu xa rời', 'hope, healing, long-term vision', 'waning faith, distant goals'],
  ['Vầng Trăng', 'The Moon', 'mơ hồ, tiềm thức, trực giác cần lắng nghe', 'sương mù tan dần, sáng tỏ nỗi sợ', 'ambiguity, subconscious, intuition', 'fog lifting, fear made clear'],
  ['Vầng Dương', 'The Sun', 'rạng rỡ, thành công, năng lượng sống tích cực', 'niềm vui chững lại, lạc quan hạn chế', 'radiance, success, positive vitality', 'fading joy, limited optimism'],
  ['Phán Xét', 'Judgement', 'thức tỉnh, tổng kết và tái sinh', 'tự phán xét gắt gao, bỏ lỡ bài học', 'awakening, reflection and rebirth', 'harsh self-judgment, missing lessons'],
  ['Thế Giới', 'The World', 'hoàn thành trọn vẹn, hội nhập rộng mở', 'dở dang khép lại, chưa trọn vòng kết', 'completion, wide integration', 'unfinished, incomplete cycle'],
]

interface RankMeta {
  rank: string
  rankEn: string
  gist: string
  gistEn: string
}

const ranks: RankMeta[] = [
  { rank: 'Át', rankEn: 'Ace', gist: 'khởi đầu', gistEn: 'beginnings' },
  { rank: 'Hai', rankEn: 'Two', gist: 'lựa chọn', gistEn: 'choice' },
  { rank: 'Ba', rankEn: 'Three', gist: 'hợp tác', gistEn: 'collaboration' },
  { rank: 'Bốn', rankEn: 'Four', gist: 'ổn định', gistEn: 'stability' },
  { rank: 'Năm', rankEn: 'Five', gist: 'thử thách', gistEn: 'challenge' },
  { rank: 'Sáu', rankEn: 'Six', gist: 'trao đổi', gistEn: 'exchange' },
  { rank: 'Bảy', rankEn: 'Seven', gist: 'đánh giá', gistEn: 'reflection' },
  { rank: 'Tám', rankEn: 'Eight', gist: 'tiến trình', gistEn: 'progress' },
  { rank: 'Chín', rankEn: 'Nine', gist: 'cận đích', gistEn: 'near completion' },
  { rank: 'Mười', rankEn: 'Ten', gist: 'hoàn tất', gistEn: 'completion' },
  { rank: 'Trai', rankEn: 'Page', gist: 'học hỏi', gistEn: 'learning' },
  { rank: 'Kỵ Sĩ', rankEn: 'Knight', gist: 'hành động', gistEn: 'action' },
  { rank: 'Nữ Hoàng', rankEn: 'Queen', gist: 'chăm sóc', gistEn: 'nurturing' },
  { rank: 'Vua', rankEn: 'King', gist: 'làm chủ', gistEn: 'mastery' },
]

interface SuitMeta {
  suit: Suit
  vn: string
  up: string
  rev: string
  upEn: string
  revEn: string
}

const suitMeta: SuitMeta[] = [
  {
    suit: 'wands',
    vn: 'Gậy',
    up: 'đam mê, hành động và sự nghiệp',
    rev: 'cháy hết mình, trì hoãn kế hoạch',
    upEn: 'passion, action and career',
    revEn: 'burnout, stalled plans',
  },
  {
    suit: 'cups',
    vn: 'Cốc',
    up: 'cảm xúc, tình yêu và kết nối',
    rev: 'nội tâm dậy sóng, cảm xúc dồn nén',
    upEn: 'emotion, love and connection',
    revEn: 'inner turmoil, bottled feelings',
  },
  {
    suit: 'swords',
    vn: 'Kiếm',
    up: 'tư duy, chân lý và giao tiếp',
    rev: 'suy nghĩ quá tải, lời nói gây tổn thương',
    upEn: 'thought, truth and communication',
    revEn: 'overthinking, hurtful words',
  },
  {
    suit: 'pentacles',
    vn: 'Xu',
    up: 'tài chính, công việc và sự bền vững',
    rev: 'lo toan tiền bạc, đầu tư thiếu chắc',
    upEn: 'money, work and sustainability',
    revEn: 'money worries, unsturdy investment',
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
    keywordsUprightEn: m[4],
    keywordsReversedEn: m[5],
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
        keywordsUprightEn: `${r.gistEn} in ${meta.upEn}`,
        keywordsReversedEn: `${r.gistEn} stalling — ${meta.revEn}`,
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

export const SUIT_LABEL_EN: Record<Suit, string> = {
  major: 'Major Arcana',
  wands: 'Wands',
  cups: 'Cups',
  swords: 'Swords',
  pentacles: 'Pentacles',
}
