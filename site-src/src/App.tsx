import { usePosts } from './hooks/usePosts'
import { useUrlMap } from './hooks/useUrlMap'
import { useSearch } from './hooks/useSearch'
import { useHashSync } from './hooks/useCurrentPost'
import { Hero } from './components/Hero'
import { StatsTicker } from './components/StatsTicker'
import { ThreadNav } from './components/ThreadNav'
import { PostList } from './components/PostList'
import { ScrollBar } from './components/ScrollBar'
import { Footer } from './components/Footer'
import { StickyNavFooter } from './components/StickyNavFooter'
import { useState, useEffect, useRef, useCallback } from 'react'
import type { Stats } from './types'

interface VirtualizerInfo {
  scrollMargin: number
  getTotalSize: () => number
  scrollToIndex: (index: number) => void
}

function LoadingScreen() {
  return (
    <div className="min-h-[100dvh] bg-te-black flex flex-col items-center justify-center gap-6">
      <div
        className="font-display font-black text-te-muted uppercase leading-none tracking-tight"
        style={{ fontSize: 'clamp(4rem, 12vw, 10rem)' }}
      >
        LOADING
      </div>
      <div className="font-mono text-te-muted text-xs tracking-[0.3em] uppercase">
        fetching 846 posts...
      </div>
    </div>
  )
}

export function App() {
  const { posts, loading } = usePosts()
  const urlMap = useUrlMap()
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

  // Sync URL hash with scroll position
  useHashSync(posts, virtualizerInfo)

  if (loading) return <LoadingScreen />

  return (
    <>
      <Hero stats={stats} />
      <StatsTicker />

      {/* Thread nav (fixed, appears after hero scrolls off) */}
      <ThreadNav
        query={query}
        setQuery={setQuery}
        totalMatches={totalMatches}
        currentMatchIdx={currentMatchIdx}
        goNext={goNext}
        goPrev={goPrev}
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
          isEmpty={false}
          matchPostNums={matchPostNums}
          onVirtualizerReady={handleVirtualizerReady}
          onCurrentIndexChange={handleCurrentIndexChange}
        />
      </main>

      <Footer />
    </>
  )
}
