import { cardById } from '../data/cards'
import { topicById } from '../data/topics'
import type { DrawnCard, Orientation } from './tarot'

export const POSITION_LABELS = ['Bối cảnh', 'Thách thức', 'Hướng đi'] as const

export interface ReadingCard {
  id: number
  name: string
  nameEn: string
  position: string
  orientation: Orientation
  meaning: string
  advice: string
}

export interface Reading {
  cards: ReadingCard[]
  summary: string
}

const ORIENTATION_LABEL: Record<Orientation, string> = {
  upright: 'lá xuôi',
  reversed: 'lá ngược',
}

const SUIT_ADVICE: Record<string, string> = {
  major: 'Đây là thông điệp lớn — hãy dành thời gian chiêm nghiệm trước khi quyết.',
  wands: 'Giữ lửa đam mê nhưng bước đi chắc từng bước một.',
  cups: 'Lắng nghe cảm xúc, đừng vội gạt chúng sang một bên.',
  swords: 'Sắp xếp lại suy nghĩ rồi mới nói, lời nói rõ ràng sẽ mở đường.',
  pentacles: 'Tính toán thực tế và kiên nhẫn sẽ mang lại kết quả bền.',
}

function toReadingCard(drawn: DrawnCard, index: number): ReadingCard {
  const card = cardById(drawn.id)
  const keywords =
    drawn.orientation === 'upright' ? card.keywordsUpright : card.keywordsReversed
  return {
    id: card.id,
    name: card.name,
    nameEn: card.nameEn,
    position: POSITION_LABELS[index] ?? `Vị trí ${index + 1}`,
    orientation: drawn.orientation,
    meaning: `${card.name} (${ORIENTATION_LABEL[drawn.orientation]}) nói về ${keywords}.`,
    advice: SUIT_ADVICE[card.suit],
  }
}

function namesLine(cards: ReadingCard[]): string {
  return cards.map((c) => `${c.name}${c.orientation === 'reversed' ? ' (ngược)' : ''}`).join(', ')
}

export function buildTopicReading(topicId: number, drawn: DrawnCard[]): Reading {
  const topic = topicById(topicId)
  const cards = drawn.map(toReadingCard)
  const topicName = topic ? topic.name : 'cuộc sống'
  const summary =
    `Về chủ đề ${topicName}, ba lá bài bạn rút là ${namesLine(cards)}. ` +
    `Lá đầu phơi bày bối cảnh đang có, lá giữa chỉ ra điểm cần vượt qua, ` +
    `và lá cuối gợi mở hướng đi phía trước. Hãy xem chi tiết từng lá bên dưới.`
  return { cards, summary }
}

export function buildQuestionReading(question: string, drawn: DrawnCard[]): Reading {
  const cards = drawn.map(toReadingCard)
  const trimmed = question.trim()
  const summary =
    `Với câu hỏi "${trimmed}", bộ bài trả lời qua ${namesLine(cards)}. ` +
    `Bối cảnh, thách thức và hướng đi lần lượt hiện ra trong ba lá — ` +
    `đọc kỹ từng lá để tự tìm câu trả lời của riêng mình.`
  return { cards, summary }
}
