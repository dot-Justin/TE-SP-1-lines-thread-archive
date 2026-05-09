import { useRef, useState, useLayoutEffect, useEffect } from 'react'
import { useWindowVirtualizer } from '@tanstack/react-virtual'
import { PostCard } from './PostCard'
import type { Post } from '../types'

interface VirtualizerInfo {
  scrollMargin: number
  getTotalSize: () => number
  scrollToIndex: (index: number) => void
}

interface PostListProps {
  posts: Post[]
  urlMap: Record<string, string>
  isEmpty: boolean
  matchPostNums?: Set<number>
  onVirtualizerReady?: (info: VirtualizerInfo) => void
  onCurrentIndexChange?: (index: number) => void
}

export function PostList({ posts, urlMap, isEmpty, matchPostNums, onVirtualizerReady, onCurrentIndexChange }: PostListProps) {
  const listRef = useRef<HTMLDivElement>(null)
  const [scrollMargin, setScrollMargin] = useState(0)

  // Measure offset after layout so virtualizer knows where the list starts
  useLayoutEffect(() => {
    if (listRef.current) {
      setScrollMargin(listRef.current.offsetTop)
    }
  }, [])

  const virtualizer = useWindowVirtualizer({
    count: posts.length,
    estimateSize: () => 500,
    overscan: 4,
    scrollMargin,
  })

  // Notify parent when virtualizer is ready
  useEffect(() => {
    if (scrollMargin > 0 && onVirtualizerReady) {
      onVirtualizerReady({
        scrollMargin,
        getTotalSize: () => virtualizer.getTotalSize(),
        scrollToIndex: (index: number) => virtualizer.scrollToIndex(index, { align: 'start' }),
      })
    }
  }, [scrollMargin, onVirtualizerReady, virtualizer])

  // Track topmost visible item using actual rendered positions
  useEffect(() => {
    if (!onCurrentIndexChange || scrollMargin === 0) return
    const onScroll = () => {
      const viewTop = window.scrollY - scrollMargin
      const rendered = virtualizer.getVirtualItems()
      // Find the last item whose start is at or above the current scroll position
      let best = rendered[0]
      for (const item of rendered) {
        if (item.start <= viewTop + 1) best = item
        else break
      }
      if (best) onCurrentIndexChange(best.index)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [scrollMargin, onCurrentIndexChange, virtualizer])

  const items = virtualizer.getVirtualItems()

  if (isEmpty) {
    return (
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-24 text-center">
        <div
          className="font-display font-black text-te-muted uppercase leading-none mb-4"
          style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
        >
          NO RESULTS
        </div>
        <p className="font-mono text-te-muted text-sm tracking-wide">
          no posts match your search
        </p>
      </div>
    )
  }

  return (
    <div ref={listRef}>
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {items.map(item => {
          const post = posts[item.index]
          return (
            <div
              key={item.key}
              data-index={item.index}
              ref={virtualizer.measureElement}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${item.start - virtualizer.options.scrollMargin}px)`,
              }}
            >
              <PostCard post={post} urlMap={urlMap} isMatch={matchPostNums?.has(post.num) ?? false} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
