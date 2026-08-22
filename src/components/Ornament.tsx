export function Ornament({ text }: { text: string }) {
  return (
    <div className="mb-4 flex items-center justify-center gap-4 text-gold-soft/80">
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold-soft/40 sm:w-16" />
      <span className="text-xs tracking-[0.35em] uppercase">{text}</span>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold-soft/40 sm:w-16" />
    </div>
  )
}
