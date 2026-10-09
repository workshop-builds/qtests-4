import planText from '../PLAN.md?raw'
import { parseMilestones } from './plan'

const milestones = parseMilestones(planText)

export default function App() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-8 px-6 py-16 text-slate-800">
      <header>
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">$QTESTS</p>
        <h1 className="text-4xl font-bold">Quiet Test Sol</h1>
      </header>

      <section aria-labelledby="what">
        <h2 id="what" className="mb-2 text-xl font-semibold">What it will be</h2>
        <p>
          A single web page with one big button. Each click adds 1 to a counter shown in the
          middle of the page. The counter is saved in the browser, so it stays after a refresh.
          Nothing else.
        </p>
      </section>

      <section aria-labelledby="plan">
        <h2 id="plan" className="mb-2 text-xl font-semibold">Plan</h2>
        <ol className="list-inside list-decimal space-y-1">
          {milestones.map((m) => (
            <li key={m.number}>{m.title}</li>
          ))}
        </ol>
      </section>
    </main>
  )
}
