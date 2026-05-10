import { useState } from 'react'
import { Heart } from '@phosphor-icons/react'

interface AuthorTagProps {
  author: string
  date: string
  likes: number
  replyTo: number | null
  avatarSrc?: string
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function getInitials(name: string): string {
  return name
    .split(/[^a-zA-Z]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('')
}

function Avatar({ src, author }: { src?: string; author: string }) {
  const [failed, setFailed] = useState(false)

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={author}
        onError={() => setFailed(true)}
        className="w-8 h-8 rounded-full object-cover border border-te-border flex-shrink-0"
        loading="lazy"
      />
    )
  }

  // Initials fallback
  return (
    <div
      className="w-8 h-8 rounded-full border border-te-border bg-te-surface flex items-center justify-center flex-shrink-0"
      aria-label={author}
    >
      <span className="font-mono text-[0.55rem] text-te-muted font-medium tracking-wide leading-none">
        {getInitials(author)}
      </span>
    </div>
  )
}

export function AuthorTag({ author, date, likes, replyTo, avatarSrc }: AuthorTagProps) {
  return (
    <div className="flex items-center justify-between gap-3 flex-wrap">
      {/* Left: avatar + author + reply */}
      <div className="flex items-center gap-2.5">
        <a
          href={`https://llllllll.co/u/${author}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 group"
        >
          <Avatar src={avatarSrc} author={author} />
          <span className="font-body font-medium text-te-text text-sm leading-none group-hover:text-te-orange transition-colors">
            {author}
          </span>
        </a>

        {replyTo && (
          <a
            href={`#${replyTo}`}
            className="font-mono text-[0.65rem] text-te-orange hover:underline tracking-wide leading-none"
            onClick={e => {
              e.preventDefault()
              document.getElementById(String(replyTo))?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }}
          >
            &#8627;&nbsp;#{String(replyTo).padStart(4, '0')}
          </a>
        )}
      </div>

      {/* Right: likes + date */}
      <div className="flex items-center gap-4">
        {likes > 0 && (
          <span
            className={`flex items-center gap-1 font-mono text-[0.65rem] tracking-wide ${
              likes >= 20 ? 'text-te-orange' : 'text-te-muted'
            }`}
          >
            <Heart size={11} weight={likes >= 20 ? 'fill' : 'regular'} />
            {likes}
          </span>
        )}
        <span className="font-mono text-[0.65rem] text-te-muted tracking-wide">
          {formatDate(date)}
        </span>
      </div>
    </div>
  )
}
