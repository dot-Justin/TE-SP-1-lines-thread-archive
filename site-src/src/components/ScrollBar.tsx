import { useEffect, useState, useRef, useCallback } from 'react'
import type { Post } from '../types'
import { MILESTONES } from '../lib/milestones'

interface VirtualizerInfo {
  scrollMargin: number
  getTotalSize: () => number
}

interface ScrollBarProps {
  posts: Post[]
  virtualizerInfo: VirtualizerInfo | null
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export function ScrollBar({ posts, virtualizerInfo }: ScrollBarProps) {
  const [visible, setVisible] = useState(false)
  const [fraction, setFraction] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  // Show after hero sentinel leaves viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    )
    const el = document.getElementById('hero-sentinel')
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Update fraction on scroll
  useEffect(() => {
    const onScroll = () => {
      if (!virtualizerInfo) return
      const { scrollMargin, getTotalSize } = virtualizerInfo
      const totalSize = getTotalSize()
      const scrollable = Math.max(1, totalSize - window.innerHeight)
      const raw = (window.scrollY - scrollMargin) / scrollable
      setFraction(Math.max(0, Math.min(1, raw)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [virtualizerInfo])

  // Compute current post from fraction
  const currentIndex = Math.min(
    Math.floor(fraction * posts.length),
    posts.length - 1
  )
  const currentPost = posts[Math.max(0, currentIndex)]

  // Jump on click/drag
  const jumpToFraction = useCallback((f: number) => {
    if (!virtualizerInfo) return
    const { scrollMargin, getTotalSize } = virtualizerInfo
    const target = scrollMargin + f * Math.max(0, getTotalSize() - window.innerHeight)
    window.scrollTo({ top: target })
  }, [virtualizerInfo])

  const getFractionFromPointer = useCallback((clientY: number): number => {
    if (!trackRef.current) return 0
    const rect = trackRef.current.getBoundingClientRect()
    return Math.max(0, Math.min(1, (clientY - rect.top) / rect.height))
  }, [])

  const onTrackClick = useCallback((e: React.MouseEvent) => {
    jumpToFraction(getFractionFromPointer(e.clientY))
  }, [jumpToFraction, getFractionFromPointer])

  const onThumbMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    const onMove = (me: MouseEvent) => jumpToFraction(getFractionFromPointer(me.clientY))
    const onUp = () => { setIsDragging(false); window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [jumpToFraction, getFractionFromPointer])

  // Milestone ticks — positions as fractions of the posts array
  const milestoneTicks = Object.keys(MILESTONES).map(numStr => {
    const num = Number(numStr)
    const idx = posts.findIndex(p => p.num === num)
    if (idx === -1) return null
    return {
      fraction: idx / Math.max(1, posts.length - 1),
      label: MILESTONES[num].label,
      num,
    }
  }).filter(Boolean) as { fraction: number; label: string; num: number }[]

  if (!visible || posts.length === 0) return null

  const thumbPct = fraction * 100

  return (
    <div
      className="fixed right-3 md:right-5 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-1.5 select-none"
      style={{ height: '60vh' }}
    >
      {/* Top date */}
      {posts.length > 0 && (
        <span className="font-mono text-[0.5rem] text-te-muted tracking-wide whitespace-nowrap">
          {formatDate(posts[0].date)}
        </span>
      )}

      {/* Track */}
      <div
        ref={trackRef}
        className="relative flex-1 w-[3px] bg-te-border rounded-full cursor-pointer"
        onClick={onTrackClick}
      >
        {/* Filled portion */}
        <div
          className="absolute top-0 left-0 w-full bg-te-orange/30 rounded-full transition-none"
          style={{ height: `${thumbPct}%` }}
        />

        {/* Milestone ticks */}
        {milestoneTicks.map(tick => (
          <div
            key={tick.num}
            className="absolute left-1/2 -translate-x-1/2 group"
            style={{ top: `${tick.fraction * 100}%` }}
            title={tick.label}
          >
            <div className="w-2 h-[2px] bg-te-orange rounded-full -translate-x-[2px]" />
            {/* Tooltip on hover */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              <span className="font-mono text-[0.5rem] text-te-orange tracking-wide bg-te-black border border-te-border px-2 py-1 rounded">
                {tick.label}
              </span>
            </div>
          </div>
        ))}

        {/* Thumb */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing ${isDragging ? 'scale-110' : ''}`}
          style={{ top: `${thumbPct}%` }}
          onMouseDown={onThumbMouseDown}
          onClick={e => e.stopPropagation()}
        >
          {/* Pill */}
          <div className="bg-te-black border border-te-orange/60 rounded px-2 py-1 flex flex-col items-center gap-0.5 hover:border-te-orange transition-colors shadow-sm">
            <span className="font-mono text-[0.5rem] text-te-orange tracking-widest leading-none">
              {currentPost ? String(currentPost.num).padStart(4, '0') : '----'}
            </span>
            {currentPost && (
              <span className="font-mono text-[0.45rem] text-te-muted leading-none whitespace-nowrap">
                {formatDate(currentPost.date)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom date */}
      {posts.length > 0 && (
        <span className="font-mono text-[0.5rem] text-te-muted tracking-wide whitespace-nowrap">
          {formatDate(posts[posts.length - 1].date)}
        </span>
      )}
    </div>
  )
}
