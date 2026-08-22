import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { CARDS } from './cards'
import { cardImage } from './cardImages'

const ROMAN = [
  'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI',
  'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI',
]

function expectedAssetFile(id: number): string {
  if (id <= 22) {
    const prefix = id === 1 ? '0' : id === 9 ? 'VII' : ROMAN[id - 2]
    return `${prefix}. ${CARDS[id - 1].nameEn}.png`
  }
  if (id === 65) return 'Age of Pentacles.png'
  return `${CARDS[id - 1].nameEn}.png`
}

describe('nameEn khớp asset disk 78 lá', () => {
  it('CARDS đủ 78 lá và nameEn không rỗng', () => {
    expect(CARDS).toHaveLength(78)
    for (const c of CARDS) {
      expect(c.nameEn.trim().length, `id ${c.id}`).toBeGreaterThan(0)
    }
  })

  it('nameEn suy ra đúng tên file tồn tại trên disk cho cả 78 lá', () => {
    for (const c of CARDS) {
      const url = cardImage(c.id)
      expect(url.startsWith('/AssetsTarot78/'), `id ${c.id}`).toBe(true)
      const rel = decodeURIComponent(url)
      expect(rel.endsWith(`/${expectedAssetFile(c.id)}`), `id ${c.id} ${rel}`).toBe(true)
      expect(existsSync(join('public', rel)), `id ${c.id} ${rel}`).toBe(true)
    }
  })

  it('4 bẫy tên: Strength, The Wheel, Judgement, id 65 hiển thị Ace (không Age)', () => {
    expect(CARDS[8].nameEn).toBe('Strength')
    expect(CARDS[7].nameEn).toBe('The Chariot')
    expect(CARDS[10].nameEn).toBe('The Wheel')
    expect(CARDS[20].nameEn).toBe('Judgement')
    expect(CARDS[64].nameEn).toBe('Ace of Pentacles')
    expect(CARDS[64].name).toBe('Át Xu')
  })
})
