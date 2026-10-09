import { useState } from 'react'
import { loadCounter, saveCounter } from './storage'

export default function App() {
  const [count, setCount] = useState(loadCounter)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 px-6 py-10 text-slate-800">
      <p
        id="counter"
        data-testid="counter"
        aria-live="polite"
        className="text-7xl font-bold tabular-nums sm:text-9xl"
      >
        {count}
      </p>
      <button
        type="button"
        onClick={() => {
          const next = count + 1
          setCount(next)
          saveCounter(next)
        }}
        className="min-h-40 w-full max-w-md cursor-pointer rounded-3xl bg-indigo-600 px-8 text-5xl font-bold text-white shadow-lg hover:bg-indigo-700 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-indigo-400 active:bg-indigo-800"
      >
        +1
      </button>
    </main>
  )
}
