import { usePosts } from './hooks/usePosts'
import { useUrlMap } from './hooks/useUrlMap'
import { useAvatarMap } from './hooks/useAvatarMap'
import { useSearch } from './hooks/useSearch'
import { useHashSync } from './hooks/useCurrentPost'
import { Hero } from './components/Hero'
import { StatsTicker } from './components/StatsTicker'
import { ThreadNav } from './components/ThreadNav'
import { PostList } from './components/PostList'
import { ScrollBar } from './components/ScrollBar'
import { Footer } from './components/Footer'
import { StickyNavFooter } from './components/StickyNavFooter'
import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Stats, Post } from './types'

interface VirtualizerInfo {
  scrollMargin: number
  getTotalSize: () => number
  scrollToIndex: (index: number) => void
}

function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-te-black flex flex-col items-center justify-center gap-6"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        y: -10,
        filter: 'blur(10px)',
        transition: { duration: 0.52, ease: [0.64, 0, 0.78, 0] },
      }}
    >
      <div
        className="font-display font-black text-te-muted uppercase leading-none tracking-tight"
        style={{ fontSize: 'clamp(4rem, 12vw, 10rem)' }}
      >
        LOADING
      </div>
      <div className="font-mono text-te-muted text-xs tracking-[0.3em] uppercase">
        fetching 846 posts...
      </div>
    </motion.div>
  )
}

const MIN_LOADER_MS = 500

export function App() {
  const { posts, loading } = usePosts()
  const urlMap = useUrlMap()
  const avatarMap = useAvatarMap()

  const replyIndex = useMemo(() => {
    const idx = new Map<number, number[]>()
    for (const p of posts) {
      if (p.reply_to !== null) {
        const arr = idx.get(p.reply_to) ?? []
        arr.push(p.num)
        idx.set(p.reply_to, arr)
      }
    }
    return idx
  }, [posts])

  const postMap = useMemo(() => {
    const m = new Map<number, Post>()
    for (const p of posts) m.set(p.num, p)
    return m
  }, [posts])

  const loadStartRef = useRef(Date.now())
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    if (!loading) {
      const elapsed = Date.now() - loadStartRef.current
      const remaining = Math.max(0, MIN_LOADER_MS - elapsed)
      const timer = setTimeout(() => setShowLoader(false), remaining)
      return () => clearTimeout(timer)
    }
  }, [loading])

  const {
    query, setQuery,
    matchIndices, matchPostNums,
    currentMatchIdx, goNext, goPrev,
    totalMatches,
  } = useSearch(posts)
  const [stats, setStats] = useState<Stats | null>(null)
  const [virtualizerInfo, setVirtualizerInfo] = useState<VirtualizerInfo | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const virtualizerInfoRef = useRef<VirtualizerInfo | null>(null)

  useEffect(() => {
    fetch('/metadata/stats.json')
      .then(r => r.json())
      .then(setStats)
      .catch(() => {})
  }, [])

  const handleVirtualizerReady = useCallback((info: VirtualizerInfo) => {
    virtualizerInfoRef.current = info
    setVirtualizerInfo(info)
  }, [])

  const handleCurrentIndexChange = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  // Jump to the focused match whenever currentMatchIdx changes
  useEffect(() => {
    if (matchIndices.length === 0 || !virtualizerInfo) return
    virtualizerInfo.scrollToIndex(matchIndices[currentMatchIdx])
  }, [currentMatchIdx, matchIndices, virtualizerInfo])

  // Ticker navigation: resolve post num → virtualizer index
  const handleTickerNavigate = useCallback((postNum: number) => {
    const info = virtualizerInfoRef.current
    if (!info) return
    const idx = posts.findIndex(p => p.num === postNum)
    if (idx !== -1) info.scrollToIndex(idx)
  }, [posts])

  // Sync URL hash with scroll position
  useHashSync(posts, virtualizerInfo)

  return (
    <>
      <AnimatePresence>{showLoader && <LoadingScreen />}</AnimatePresence>
      <Hero stats={stats} />
      <StatsTicker onNavigate={handleTickerNavigate} />

      {/* Thread nav (fixed, appears after hero scrolls off) */}
      <ThreadNav
        query={query}
        setQuery={setQuery}
        totalMatches={totalMatches}
        currentMatchIdx={currentMatchIdx}
        goNext={goNext}
        goPrev={goPrev}
        posts={posts}
      />

      {/* Timeline scrollbar (fixed right edge) */}
      <ScrollBar posts={posts} virtualizerInfo={virtualizerInfo} currentIndex={currentIndex} />

      {/* Sticky bottom nav with external links */}
      <StickyNavFooter />

      {/* Thread section */}
      <main id="thread" className="bg-te-black">
        {/* Posts — always show full list, highlights matches */}
        <PostList
          posts={posts}
          urlMap={urlMap}
          avatarMap={avatarMap}
          replyIndex={replyIndex}
          postMap={postMap}
          isEmpty={false}
          matchPostNums={matchPostNums}
          onVirtualizerReady={handleVirtualizerReady}
          onCurrentIndexChange={handleCurrentIndexChange}
          onNavigateToPost={handleTickerNavigate}
        />
      </main>

      <Footer />
    </>
  )
}
