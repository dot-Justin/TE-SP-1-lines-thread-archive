import { useState, useEffect, useMemo } from 'react'
import type { Post } from '../types'

const DEBOUNCE_MS = 200

export function useSearch(posts: Post[]) {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [currentMatchIdx, setCurrentMatchIdx] = useState(0)

  // Debounce search query
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), DEBOUNCE_MS)
    return () => clearTimeout(t)
  }, [query])

  // Reset focused match index when query changes
  useEffect(() => {
    setCurrentMatchIdx(0)
  }, [debouncedQuery])

  // Compute indices of matching posts
  const matchIndices = useMemo(() => {
    const q = debouncedQuery.trim()
    if (!q) return []

    // Direct post number jump: #NNN
    const directMatch = q.match(/^#(\d+)$/)
    if (directMatch) {
      const targetNum = Number(directMatch[1])
      const idx = posts.findIndex(p => p.num === targetNum)
      return idx === -1 ? [] : [idx]
    }

    const ql = q.toLowerCase()
    return posts.reduce((acc, p, i) => {
      if (
        p.author.toLowerCase().includes(ql) ||
        p.cooked.replace(/<[^>]+>/g, ' ').toLowerCase().includes(ql)
      ) {
        acc.push(i)
      }
      return acc
    }, [] as number[])
  }, [posts, debouncedQuery])

  // Set of matching post.num values for O(1) per-card lookup
  const matchPostNums = useMemo(
    () => new Set(matchIndices.map(i => posts[i]?.num).filter(Boolean)),
    [matchIndices, posts]
  )

  const goNext = () =>
    setCurrentMatchIdx(i => (i + 1) % Math.max(1, matchIndices.length))

  const goPrev = () =>
    setCurrentMatchIdx(i =>
      (i - 1 + matchIndices.length) % Math.max(1, matchIndices.length)
    )

  return {
    query,
    setQuery,
    matchIndices,
    matchPostNums,
    currentMatchIdx,
    goNext,
    goPrev,
    totalMatches: matchIndices.length,
  }
}
