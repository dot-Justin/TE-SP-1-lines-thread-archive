export type FilterKey = 'from' | 'has' | 'before' | 'after' | 'likes' | 'mentions'

export interface ActiveFilter {
  key: FilterKey
  value: string
  raw: string
}

export interface ParsedQuery {
  text: string
  filters: ActiveFilter[]
  isDirectPost: boolean
  directPostNum?: number
}

const KNOWN_KEYS: FilterKey[] = ['from', 'has', 'before', 'after', 'likes', 'mentions']
// Matches key:value tokens where key is a known filter keyword
const TOKEN_RE = new RegExp(`\\b(${KNOWN_KEYS.join('|')}):(\\S+)`, 'gi')

export function parseQuery(raw: string): ParsedQuery {
  const q = raw.trim()

  // Direct post jump: #NNN
  const directMatch = q.match(/^#(\d+)$/)
  if (directMatch) {
    return { text: '', filters: [], isDirectPost: true, directPostNum: Number(directMatch[1]) }
  }

  const filters: ActiveFilter[] = []
  const text = q.replace(TOKEN_RE, (rawToken, key, value) => {
    filters.push({ key: key.toLowerCase() as FilterKey, value: value.toLowerCase(), raw: rawToken })
    return ''
  }).replace(/\s+/g, ' ').trim()

  return { text, filters, isDirectPost: false }
}

function escRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function hasFilter(query: string, key: FilterKey, value?: string): boolean {
  return parseQuery(query).filters.some(
    f => f.key === key && (value == null || f.value === value.toLowerCase())
  )
}

export function addFilter(query: string, key: FilterKey, value: string): string {
  const token = `${key}:${value}`
  return query.trim() ? `${query.trim()} ${token}` : token
}

export function removeFilter(query: string, key: FilterKey, value?: string): string {
  const pattern = value
    ? new RegExp(`\\b${key}:${escRe(value)}(?=\\s|$)`, 'gi')
    : new RegExp(`\\b${key}:\\S+`, 'gi')
  return query.replace(pattern, '').replace(/\s+/g, ' ').trim()
}

export function toggleFilter(query: string, key: FilterKey, value: string): string {
  return hasFilter(query, key, value)
    ? removeFilter(query, key, value)
    : addFilter(query, key, value)
}

export function parseFilterDate(s: string): Date | null {
  if (/^\d{4}$/.test(s)) return new Date(`${s}-01-01T00:00:00`)
  if (/^\d{4}-\d{2}$/.test(s)) return new Date(`${s}-01T00:00:00`)
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return new Date(`${s}T00:00:00`)
  return null
}
