// @vitest-environment jsdom
import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CursorGlow } from './CursorGlow'

let container: HTMLDivElement
let root: Root

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
  root = createRoot(container)
})

afterEach(() => {
  act(() => root.unmount())
  container.remove()
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('CursorGlow guards', () => {
  it('matchMedia không tồn tại: không crash, không gắn pointermove', () => {
    vi.stubGlobal('matchMedia', undefined)
    const addSpy = vi.spyOn(window, 'addEventListener')
    act(() => root.render(<CursorGlow />))
    expect(container.firstElementChild).not.toBeNull()
    expect(
      addSpy.mock.calls.some(([type]) => type === 'pointermove'),
    ).toBe(false)
  })

  it('pointer không fine: node tĩnh opacity-0, không gắn pointermove', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: false }))
    const addSpy = vi.spyOn(window, 'addEventListener')
    act(() => root.render(<CursorGlow />))
    const glow = container.querySelector('div[aria-hidden]')
    expect(glow).not.toBeNull()
    expect(glow?.className).toContain('opacity-0')
    expect(glow?.className).toContain('pointer-events-none')
    expect(
      addSpy.mock.calls.some(([type]) => type === 'pointermove'),
    ).toBe(false)
  })

  it('pointer fine + không reduced-motion: gắn pointermove, unmount gỡ sạch', () => {
    vi.stubGlobal('matchMedia', (query: string) => ({
      matches: !query.includes('reduce'),
    }))
    vi.stubGlobal('requestAnimationFrame', () => 1)
    vi.stubGlobal('cancelAnimationFrame', () => {})
    const addSpy = vi.spyOn(window, 'addEventListener')
    const removeSpy = vi.spyOn(window, 'removeEventListener')
    act(() => root.render(<CursorGlow />))
    expect(addSpy).toHaveBeenCalledWith('pointermove', expect.any(Function))
    act(() => root.unmount())
    expect(removeSpy).toHaveBeenCalledWith('pointermove', expect.any(Function))
    root = createRoot(container)
  })
})
