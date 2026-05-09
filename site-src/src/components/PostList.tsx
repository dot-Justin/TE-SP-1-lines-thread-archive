import { useRef, useState, useLayoutEffect } from 'react'
import { useWindowVirtualizer } from '@tanstack/react-virtual'
import { PostCard } from './PostCard'
import type { Post } from '../types'

interface PostListProps {
  posts: Post[]
  urlMap: Record<string, string>
  isEmpty: boolean
}

export function PostList({ posts, urlMap, isEmpty }: PostListProps) {
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
              <PostCard post={post} urlMap={urlMap} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
