import { useEffect, useRef } from 'react'
import type { Post } from '../types'

interface VirtualizerInfo {
  scrollMargin: number
  getTotalSize: () => number
}

// Debounced scroll → hash update + returns a function to handle initial hash jump
export function useHashSync(
  posts: Post[],
  virtualizerInfo: VirtualizerInfo | null
): void {
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Sync URL hash as user scrolls
  useEffect(() => {
    if (!virtualizerInfo || posts.length === 0) return

    const onScroll = () => {
      const { scrollMargin, getTotalSize } = virtualizerInfo
      const scrollable = Math.max(1, getTotalSize() - window.innerHeight)
      const raw = (window.scrollY - scrollMargin) / scrollable
      const fraction = Math.max(0, Math.min(1, raw))
      const index = Math.min(Math.floor(fraction * posts.length), posts.length - 1)
      const post = posts[Math.max(0, index)]
      if (!post) return

      if (debounceTimer.current) clearTimeout(debounceTimer.current)
      debounceTimer.current = setTimeout(() => {
        const newHash = `#${post.num}`
        if (window.location.hash !== newHash) {
          history.replaceState(null, '', newHash)
        }
      }, 300)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
    }
  }, [virtualizerInfo, posts])

  // On mount: if there's a #post-NNN hash, jump there
  useEffect(() => {
    if (!virtualizerInfo || posts.length === 0) return
    const hash = window.location.hash
    const match = hash.match(/^#(\d+)$/)
    if (!match) return

    const targetNum = Number(match[1])
    const index = posts.findIndex(p => p.num === targetNum)
    if (index === -1) return

    const { scrollMargin, getTotalSize } = virtualizerInfo
    const fraction = index / Math.max(1, posts.length - 1)
    const target = scrollMargin + fraction * Math.max(0, getTotalSize() - window.innerHeight)
    window.scrollTo({ top: target })
  }, [virtualizerInfo, posts])
}
