const ITEMS = [
  '846 POSTS',
  '66,726 WORDS WRITTEN',
  '179 CONTRIBUTORS',
  '78,451 VIEWS',
  '813 FILES SHARED',
  '87% OF POSTS RECEIVED LIKES',
  '86 MB OF DATA ARCHIVED',
  'ONE POST EARNED 83 HEARTS',
  '156 POSTS IN A SINGLE MONTH',
  '574 CONVERSATIONS',
  '4,967 LIKES',
  '2 YEARS OF RESEARCH',
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
