import { useState, useEffect } from 'react'
import type { Post } from '../types'

interface UsePostsResult {
  posts: Post[]
  loading: boolean
  error: string | null
}

export function usePosts(): UsePostsResult {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/data/posts.json')
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((data: { posts: Post[] } | Post[]) => {
        // posts.json wraps the array: { posts: [...] }
        const arr = Array.isArray(data) ? data : data.posts
        setPosts(arr)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return { posts, loading, error }
}
