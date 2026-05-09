'use client'
import { CaretDown } from '@phosphor-icons/react'
import type { Stats } from '../types'

interface HeroProps {
  stats: Stats | null
}

function formatNum(n: number) {
  return n.toLocaleString('en-US')
}

export function Hero({ stats }: HeroProps) {
  const scrollToThread = () => {
    const el = document.getElementById('thread')
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative bg-te-black border-b border-te-border select-none">
      {/* Top label strip */}
      <div className="flex justify-between items-center px-6 md:px-10 pt-5 pb-0">
        <span className="font-mono text-[0.6rem] text-te-muted tracking-[0.2em] uppercase">
          Teenage Engineering
        </span>
        <span className="font-mono text-[0.6rem] text-te-muted tracking-[0.2em] uppercase">
          TE-SP-1
        </span>
      </div>

      {/* Main content — flex row: text left, image right */}
      <div className="flex items-start gap-6 px-6 md:px-10 pt-6 pb-8">
        {/* Left: text */}
        <div className="flex-1 min-w-0">
          <h1
            className="font-display font-black text-te-text uppercase leading-none tracking-tighter"
            style={{ fontSize: 'clamp(2.5rem, 9vw, 7.5rem)' }}
          >
            SP-1 ARCHIVE
          </h1>

          <div className="font-mono text-te-orange tracking-widest mt-2 text-sm md:text-base">
            ステムプレーヤー
          </div>

          <p className="font-mono text-te-muted text-xs mt-4 tracking-wide leading-relaxed">
            llllllll.co thread archive &middot; April 2024 &ndash; May 2026 &middot;{' '}
            <span className="text-te-orange">thread closed</span>
            {' '}&middot; community moved to{' '}
            <a
              href="https://discord.gg/y4V6VfHYck"
              target="_blank"
              rel="noopener noreferrer"
              className="text-te-orange hover:underline"
            >
              Discord
            </a>
          </p>

          {stats && (
            <div className="mt-6 flex flex-wrap gap-6 md:gap-10">
              {[
                { label: 'POSTS', value: formatNum(stats.total_posts) },
                { label: 'PARTICIPANTS', value: formatNum(stats.total_participants) },
                { label: 'VIEWS', value: formatNum(stats.total_views) },
                { label: 'LIKES', value: formatNum(stats.total_likes) },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="font-mono text-[0.55rem] text-te-muted tracking-[0.2em] uppercase mb-0.5">
                    {label}
                  </div>
                  <div className="font-display font-black text-te-text text-xl md:text-2xl leading-none">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: device image — same height as text column, top-aligned */}
        <img
          src="/sp-01.svg"
          alt="TE-SP-1 Stem Player device"
          className="flex-shrink-0 self-stretch object-contain object-top w-28 md:w-48 lg:w-64 pointer-events-none select-none"
          draggable={false}
        />
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToThread}
        className="flex flex-col items-center gap-1 py-4 mx-auto text-te-muted hover:text-te-orange transition-colors duration-200 group"
        aria-label="Scroll to thread"
      >
        <span className="font-mono text-[0.5rem] tracking-[0.3em] uppercase">SCROLL</span>
        <CaretDown size={14} weight="bold" className="animate-bounce2 group-hover:text-te-orange" />
      </button>

      {/* Sentinel: ThreadNav + ScrollBar watch this to show/hide */}
      <div id="hero-sentinel" className="absolute bottom-0 h-px w-full pointer-events-none" />
    </div>
  )
}
