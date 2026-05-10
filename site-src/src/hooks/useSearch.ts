import { useState, useEffect, useMemo } from 'react'
import type { Post } from '../types'
import { parseQuery, parseFilterDate } from '../lib/searchParser'

const DEBOUNCE_MS = 150

// Pre-compiled content matchers for has: filters
const VIDEO_RE = /youtube-onebox|data-video-id|youtu\.be|vimeo\.com/i
const LINK_RE = /<a\s[^>]*href="https?:/i
const EMBED_RE = /class="[^"]*onebox/i
const QUOTE_RE = /<aside[^>]+class="quote/i
const CODE_RE = /<code[\s>]|<pre[\s>]/i
const MENTION_RE = /class="mention"/i

function matchesHas(cooked: string, images: number, attachments: number, value: string): boolean {
  switch (value) {
    case 'image':      return images > 0
    case 'video':      return VIDEO_RE.test(cooked)
    case 'link':       return LINK_RE.test(cooked)
    case 'file':
    case 'attachment': return attachments > 0
    case 'embed':      return EMBED_RE.test(cooked)
    case 'quote':      return QUOTE_RE.test(cooked)
    case 'code':       return CODE_RE.test(cooked)
    case 'mention':    return MENTION_RE.test(cooked)
    default:           return false
  }
}

function parseLikes(value: string): ((n: number) => boolean) | null {
  const m = value.match(/^(>=?|<=?|=)?(\d+)$/)
  if (!m) return null
  const op = m[1] || '>='
  const n = Number(m[2])
  if (op === '>')  return x => x > n
  if (op === '>=') return x => x >= n
  if (op === '<')  return x => x < n
  if (op === '<=') return x => x <= n
  return x => x === n
}

export function useSearch(posts: Post[]) {
  const [query, setQueryRaw] = useState(
    () => new URLSearchParams(window.location.search).get('q') ?? ''
  )

  const setQuery = (q: string) => {
    setQueryRaw(q)
    const params = new URLSearchParams(window.location.search)
    if (q) params.set('q', q)
    else params.delete('q')
    const search = params.toString()
    history.replaceState(null, '', search ? `?${search}${window.location.hash}` : window.location.pathname + window.location.hash)
  }
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [currentMatchIdx, setCurrentMatchIdx] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), DEBOUNCE_MS)
    return () => clearTimeout(t)
  }, [query])

  useEffect(() => { setCurrentMatchIdx(0) }, [debouncedQuery])

  const matchIndices = useMemo(() => {
    const q = debouncedQuery.trim()
    if (!q) return []

    const parsed = parseQuery(q)

    if (parsed.isDirectPost) {
      const idx = posts.findIndex(p => p.num === parsed.directPostNum)
      return idx === -1 ? [] : [idx]
    }

    // Nothing to filter on
    if (!parsed.text && parsed.filters.length === 0) return []

    return posts.reduce((acc, p, i) => {
      // Plain text match
      if (parsed.text) {
        const ql = parsed.text.toLowerCase()
        const textContent = p.cooked.replace(/<[^>]+>/g, ' ').toLowerCase()
        if (!p.author.toLowerCase().includes(ql) && !textContent.includes(ql)) return acc
      }

      // Structured filters — all must pass (AND logic)
      for (const f of parsed.filters) {
        switch (f.key) {
          case 'from':
            if (!p.author.toLowerCase().includes(f.value)) return acc
            break

          case 'mentions': {
            // Posts that @mention a user in their cooked HTML
            const mentionPattern = new RegExp(`class="mention"[^>]*href="/u/${f.value}`, 'i')
            if (!mentionPattern.test(p.cooked)) return acc
            break
          }

          case 'has':
            if (!matchesHas(p.cooked, p.images ?? 0, p.attachments ?? 0, f.value)) return acc
            break

          case 'after': {
            const d = parseFilterDate(f.value)
            if (!d || new Date(p.date) < d) return acc
            break
          }

          case 'before': {
            const d = parseFilterDate(f.value)
            if (!d || new Date(p.date) >= d) return acc
            break
          }

          case 'likes': {
            const test = parseLikes(f.value)
            if (!test || !test(p.likes)) return acc
            break
          }

          case 'num': {
            const n = parseInt(f.value, 10)
            if (isNaN(n) || p.num !== n) return acc
            break
          }
        }
      }

      acc.push(i)
      return acc
    }, [] as number[])
  }, [posts, debouncedQuery])

  const matchPostNums = useMemo(
    () => new Set(matchIndices.map(i => posts[i]?.num).filter(Boolean)),
    [matchIndices, posts]
  )

  const goNext = () => setCurrentMatchIdx(i => (i + 1) % Math.max(1, matchIndices.length))
  const goPrev = () => setCurrentMatchIdx(i => (i - 1 + matchIndices.length) % Math.max(1, matchIndices.length))

  return { query, setQuery, matchIndices, matchPostNums, currentMatchIdx, goNext, goPrev, totalMatches: matchIndices.length }
}
