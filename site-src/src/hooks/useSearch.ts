import { useState, useEffect, useMemo } from 'react'
import type { Post, TopicFilter } from '../types'

const DEBOUNCE_MS = 200

export function useSearch(posts: Post[]) {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [topicFilter, setTopicFilter] = useState<TopicFilter>('all')
  const [topicPostNums, setTopicPostNums] = useState<Set<number> | null>(null)

  // Debounce search query
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), DEBOUNCE_MS)
    return () => clearTimeout(t)
  }, [query])

  // Load topic index when a specific topic is selected
  useEffect(() => {
    if (topicFilter === 'all') {
      setTopicPostNums(null)
      return
    }
    // topic-index.json is in docs/indexes/ alongside post-index.json
    fetch('/indexes/topic-index.json')
      .then(r => r.json())
      .then((data: Record<string, number[]>) => {
        const nums = data[topicFilter]
        setTopicPostNums(nums ? new Set(nums) : null)
      })
      .catch(() => setTopicPostNums(null))
  }, [topicFilter])

  const filtered = useMemo(() => {
    let result = posts

    // Topic filter
    if (topicFilter !== 'all' && topicPostNums !== null) {
      result = result.filter(p => topicPostNums.has(p.num))
    }

    // Text search on author and stripped post body
    const q = debouncedQuery.trim().toLowerCase()
    if (q) {
      result = result.filter(p =>
        p.author.toLowerCase().includes(q) ||
        // Strip HTML tags for text search
        p.cooked.replace(/<[^>]+>/g, ' ').toLowerCase().includes(q)
      )
    }

    return result
  }, [posts, debouncedQuery, topicFilter, topicPostNums])

  return {
    query,
    setQuery,
    topicFilter,
    setTopicFilter,
    filtered,
  }
}
