export const STORAGE_KEY = 'qtests.counter'

/** Parse a stored value: only non-negative safe integers count, anything else is 0. */
export function parseStored(raw: string | null): number {
  if (raw === null || !/^\d+$/.test(raw.trim())) return 0
  const n = Number(raw.trim())
  return Number.isSafeInteger(n) ? n : 0
}

/** Read the counter. Never throws: if localStorage is unavailable, returns 0. */
export function loadCounter(): number {
  try {
    return parseStored(window.localStorage.getItem(STORAGE_KEY))
  } catch {
    return 0
  }
}

/** Save the counter. Never throws: if localStorage is unavailable, it is skipped. */
export function saveCounter(value: number): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(value))
  } catch {
    // Storage unavailable or full: the counter keeps working in memory.
  }
}
