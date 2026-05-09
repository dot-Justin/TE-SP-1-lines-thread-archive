import { usePosts } from './hooks/usePosts'
import { useUrlMap } from './hooks/useUrlMap'
import { useSearch } from './hooks/useSearch'
import { Hero } from './components/Hero'
import { StatsTicker } from './components/StatsTicker'
import { ThreadNav } from './components/ThreadNav'
import { PostList } from './components/PostList'
import { Footer } from './components/Footer'
import { useState, useEffect } from 'react'
import type { Stats } from './types'

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

// Thread-closed warning banner (post 1 has staff note in cooked)
function ClosedBanner() {
  return (
    <div className="bg-te-orange px-4 md:px-8 py-3">
      <div className="max-w-5xl mx-auto flex items-center gap-3">
        <span className="font-mono text-te-black text-[0.6rem] tracking-[0.2em] uppercase font-medium">
          Thread closed
        </span>
        <span className="font-mono text-te-black/60 text-[0.6rem]">&mdash;</span>
        <span className="font-body text-te-black text-xs">
          Ongoing discussion at{' '}
          <a
            href="https://discord.gg/y4V6VfHYck"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-medium hover:opacity-70 transition-opacity"
          >
            discord.gg/y4V6VfHYck
          </a>
        </span>
      </div>
    </div>
  )
}

export function App() {
  const { posts, loading } = usePosts()
  const urlMap = useUrlMap()
  const { query, setQuery, topicFilter, setTopicFilter, filtered } = useSearch(posts)
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    fetch('/metadata/stats.json')
      .then(r => r.json())
      .then(setStats)
      .catch(() => {})
  }, [])

  if (loading) return <LoadingScreen />

  return (
    <>
      <Hero stats={stats} />
      <StatsTicker />

      {/* Thread closed banner */}
      <ClosedBanner />

      {/* Thread nav (fixed, appears after hero scrolls off) */}
      <ThreadNav
        query={query}
        setQuery={setQuery}
        topicFilter={topicFilter}
        setTopicFilter={setTopicFilter}
        filteredCount={filtered.length}
        totalCount={posts.length}
      />

      {/* Thread section */}
      <main id="thread" className="bg-te-black">
        {/* Thread header row */}
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 border-b border-te-border">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <div className="font-mono text-[0.6rem] text-te-muted tracking-[0.2em] uppercase mb-1">
                Thread
              </div>
              <h2 className="font-display font-black text-te-text text-4xl md:text-5xl uppercase leading-none tracking-tight">
                TE STEM PLAYER
              </h2>
              <p className="font-mono text-te-muted text-xs mt-2 tracking-wide">
                llllllll.co &middot; 846 posts &middot; April 2024 &ndash; May 2026
              </p>
            </div>
            {(query || topicFilter !== 'all') && (
              <div className="font-mono text-te-muted text-xs tracking-wide">
                showing <span className="text-te-orange">{filtered.length}</span> of {posts.length} posts
              </div>
            )}
          </div>
        </div>

        {/* Posts */}
        <PostList
          posts={filtered}
          urlMap={urlMap}
          isEmpty={filtered.length === 0}
        />
      </main>

      <Footer />
    </>
  )
}
