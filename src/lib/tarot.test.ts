import { describe, expect, it } from 'vitest'
import { drawDeck, shuffle, validateQuestion } from './tarot'

describe('shuffle', () => {
  it('giữ nguyên phần tử và độ dài', () => {
    const input = [1, 2, 3, 4, 5]
    const out = shuffle(input)
    expect(out).toHaveLength(input.length)
    expect([...out].sort((a, b) => a - b)).toEqual(input)
  })

  it('không mutate mảng gốc', () => {
    const input = [1, 2, 3]
    shuffle(input)
    expect(input).toEqual([1, 2, 3])
  })
})

describe('drawDeck', () => {
  it('mặc định rút đúng 22 lá, id duy nhất trong khoảng 1..78', () => {
    const deck = drawDeck()
    expect(deck).toHaveLength(22)
    const ids = new Set(deck.map((c) => c.id))
    expect(ids.size).toBe(22)
    for (const c of deck) {
      expect(c.id).toBeGreaterThanOrEqual(1)
      expect(c.id).toBeLessThanOrEqual(78)
    }
  })

  it('orientation chỉ là upright hoặc reversed', () => {
    for (const c of drawDeck()) {
      expect(['upright', 'reversed']).toContain(c.orientation)
    }
  })

  it('rút theo số lượng tùy chỉnh', () => {
    expect(drawDeck(3)).toHaveLength(3)
  })
})

describe('validateQuestion', () => {
  it('chấp nhận câu hỏi 20-200 ký tự', () => {
    expect(validateQuestion('a'.repeat(20)).ok).toBe(true)
    expect(validateQuestion('a'.repeat(200)).ok).toBe(true)
  })

  it('từ chối câu hỏi quá ngắn hoặc quá dài', () => {
    expect(validateQuestion('a'.repeat(19)).ok).toBe(false)
    expect(validateQuestion('a'.repeat(201)).ok).toBe(false)
  })

  it('trim khoảng trắng trước khi kiểm tra', () => {
    expect(validateQuestion('   a   ').ok).toBe(false)
  })
})
