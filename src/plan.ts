export type Milestone = { number: number; title: string }

/** Extract "## Milestone N: <title>" headings from PLAN.md text. */
export function parseMilestones(markdown: string): Milestone[] {
  const re = /^## Milestone (\d+): (.+)$/gm
  const out: Milestone[] = []
  for (const m of markdown.matchAll(re)) {
    out.push({ number: Number(m[1]), title: m[2].trim() })
  }
  return out
}
