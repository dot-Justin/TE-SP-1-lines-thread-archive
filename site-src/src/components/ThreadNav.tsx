import { useEffect, useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MagnifyingGlass, X, ArrowUp, ArrowDown, Funnel } from '@phosphor-icons/react'
import { SearchBuilder } from './SearchBuilder'
import type { Post } from '../types'

interface ThreadNavProps {
  query: string
  setQuery: (q: string) => void
  totalMatches: number
  currentMatchIdx: number
  goNext: () => void
  goPrev: () => void
  posts: Post[]
}


export function ThreadNav({
  query,
  setQuery,
  totalMatches,
  currentMatchIdx,
  goNext,
  goPrev,
  posts,
}: ThreadNavProps) {
  const [visible, setVisible] = useState(false)
  const [builderOpen, setBuilderOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const navRef = useRef<HTMLDivElement>(null)

  const openBuilder = () => setBuilderOpen(true)
  const closeBuilder = () => setBuilderOpen(false)

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

  // Ctrl+F / Cmd+F → focus search bar and open builder
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault()
        setVisible(true)
        openBuilder()
        requestAnimationFrame(() => inputRef.current?.focus())
      }
      if (e.key === 'Escape') {
        closeBuilder()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  // Close builder on click outside nav
  useEffect(() => {
    if (!builderOpen) return
    const handle = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        closeBuilder()
      }
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [builderOpen])

  const hasQuery = query.trim().length > 0

  return (
    <div
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {/* ── Single glass pane: nav bar + optional drawer ── */}
      <div className="bg-te-black/95 backdrop-blur-md border-b border-te-border">
        {/* Nav bar row */}
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="flex items-center gap-3 py-3">
            {/* Logo / title */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <img src="/sp-01.svg" alt="" aria-hidden className="h-7 w-auto opacity-75" />
              <span className="font-display font-black text-te-text text-xl md:text-2xl tracking-tight uppercase leading-none">
                SP-1
              </span>
            </div>

            {/* Search input */}
            <div className="flex-1 relative max-w-xs ml-auto">
              <MagnifyingGlass
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-te-muted pointer-events-none"
              />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="search all posts"
                aria-label="Search posts"
                className={`w-full bg-te-surface border text-te-text font-mono text-xs pl-8 pr-8 py-2 rounded focus:outline-none placeholder:text-te-muted transition-colors ${
                  builderOpen ? 'border-te-orange/50' : 'border-te-border focus:border-te-orange'
                }`}
                onKeyDown={e => {
                  if (e.key === 'Escape') {
                    if (query) {
                      setQuery('')
                    } else {
                      closeBuilder()
                      inputRef.current?.blur()
                    }
                  }
                  if (e.key === 'Enter') closeBuilder()
                }}
              />
              {query && (
                <button
                  onClick={() => { setQuery(''); inputRef.current?.focus() }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-te-muted hover:text-te-text transition-colors"
                  aria-label="Clear search"
                >
                  <X size={12} />
                </button>
              )}

            </div>

            {/* Filter icon button */}
            <button
              onMouseDown={e => e.preventDefault()}
              onClick={builderOpen ? closeBuilder : openBuilder}
              className={`flex-shrink-0 transition-colors ${
                builderOpen ? 'text-te-orange' : 'text-te-muted hover:text-te-text'
              }`}
              aria-label="Toggle filter builder"
            >
              <Funnel size={15} weight={builderOpen ? 'fill' : 'regular'} />
            </button>

            {/* Match navigation */}
            {hasQuery && totalMatches > 0 && (
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={goPrev}
                  className="text-te-muted hover:text-te-orange transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Previous match"
                >
                  <ArrowUp size={12} />
                </button>
                <span className="font-mono text-[0.55rem] text-te-muted tracking-wide whitespace-nowrap">
                  {currentMatchIdx + 1}/{totalMatches}
                </span>
                <button
                  onClick={goNext}
                  className="text-te-muted hover:text-te-orange transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Next match"
                >
                  <ArrowDown size={12} />
                </button>
              </div>
            )}

            {hasQuery && totalMatches === 0 && (
              <span className="font-mono text-[0.55rem] text-te-muted tracking-wide flex-shrink-0">
                no matches
              </span>
            )}
          </div>
        </div>

        {/* ── Builder drawer (seamless, same glass pane) ── */}
        <AnimatePresence>
          {builderOpen && (
            <motion.div
              key="drawer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.2 },
              }}
              style={{ overflow: 'hidden' }}
            >
              <SearchBuilder
                query={query}
                setQuery={setQuery}
                posts={posts}
                inputRef={inputRef}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  )
}
