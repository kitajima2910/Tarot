// @vitest-environment jsdom
import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cardById } from '../data/cards'
import { I18nProvider } from '../i18n/I18nProvider'
import { FlipCard } from './FlipCard'

let container: HTMLDivElement
let root: Root

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
  root = createRoot(container)
  localStorage.setItem('tarot-clone-locale', 'en')
})

afterEach(() => {
  act(() => root.unmount())
  container.remove()
})

function renderCard(orientation: 'upright' | 'reversed') {
  const info = cardById(9)
  act(() => {
    root.render(
      <I18nProvider>
        <FlipCard card={{ id: 9, orientation }} revealed />
      </I18nProvider>,
    )
  })
  return info
}

describe('FlipCard badge với lá reversed', () => {
  it('ảnh nằm trong node rotate-180, badge tên EN nằm NGOÀI node rotate', () => {
    const info = renderCard('reversed')
    const img = container.querySelector('img')
    expect(img).not.toBeNull()
    expect(img?.closest('.rotate-180')).not.toBeNull()
    expect(img?.getAttribute('alt')).toBe(info.nameEn)
    const badge = [...container.querySelectorAll('span')].find(
      (s) => s.textContent === info.nameEn,
    )
    expect(badge).toBeDefined()
    expect(badge?.classList.contains('name-badge')).toBe(true)
    expect(badge?.closest('.rotate-180')).toBeNull()
  })

  it('lá upright vẫn render đủ ảnh + tên', () => {
    const info = renderCard('upright')
    expect(container.querySelector('img')).not.toBeNull()
    expect(container.textContent).toContain(info.nameEn)
  })
})
