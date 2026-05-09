import { useEffect, useState, useRef } from 'react'
import { MagnifyingGlass, X } from '@phosphor-icons/react'
import type { TopicFilter } from '../types'

const TOPICS: { id: TopicFilter; label: string }[] = [
  { id: 'all',                label: 'ALL' },
  { id: 'hardware',           label: 'HARDWARE' },
  { id: 'audio',              label: 'AUDIO' },
  { id: 'firmware',           label: 'FIRMWARE' },
  { id: 'bootloader',         label: 'BOOTLOADER' },
  { id: 'reverse_engineering',label: 'RE' },
]

interface ThreadNavProps {
  query: string
  setQuery: (q: string) => void
  topicFilter: TopicFilter
  setTopicFilter: (t: TopicFilter) => void
  filteredCount: number
  totalCount: number
}

export function ThreadNav({
  query,
  setQuery,
  topicFilter,
  setTopicFilter,
  filteredCount,
  totalCount,
}: ThreadNavProps) {
  const [visible, setVisible] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Show nav after hero scrolls off
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    )
    const heroEl = document.getElementById('hero-sentinel')
    if (heroEl) observer.observe(heroEl)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="bg-te-black/95 backdrop-blur-md border-b border-te-border">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          {/* Top row */}
          <div className="flex items-center gap-4 py-3">
            {/* Title */}
            <span className="font-display font-black text-te-text text-xl md:text-2xl tracking-tight uppercase leading-none flex-shrink-0">
              STEM PLAYER
            </span>

            {/* Search */}
            <div className="flex-1 relative max-w-xs ml-auto">
              <MagnifyingGlass
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-te-muted pointer-events-none"
              />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="search posts..."
                className="w-full bg-te-surface border border-te-border text-te-text font-mono text-xs pl-8 pr-8 py-2 rounded focus:outline-none focus:border-te-orange placeholder:text-te-muted transition-colors"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-te-muted hover:text-te-text"
                  aria-label="Clear search"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Count */}
            <span className="font-mono text-[0.6rem] text-te-muted tracking-wider flex-shrink-0 hidden md:block">
              {filteredCount}/{totalCount}
            </span>
          </div>

          {/* Topic filters */}
          <div className="flex gap-1 pb-2 overflow-x-auto scrollbar-none">
            {TOPICS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setTopicFilter(id)}
                className={`flex-shrink-0 font-mono text-[0.6rem] tracking-[0.15em] px-3 py-1.5 rounded transition-all duration-150 ${
                  topicFilter === id
                    ? 'bg-te-orange text-te-black'
                    : 'text-te-muted hover:text-te-text border border-te-border hover:border-te-muted'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
