import type { DrawnCard } from './tarot'

export interface TarotSessionPayload {
  type: 'topic' | 'question'
  topicId?: number
  question?: string
  cards: DrawnCard[]
}

const KEY = 'tarot-clone-session'

export function saveSession(payload: TarotSessionPayload): void {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(payload))
  } catch {
    return
  }
}

function isValidCard(c: unknown): c is { id: number; orientation: 'upright' | 'reversed' } {
  if (typeof c !== 'object' || c === null) return false
  const obj = c as Record<string, unknown>
  return (
    typeof obj.id === 'number' &&
    Number.isInteger(obj.id) &&
    obj.id >= 1 &&
    obj.id <= 78 &&
    (obj.orientation === 'upright' || obj.orientation === 'reversed')
  )
}

export function loadSession(): TarotSessionPayload | null {
  try {
    const raw = sessionStorage.getItem(KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as TarotSessionPayload
    if ((parsed.type !== 'topic' && parsed.type !== 'question') || !Array.isArray(parsed.cards)) {
      return null
    }
    if (!parsed.cards.every(isValidCard)) return null
    return parsed
  } catch {
    return null
  }
}

export function clearSession(): void {
  try {
    sessionStorage.removeItem(KEY)
  } catch {
    return
  }
}
