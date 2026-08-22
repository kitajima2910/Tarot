import { describe, expect, it } from 'vitest'
import { buildQuestionReading, buildTopicReading } from './reading'
import { drawDeck } from './tarot'

const drawn = [
  { id: 1, orientation: 'upright' as const },
  { id: 2, orientation: 'reversed' as const },
  { id: 23, orientation: 'upright' as const },
]

describe('buildTopicReading', () => {
  it('trả về đúng 3 lá kèm tên và ý nghĩa không rỗng', () => {
    const reading = buildTopicReading(1, drawn)
    expect(reading.cards).toHaveLength(3)
    for (const c of reading.cards) {
      expect(c.name.length).toBeGreaterThan(0)
      expect(c.meaning.length).toBeGreaterThan(0)
      expect(c.advice.length).toBeGreaterThan(0)
    }
  })

  it('ghi nhận đúng chiều lá bài', () => {
    const reading = buildTopicReading(2, drawn)
    expect(reading.cards[0].orientation).toBe('upright')
    expect(reading.cards[1].orientation).toBe('reversed')
  })
})

describe('buildQuestionReading', () => {
  it('summary nhắc lại câu hỏi của người dùng', () => {
    const q = 'Công việc sắp tới của tôi có nên thay đổi hay không?'
    const reading = buildQuestionReading(q, drawDeck(3))
    expect(reading.summary).toContain(q)
  })
})
