import { useState } from 'react'
import { QUESTION_MAX } from '../lib/tarot'
import { validateQuestion } from '../lib/tarot'

interface QuestionInputProps {
  onSubmit: (question: string) => void
}

export function QuestionInput({ onSubmit }: QuestionInputProps) {
  const [value, setValue] = useState('')
  const [error, setError] = useState<string | null>(null)
  const length = value.trim().length

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const check = validateQuestion(value)
    if (!check.ok) {
      setError(check.error ?? 'Câu hỏi chưa hợp lệ.')
      return
    }
    setError(null)
    onSubmit(value.trim())
  }

  return (
    <form onSubmit={submit} className="mx-auto w-full max-w-xl">
      <label htmlFor="question" className="mb-2 block text-sm text-slate-300">
        Câu hỏi của bạn ({length}/{QUESTION_MAX} ký tự, tối thiểu 20)
      </label>
      <textarea
        id="question"
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          setError(null)
        }}
        rows={3}
        placeholder="Ví dụ: Công việc hiện tại có nên tiếp tục hay tìm hướng mới?"
        maxLength={QUESTION_MAX + 50}
        className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-violet-400 focus:outline-none"
      />
      {error && (
        <p role="alert" className="mt-1 text-sm text-red-400">
          {error}
        </p>
      )}
      <button
        type="submit"
        className="mt-4 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 py-3 font-semibold text-white shadow-lg shadow-indigo-950/40 transition hover:brightness-110 disabled:opacity-50 sm:w-auto sm:px-10"
      >
        Gửi câu hỏi và rút bài
      </button>
    </form>
  )
}
