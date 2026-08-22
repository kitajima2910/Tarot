export type Orientation = 'upright' | 'reversed'

export interface DrawnCard {
  id: number
  orientation: Orientation
}

export const DECK_SIZE = 78
export const TABLE_SIZE = 22

/** Fisher-Yates, trả về mảng mới, không mutate đầu vào */
export function shuffle<T>(input: readonly T[]): T[] {
  const out = [...input]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

/** Rút `count` lá ngẫu nhiên từ bộ 78, orientation ngược/xuôi ~50% */
export function drawDeck(count: number = TABLE_SIZE): DrawnCard[] {
  const ids = Array.from({ length: DECK_SIZE }, (_, i) => i + 1)
  return shuffle(ids)
    .slice(0, count)
    .map((id) => ({
      id,
      orientation: Math.random() < 0.5 ? 'upright' : 'reversed',
    }))
}

export const QUESTION_MIN = 20
export const QUESTION_MAX = 200

export interface QuestionValidation {
  ok: boolean
  error?: string
}

export function validateQuestion(raw: string): QuestionValidation {
  const q = raw.trim()
  if (q.length < QUESTION_MIN) {
    return { ok: false, error: `Câu hỏi cần ít nhất ${QUESTION_MIN} ký tự.` }
  }
  if (q.length > QUESTION_MAX) {
    return { ok: false, error: `Câu hỏi tối đa ${QUESTION_MAX} ký tự.` }
  }
  return { ok: true }
}
