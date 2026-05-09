'use client'
import { useEffect, useState, useRef } from 'react'
import { CaretDown } from '@phosphor-icons/react'
import type { Stats } from '../types'

interface HeroProps {
  stats: Stats | null
}

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-'
const FINAL_TEXT = 'STEM PLAYER'

function useScramble(finalText: string, startDelay = 300) {
  const [display, setDisplay] = useState(() =>
    finalText.split('').map(c => (c === ' ' ? ' ' : randomChar())).join('')
  )
  const [done, setDone] = useState(false)

  useEffect(() => {
    let iteration = 0
    const totalIterations = finalText.replace(/ /g, '').length * 4
    let intervalId: ReturnType<typeof setInterval>

    const startId = setTimeout(() => {
      intervalId = setInterval(() => {
        iteration++
        const progress = iteration / totalIterations

        setDisplay(
          finalText
            .split('')
            .map((char, i) => {
              if (char === ' ') return ' '
              // How many non-space chars before this index
              const nonSpaceBefore = finalText.slice(0, i).replace(/ /g, '').length
              const charProgress = nonSpaceBefore / finalText.replace(/ /g, '').length
              if (charProgress < progress - 0.1) return char
              return randomChar()
            })
            .join('')
        )

        if (iteration >= totalIterations) {
          clearInterval(intervalId)
          setDisplay(finalText)
          setDone(true)
        }
      }, 35)
    }, startDelay)

    return () => {
      clearTimeout(startId)
      clearInterval(intervalId)
    }
  }, [finalText, startDelay])

  return { display, done }
}

function randomChar() {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
}

function formatNum(n: number) {
  return n.toLocaleString('en-US')
}

export function Hero({ stats }: HeroProps) {
  const { display } = useScramble(FINAL_TEXT, 400)
  const heroRef = useRef<HTMLDivElement>(null)

  const scrollToThread = () => {
    const el = document.getElementById('thread')
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div
      ref={heroRef}
      className="relative min-h-[100dvh] bg-te-black flex flex-col overflow-hidden select-none"
    >
      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #2a2a28 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 0.35,
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 65% 40%, rgba(232,75,19,0.06) 0%, transparent 60%)',
        }}
      />

      {/* Top strip */}
      <div className="relative z-10 flex justify-between items-start px-6 md:px-10 pt-6">
        <span className="font-mono text-xs text-te-muted tracking-[0.2em] uppercase">
          Teenage Engineering
        </span>
        <span className="font-mono text-xs text-te-muted tracking-[0.2em] uppercase">
          TE-SP-1
        </span>
      </div>

      {/* Main hero content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-10 pb-10">
        {/* Massive headline */}
        <div className="overflow-hidden">
          <h1
            className="font-display font-black text-te-text leading-[0.88] tracking-tighter uppercase"
            style={{ fontSize: 'clamp(5rem, 18vw, 18rem)' }}
          >
            {display}
          </h1>
        </div>

        {/* Japanese subtitle */}
        <div className="mt-3 md:mt-4">
          <span
            className="font-mono text-te-orange tracking-widest"
            style={{ fontSize: 'clamp(0.85rem, 2vw, 1.4rem)' }}
          >
            ステムプレーヤー
          </span>
        </div>

        {/* Thread descriptor */}
        <p className="mt-6 font-body text-te-muted text-sm md:text-base tracking-wide max-w-xl">
          llllllll.co &middot; reverse-engineering archive &middot; 2024&ndash;2026 &middot;{' '}
          <span className="text-te-orange">thread closed</span>
        </p>

        {/* Stats row */}
        {stats && (
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl">
            {[
              { label: 'POSTS', value: formatNum(stats.total_posts) },
              { label: 'PARTICIPANTS', value: formatNum(stats.total_participants) },
              { label: 'VIEWS', value: formatNum(stats.total_views) },
              { label: 'LIKES', value: formatNum(stats.total_likes) },
            ].map(({ label, value }) => (
              <div key={label}>
                <div className="font-mono text-[0.65rem] text-te-muted tracking-[0.2em] uppercase mb-1">
                  {label}
                </div>
                <div className="font-display font-black text-te-text text-2xl md:text-3xl leading-none">
                  {value}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToThread}
        className="relative z-10 flex flex-col items-center gap-2 pb-8 mx-auto text-te-muted hover:text-te-orange transition-colors duration-200 group"
        aria-label="Scroll to thread"
      >
        <span className="font-mono text-[0.6rem] tracking-[0.3em] uppercase">SCROLL</span>
        <CaretDown
          size={18}
          weight="bold"
          className="animate-bounce2 group-hover:text-te-orange"
        />
      </button>

      {/* Sentinel: ThreadNav watches this to show/hide itself */}
      <div id="hero-sentinel" className="absolute bottom-0 h-px w-full pointer-events-none" />
    </div>
  )
}
