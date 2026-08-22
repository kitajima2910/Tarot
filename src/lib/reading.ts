import { cardById } from '../data/cards'
import { topicById } from '../data/topics'
import type { DrawnCard, Orientation } from './tarot'
import type { Locale } from '../i18n/messages'
import { cardKeywords, cardName, topicName } from '../i18n/localize'

const POSITION_LABELS: Record<Locale, readonly string[]> = {
  vi: ['Bối cảnh', 'Thách thức', 'Hướng đi'],
  en: ['Background', 'Challenge', 'Direction'],
}

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

const ORIENTATION_LABEL: Record<Locale, Record<Orientation, string>> = {
  vi: { upright: 'lá xuôi', reversed: 'lá ngược' },
  en: { upright: 'upright', reversed: 'reversed' },
}

const SUIT_ADVICE: Record<Locale, Record<string, string>> = {
  vi: {
    major: 'Đây là thông điệp lớn — hãy dành thời gian chiêm nghiệm trước khi quyết.',
    wands: 'Giữ lửa đam mê nhưng bước đi chắc từng bước một.',
    cups: 'Lắng nghe cảm xúc, đừng vội gạt chúng sang một bên.',
    swords: 'Sắp xếp lại suy nghĩ rồi mới nói, lời nói rõ ràng sẽ mở đường.',
    pentacles: 'Tính toán thực tế và kiên nhẫn sẽ mang lại kết quả bền.',
  },
  en: {
    major: 'This is a big message — take time to reflect before deciding.',
    wands: 'Keep the fire of passion but move forward one steady step at a time.',
    cups: 'Listen to your emotions, don\'t rush to set them aside.',
    swords: 'Sort out your thoughts before speaking; clear words will clear the path.',
    pentacles: 'Practical planning and patience will bring lasting results.',
  },
}

const SUIT_FALLBACK = {
  vi: { major: 'Thông điệp', wands: 'Gậy', cups: 'Cốc', swords: 'Kiếm', pentacles: 'Xu' },
  en: { major: 'Major', wands: 'Wands', cups: 'Cups', swords: 'Swords', pentacles: 'Pentacles' },
}

function toReadingCard(drawn: DrawnCard, index: number, locale: Locale): ReadingCard {
  const card = cardById(drawn.id)
  const keywords = cardKeywords(card, drawn.orientation, locale)
  const name = cardName(card, locale)
  return {
    id: card.id,
    name: card.name,
    nameEn: card.nameEn,
    position: POSITION_LABELS[locale][index] ?? (locale === 'en' ? `Position ${index + 1}` : `Vị trí ${index + 1}`),
    orientation: drawn.orientation,
    meaning:
      locale === 'en'
        ? `${name} (${ORIENTATION_LABEL.en[drawn.orientation]}) speaks about ${keywords}.`
        : `${name} (${ORIENTATION_LABEL.vi[drawn.orientation]}) nói về ${keywords}.`,
    advice: SUIT_ADVICE[locale][card.suit] ?? SUIT_FALLBACK[locale][card.suit],
  }
}

function namesLine(cards: ReadingCard[], locale: Locale): string {
  const reversed = locale === 'en' ? ' (reversed)' : ' (ngược)'
  return cards.map((c) => `${locale === 'en' ? c.nameEn : c.name}${c.orientation === 'reversed' ? reversed : ''}`).join(', ')
}

export function buildTopicReading(topicId: number, drawn: DrawnCard[], locale: Locale = 'vi'): Reading {
  const topic = topicById(topicId)
  const cards = drawn.map((d, i) => toReadingCard(d, i, locale))
  const topicName_ = topic ? topicName(topic, locale) : locale === 'en' ? 'life' : 'cuộc sống'
  const summary =
    locale === 'en'
      ? `On the topic of ${topicName_}, the three cards you drew are ${namesLine(cards, locale)}. ` +
        `The first card reveals the current background, the middle one points to what needs to be overcome, ` +
        `and the last one suggests the path ahead. See each card below for details.`
      : `Về chủ đề ${topicName_}, ba lá bài bạn rút là ${namesLine(cards, locale)}. ` +
        `Lá đầu phơi bày bối cảnh đang có, lá giữa chỉ ra điểm cần vượt qua, ` +
        `và lá cuối gợi mở hướng đi phía trước. Hãy xem chi tiết từng lá bên dưới.`
  return { cards, summary }
}

export function buildQuestionReading(question: string, drawn: DrawnCard[], locale: Locale = 'vi'): Reading {
  const cards = drawn.map((d, i) => toReadingCard(d, i, locale))
  const trimmed = question.trim()
  const summary =
    locale === 'en'
      ? `For the question "${trimmed}", the deck answers through ${namesLine(cards, locale)}. ` +
        `The background, the challenge and the direction unfold across the three cards — ` +
        `read each one closely to find your own answer.`
      : `Với câu hỏi "${trimmed}", bộ bài trả lời qua ${namesLine(cards, locale)}. ` +
        `Bối cảnh, thách thức và hướng đi lần lượt hiện ra trong ba lá — ` +
        `đọc kỹ từng lá để tự tìm câu trả lời của riêng mình.`
  return { cards, summary }
}
