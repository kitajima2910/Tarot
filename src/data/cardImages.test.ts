import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { CARDS } from './cards'
import { cardImage } from './cardImages'

describe('cardImage', () => {
  it('trả path public tồn tại trên disk cho đủ 78 lá', () => {
    for (const card of CARDS) {
      const url = cardImage(card.id)
      expect(url.startsWith('/AssetsTarot78/'), `id ${card.id}`).toBe(true)
      const rel = decodeURIComponent(url)
      expect(existsSync(join('public', rel)), `id ${card.id} ${rel}`).toBe(true)
    }
  })

  it('map đúng 3 bẫy tên asset', () => {
    expect(decodeURIComponent(cardImage(8))).toContain('VII. The Chariot.png')
    expect(decodeURIComponent(cardImage(9))).toContain('VII. Strength.png')
    expect(decodeURIComponent(cardImage(11))).toContain('X. The Wheel.png')
    expect(decodeURIComponent(cardImage(21))).toContain('XX. Judgement.png')
    expect(decodeURIComponent(cardImage(65))).toContain('Age of Pentacles.png')
  })

  it('fallback rỗng khi id ngoài 1-78', () => {
    expect(cardImage(0)).toBe('')
    expect(cardImage(79)).toBe('')
    expect(cardImage(-1)).toBe('')
  })
})
