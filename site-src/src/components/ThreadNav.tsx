import { useEffect, useState, useRef } from 'react'
import { MagnifyingGlass, X, ArrowUp, ArrowDown } from '@phosphor-icons/react'

interface ThreadNavProps {
  query: string
  setQuery: (q: string) => void
  totalMatches: number
  currentMatchIdx: number
  goNext: () => void
  goPrev: () => void
}

export function ThreadNav({
  query,
  setQuery,
  totalMatches,
  currentMatchIdx,
  goNext,
  goPrev,
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

  const hasQuery = query.trim().length > 0

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="bg-te-black/95 backdrop-blur-md border-b border-te-border">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="flex items-center gap-3 py-3">
            {/* Title */}
            <span className="font-display font-black text-te-text text-xl md:text-2xl tracking-tight uppercase leading-none flex-shrink-0">
              SP-1
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

            {/* Match navigation — shown when query is active */}
            {hasQuery && totalMatches > 0 && (
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={goPrev}
                  className="text-te-muted hover:text-te-orange transition-colors p-1"
                  aria-label="Previous match"
                >
                  <ArrowUp size={12} />
                </button>
                <span className="font-mono text-[0.55rem] text-te-muted tracking-wide whitespace-nowrap">
                  {currentMatchIdx + 1}/{totalMatches}
                </span>
                <button
                  onClick={goNext}
                  className="text-te-muted hover:text-te-orange transition-colors p-1"
                  aria-label="Next match"
                >
                  <ArrowDown size={12} />
                </button>
              </div>
            )}

            {/* No results indicator */}
            {hasQuery && totalMatches === 0 && (
              <span className="font-mono text-[0.55rem] text-te-muted tracking-wide flex-shrink-0">
                no matches
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
