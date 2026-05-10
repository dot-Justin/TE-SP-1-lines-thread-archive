import { useEffect, useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MagnifyingGlass, X, ArrowUp, ArrowDown, CaretDown, CaretUp } from '@phosphor-icons/react'
import { SearchBuilder } from './SearchBuilder'
import type { Post } from '../types'

// te-black: #131210 — used for concave corner decorations
const TE_BLACK = '#131210'

interface ThreadNavProps {
  query: string
  setQuery: (q: string) => void
  totalMatches: number
  currentMatchIdx: number
  goNext: () => void
  goPrev: () => void
  posts: Post[]
}

/** Concave corner tab effect.
 *
 * Two te-black rectangles with a single rounded corner are placed on either
 * side of the pull handle. Since they're the page background color they
 * visually "carve" concave arcs into the header–handle junction — matching
 * the reference image morphing effect.
 *
 * The handle itself has the same backdrop-blur/bg as the nav bar so the
 * three pieces read as one connected floating shape.
 */
function PullHandle({ onClick }: { onClick: () => void }) {
  return (
    <div className="relative">
      {/* Left concave corner: page-bg rect with border-bottom-right-radius */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-full"
        style={{
          width: 18,
          height: 18,
          background: TE_BLACK,
          borderBottomRightRadius: 16,
        }}
      />

      <motion.button
        onClick={onClick}
        className="flex items-center gap-1.5 bg-te-black/95 backdrop-blur-md px-5 py-1.5 rounded-b-xl transition-colors hover:bg-te-surface/60 select-none"
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.1 }}
      >
        <CaretDown size={9} className="text-te-muted/70" />
        <span className="font-mono text-[0.5rem] text-te-muted/60 tracking-[0.2em] uppercase">
          filters
        </span>
      </motion.button>

      {/* Right concave corner: page-bg rect with border-bottom-left-radius */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-full"
        style={{
          width: 18,
          height: 18,
          background: TE_BLACK,
          borderBottomLeftRadius: 16,
        }}
      />
    </div>
  )
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
  // Once the builder has been opened, show the pull handle when closed
  const [builderTouched, setBuilderTouched] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const navRef = useRef<HTMLDivElement>(null)

  const openBuilder = () => {
    setBuilderOpen(true)
    setBuilderTouched(true)
  }

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

  // Ctrl+F / Cmd+F → focus our search bar
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault()
        setVisible(true)
        openBuilder()
        requestAnimationFrame(() => inputRef.current?.focus())
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
      {/* ── Nav bar ── */}
      <div className="bg-te-black/95 backdrop-blur-md border-b border-te-border relative">
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
                placeholder="search by text, or by post #"
                aria-label="Search posts"
                className={`w-full bg-te-surface border text-te-text font-mono text-xs pl-8 pr-8 py-2 rounded focus:outline-none placeholder:text-te-muted transition-colors ${
                  builderOpen ? 'border-te-orange/50' : 'border-te-border focus:border-te-orange'
                }`}
                onFocus={openBuilder}
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

        {/* ── Builder drawer (slides down) ── */}
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
              className="border-t border-te-border/50"
            >
              <SearchBuilder
                query={query}
                setQuery={setQuery}
                posts={posts}
                inputRef={inputRef}
              />

              {/* Collapse button */}
              <div className="flex justify-center pb-3 pt-0">
                <button
                  onMouseDown={e => e.preventDefault()}
                  onClick={closeBuilder}
                  className="inline-flex items-center gap-1 font-mono text-[0.5rem] text-te-muted/40 hover:text-te-muted/70 tracking-[0.2em] uppercase transition-colors"
                >
                  <CaretUp size={8} />
                  collapse
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Pull handle (morphing tab with concave corners) ── */}
        <AnimatePresence>
          {builderTouched && !builderOpen && (
            <motion.div
              key="pull-handle"
              className="absolute left-1/2 -translate-x-1/2 top-full z-[55]"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              <PullHandle onClick={openBuilder} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
