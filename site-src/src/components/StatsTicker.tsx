import { useEffect, useRef } from 'react'

interface TickerItem {
  text: string
  href?: string // scrolls to post anchor on click
}

const ITEMS: TickerItem[] = [
  { text: '846 POSTS' },
  { text: '0 ACKNOWLEDGEMENTS FROM TE' },
  { text: '"IMPOSSIBLE" SAID 10 TIMES' },
  { text: '66,726 WORDS WRITTEN' },
  { text: '97 POSTS WRITTEN BETWEEN MIDNIGHT AND 4AM' },
  { text: '179 CONTRIBUTORS' },
  { text: '98 DAYS OF SILENCE IN 2024', href: '#29' },
  { text: '78,451 VIEWS' },
  { text: '"FIRMWARE" MENTIONED 267 TIMES' },
  { text: '813 FILES SHARED' },
  { text: 'MOST ACTIVE DAY: FRIDAY' },
  { text: '87% OF POSTS RECEIVED LIKES' },
  { text: 'ONE POST EARNED 83 HEARTS', href: '#257' },
  { text: '86 MB OF DATA ARCHIVED' },
  { text: '156 POSTS IN A SINGLE MONTH' },
  { text: 'LONGEST POST: 902 WORDS', href: '#247' },
  { text: '574 CONVERSATIONS' },
  { text: '263 OF 846 POSTS HAD PHOTOS OR SCREENSHOTS' },
  { text: '4,967 LIKES' },
  { text: 'MOST LIKED USER: TIMK — 1,272 LIKES' },
  { text: '2 YEARS OF RESEARCH' },
]

const REPEATED = [...ITEMS, ...ITEMS]
const SPEED = 0.9 // px per frame at 60fps
const LERP = 0.07

function scrollToPost(href: string) {
  const id = href.replace('#', '')
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

export function StatsTicker() {
  const trackRef = useRef<HTMLDivElement>(null)
  const xRef = useRef(0)
  const speedRef = useRef(0)
  const hoveringRef = useRef(false)
  const halfWidthRef = useRef(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const track = trackRef.current
    if (!track) return

    const tick = () => {
      // Lazily compute half-width after layout
      if (halfWidthRef.current === 0 && track.scrollWidth > 0) {
        halfWidthRef.current = track.scrollWidth / 2
      }

      const target = hoveringRef.current ? 0 : SPEED
      speedRef.current += (target - speedRef.current) * LERP

      xRef.current -= speedRef.current
      if (halfWidthRef.current > 0 && Math.abs(xRef.current) >= halfWidthRef.current) {
        xRef.current += halfWidthRef.current
      }

      track.style.transform = `translateX(${xRef.current}px)`
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  return (
    <div
      className="bg-te-orange overflow-hidden py-3 select-none"
      onMouseEnter={() => { hoveringRef.current = true }}
      onMouseLeave={() => { hoveringRef.current = false }}
      aria-hidden
    >
      <div
        ref={trackRef}
        className="flex whitespace-nowrap"
        style={{ width: 'max-content' }}
      >
        {REPEATED.map((item, i) => (
          <span key={i} className="inline-flex items-center">
            {item.href ? (
              <a
                href={item.href}
                tabIndex={-1}
                onClick={e => { e.preventDefault(); scrollToPost(item.href!) }}
                className="font-mono text-te-black text-[0.7rem] md:text-xs font-medium tracking-[0.15em] uppercase px-6 underline underline-offset-2 decoration-te-black/30 hover:decoration-te-black cursor-pointer transition-all"
              >
                {item.text}
              </a>
            ) : (
              <span className="font-mono text-te-black text-[0.7rem] md:text-xs font-medium tracking-[0.15em] uppercase px-6">
                {item.text}
              </span>
            )}
            <span className="font-mono text-te-black opacity-40 text-sm">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
