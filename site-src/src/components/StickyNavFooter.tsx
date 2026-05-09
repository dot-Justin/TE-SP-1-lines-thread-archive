import { useEffect, useState } from 'react'
import { ArrowSquareOut } from '@phosphor-icons/react'

const LINKS = [
  { label: 'Original Thread', href: 'https://llllllll.co/t/te-stem-player/66795' },
  { label: 'Discord', href: 'https://discord.gg/y4V6VfHYck' },
  { label: 'solderless.engineering', href: 'https://solderless.engineering/' },
  { label: 'SP-1-dev', href: 'https://github.com/timknapen/SP-1-dev' },
  { label: 'Archive GitHub', href: 'https://github.com/dot-Justin/TE-SP-1-lines-thread-archive' },
]

export function StickyNavFooter() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    )
    const el = document.getElementById('hero-sentinel')
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-te-black/95 backdrop-blur-md border-t border-te-border">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-2 flex items-center gap-4 md:gap-6 overflow-x-auto scrollbar-none pr-8">
          {LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-1 font-mono text-[0.6rem] tracking-[0.12em] text-te-muted hover:text-te-orange transition-colors uppercase group"
            >
              {label}
              <ArrowSquareOut
                size={10}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
