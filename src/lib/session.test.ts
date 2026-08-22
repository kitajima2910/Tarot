// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest'
import { clearSession, loadSession, saveSession } from './session'

describe('session storage', () => {
  beforeEach(() => clearSession())

  it('lưu và đọc lại payload rút bài', () => {
    saveSession({
      type: 'topic',
      topicId: 1,
      cards: [
        { id: 5, orientation: 'upright' },
        { id: 17, orientation: 'reversed' },
        { id: 40, orientation: 'upright' },
      ],
    })
    const loaded = loadSession()
    expect(loaded?.type).toBe('topic')
    expect(loaded?.cards).toHaveLength(3)
    expect(loaded?.cards[1]).toEqual({ id: 17, orientation: 'reversed' })
  })

  it('trả về null khi chưa có dữ liệu', () => {
    expect(loadSession()).toBeNull()
  })

  it('trả về null với JSON hỏng', () => {
    sessionStorage.setItem('tarot-clone-session', '{broken')
    expect(loadSession()).toBeNull()
  })

  it('trả về null khi card id ngoài 1-78', () => {
    sessionStorage.setItem(
      'tarot-clone-session',
      JSON.stringify({ type: 'topic', cards: [{ id: 999, orientation: 'upright' }] }),
    )
    expect(loadSession()).toBeNull()
  })

  it('trả về null khi orientation không hợp lệ', () => {
    sessionStorage.setItem(
      'tarot-clone-session',
      JSON.stringify({ type: 'topic', cards: [{ id: 1, orientation: 'sideways' }] }),
    )
    expect(loadSession()).toBeNull()
  })

  it('trả về null khi card thiếu trường', () => {
    sessionStorage.setItem(
      'tarot-clone-session',
      JSON.stringify({ type: 'topic', cards: [{ id: 1 }] }),
    )
    expect(loadSession()).toBeNull()
  })
})
