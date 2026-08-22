import { useEffect, useState } from 'react'

interface CountdownDialogProps {
  onDone: () => void
}

export function CountdownDialog({ onDone }: CountdownDialogProps) {
  const [n, setN] = useState(3)

  useEffect(() => {
    if (n < 0) {
      onDone()
      return
    }
    const t = setTimeout(() => setN((v) => v - 1), n === 0 ? 400 : 700)
    return () => clearTimeout(t)
  }, [n, onDone])

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur-sm"
    >
      <p className="animate-pulse bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-8xl font-black text-transparent">
        {n > 0 ? n : '✦'}
      </p>
    </div>
  )
}
