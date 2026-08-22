import { useCallback, useState } from 'react'
import { drawDeck, TABLE_SIZE } from '../lib/tarot'
import type { DrawnCard } from '../lib/tarot'

export type DrawPhase = 'setup' | 'table' | 'countdown' | 'reveal'

export function useDrawFlow(initial: DrawPhase = 'setup') {
  const [phase, setPhase] = useState<DrawPhase>(initial)
  const [deck, setDeck] = useState<DrawnCard[]>([])
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const start = useCallback(() => {
    setDeck(drawDeck(TABLE_SIZE))
    setSelectedIds([])
    setPhase('table')
  }, [])

  const toggle = useCallback((id: number) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= 3) return prev
      return [...prev, id]
    })
  }, [])

  const beginCountdown = useCallback(() => {
    setSelectedIds((prev) => {
      if (prev.length === 3) setPhase('countdown')
      return prev
    })
  }, [])

  const finishCountdown = useCallback(() => setPhase('reveal'), [])

  const reset = useCallback(() => {
    setDeck([])
    setSelectedIds([])
    setPhase('setup')
  }, [])

  return { phase, deck, selectedIds, start, toggle, beginCountdown, finishCountdown, reset }
}

export function chosenCards(deck: DrawnCard[], ids: number[]): DrawnCard[] {
  const map = new Map(deck.map((c) => [c.id, c]))
  return ids.map((id) => map.get(id)).filter((c): c is DrawnCard => Boolean(c))
}
