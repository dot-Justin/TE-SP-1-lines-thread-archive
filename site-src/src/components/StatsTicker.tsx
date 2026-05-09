const ITEMS = [
  '846 POSTS',
  '179 PARTICIPANTS',
  '78,451 VIEWS',
  '4,967 LIKES',
  'APRIL 2024 — MAY 2026',
  'FIRMWARE DUMPED FEB 2025',
  'BOOTLOADER CRACKED MAR 2026',
  'THREAD CLOSED MAY 2026',
]

// Duplicate for seamless loop
const REPEATED = [...ITEMS, ...ITEMS]

export function StatsTicker() {
  return (
    <div className="bg-te-orange overflow-hidden py-3 select-none" aria-hidden>
      <div
        className="flex whitespace-nowrap animate-marquee"
        style={{ width: 'max-content' }}
      >
        {REPEATED.map((item, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="font-mono text-te-black text-[0.7rem] md:text-xs font-medium tracking-[0.15em] uppercase px-6">
              {item}
            </span>
            <span className="font-mono text-te-black opacity-40 text-sm">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
