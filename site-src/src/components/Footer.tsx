import { ArrowSquareOut } from '@phosphor-icons/react'

const LINKS = [
  { label: 'Discord', href: 'https://discord.gg/y4V6VfHYck', note: 'active community' },
  { label: 'solderless.engineering', href: 'https://solderless.engineering/', note: 'web firmware updater' },
  { label: 'SP-1-dev on GitHub', href: 'https://github.com/timknapen/SP-1-dev', note: 'custom firmware' },
  { label: 'Original thread', href: 'https://llllllll.co/t/te-stem-player/66795', note: 'llllllll.co (closed)' },
]

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 group"
    >
      {children}
      <ArrowSquareOut
        size={11}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-te-orange"
      />
    </a>
  )
}

export function Footer() {
  return (
    <footer className="bg-te-black border-t border-te-border pb-10">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 md:gap-8">
          {/* Left — brand */}
          <div>
            <h2
              className="font-display font-black text-te-text uppercase leading-none tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              SP-1 ARCHIVE
            </h2>
            <div className="font-mono text-te-orange tracking-widest text-sm mt-2">
              ステムプレーヤー
            </div>
            <p className="font-body text-te-muted text-sm mt-6 max-w-sm leading-relaxed">
              A community reverse-engineering archive. Firmware extracted, audio decoded,
              bootloader cracked — without opening the device.
            </p>
          </div>

          {/* Right — links */}
          <div>
            <div className="font-mono text-[0.6rem] text-te-muted tracking-[0.2em] uppercase mb-5">
              Links
            </div>
            <div className="space-y-4">
              {LINKS.map(({ label, href, note }) => (
                <div key={href}>
                  <ExtLink href={href}>
                    <span className="font-body text-te-text text-sm hover:text-te-orange transition-colors">
                      {label}
                    </span>
                  </ExtLink>
                  <div className="font-mono text-[0.6rem] text-te-muted tracking-wide mt-0.5">
                    {note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-te-border flex flex-wrap justify-between items-center gap-4">
          <span className="font-mono text-[0.6rem] text-te-muted tracking-[0.15em] uppercase">
            ARCHIVED 05-09-2026 BY{' '}
            <a
              href="https://github.com/dot-Justin/TE-SP-1-lines-thread-archive"
              target="_blank"
              rel="noopener noreferrer"
              className="text-te-orange hover:underline"
            >
              DOTJUSTIN
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
