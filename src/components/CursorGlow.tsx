import { useEffect, useRef } from 'react'

export function CursorGlow() {
  const glow = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof matchMedia !== 'function') return
    if (!matchMedia('(pointer: fine)').matches) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const el = glow.current
    if (!el) return

    const pos = { x: -300, y: -300, tx: -300, ty: -300, raf: 0 }
    const onMove = (e: PointerEvent) => {
      pos.tx = e.clientX
      pos.ty = e.clientY
      el.style.opacity = '1'
    }
    const tick = () => {
      pos.x += (pos.tx - pos.x) * 0.16
      pos.y += (pos.ty - pos.y) * 0.16
      el.style.transform = `translate3d(${pos.x - 150}px, ${pos.y - 150}px, 0)`
      pos.raf = requestAnimationFrame(tick)
    }
    window.addEventListener('pointermove', onMove)
    pos.raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(pos.raf)
      el.style.opacity = '0'
    }
  }, [])

  return (
    <div
      ref={glow}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-30 h-[300px] w-[300px] rounded-full opacity-0 mix-blend-screen"
      style={{
        background:
          'radial-gradient(circle, rgba(212,175,55,0.13) 0%, rgba(139,92,246,0.07) 45%, transparent 70%)',
        transform: 'translate3d(-300px, -300px, 0)',
        willChange: 'transform',
      }}
    />
  )
}
