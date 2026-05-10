import { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import type { Post } from '../types'
import { MILESTONES } from '../lib/milestones'

interface VirtualizerInfo {
  scrollMargin: number
  getTotalSize: () => number
  scrollToIndex: (index: number) => void
  getItemOffset: (index: number) => number
}

interface ScrollBarProps {
  posts: Post[]
  virtualizerInfo: VirtualizerInfo | null
  currentIndex: number
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export function ScrollBar({ posts, virtualizerInfo, currentIndex }: ScrollBarProps) {
  const [visible, setVisible] = useState(false)
  const [fraction, setFraction] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [hovering, setHovering] = useState(false)
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

  const currentPost = posts[Math.max(0, Math.min(currentIndex, posts.length - 1))]

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
    const onUp = () => {
      setIsDragging(false)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [jumpToFraction, getFractionFromPointer])

  // Milestone ticks — positioned by post index fraction (reliable, ~accurate)
  const milestoneTicks = useMemo(() => {
    if (posts.length === 0) return []
    return Object.keys(MILESTONES).map(numStr => {
      const num = Number(numStr)
      const idx = posts.findIndex(p => p.num === num)
      if (idx === -1) return null
      return {
        fraction: idx / Math.max(1, posts.length - 1),
        label: MILESTONES[num].label,
        num,
        idx,
      }
    }).filter(Boolean) as { fraction: number; label: string; num: number; idx: number }[]
  }, [posts])

  if (posts.length === 0) return null

  const thumbPct = fraction * 100

  return (
    <>
      {/* Mobile: thin orange reading-progress bar — purely visual */}
      <div className="md:hidden fixed right-0 top-0 h-full w-[3px] z-40 pointer-events-none">
        <div
          className="w-full bg-te-orange/70 transition-none"
          style={{ height: `${fraction * 100}%` }}
        />
        {/* Milestone dots — purely visual */}
        {milestoneTicks.map(tick => (
          <div
            key={tick.num}
            className="absolute w-[7px] h-[7px] rounded-full bg-te-orange border border-te-black"
            style={{ top: `${tick.fraction * 100}%`, right: 0, transform: 'translateY(-50%)' }}
          />
        ))}
      </div>

      {/* Desktop: styled interactive scrollbar */}
      {visible && (
        <div
          className="hidden md:flex fixed right-2 md:right-3 top-1/2 -translate-y-1/2 z-40 flex-col items-center select-none"
          style={{ height: '60vh' }}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {/* Track */}
          <div
            ref={trackRef}
            className="relative flex-1 w-[2px] bg-te-border cursor-pointer"
            onClick={onTrackClick}
          >
            {/* Filled portion */}
            <div
              className="absolute top-0 left-0 w-full bg-te-orange/25 transition-none"
              style={{ height: `${thumbPct}%` }}
            />

            {/* Milestone ticks — larger hit area, small visual dot */}
            {milestoneTicks.map(tick => (
              <div
                key={tick.num}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                style={{ top: `${tick.fraction * 100}%` }}
                onClick={(e) => { e.stopPropagation(); virtualizerInfo?.scrollToIndex(tick.idx) }}
              >
                {/* Enlarged invisible hit area */}
                <div className="absolute -inset-2" />
                <div className="w-[5px] h-[5px] rounded-full bg-te-orange/60 group-hover:bg-te-orange transition-colors" />
                {/* Tooltip on hover */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  <span className="font-mono text-[0.45rem] text-te-orange tracking-wide bg-te-black border border-te-border px-1.5 py-0.5 rounded">
                    {tick.label}
                  </span>
                </div>
              </div>
            ))}

            {/* Thumb — horizontal notch with enlarged grab area */}
            <div
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing group"
              style={{ top: `${thumbPct}%` }}
              onMouseDown={onThumbMouseDown}
              onClick={e => e.stopPropagation()}
            >
              {/* Enlarged invisible grab area */}
              <div className="absolute -inset-x-3 -inset-y-2" />
              {/* Notch bar */}
              <div
                className={`w-3 h-[2px] bg-te-orange transition-all ${isDragging ? 'w-4' : ''}`}
              />

              {/* Floating label — appears on hover or drag */}
              {(hovering || isDragging) && currentPost && (
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none whitespace-nowrap">
                  <div className="flex items-baseline gap-1.5 bg-te-black border border-te-border px-2 py-1 rounded">
                    <span className="font-mono text-[0.5rem] text-te-orange tracking-widest leading-none">
                      #{currentPost.num}
                    </span>
                    <span className="font-mono text-[0.45rem] text-te-muted leading-none">
                      {formatDate(currentPost.date)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
