import { Heart } from '@phosphor-icons/react'

interface AuthorTagProps {
  author: string
  date: string
  likes: number
  replyTo: number | null
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function AuthorTag({ author, date, likes, replyTo }: AuthorTagProps) {
  return (
    <div className="flex items-center justify-between gap-3 flex-wrap">
      <div className="flex items-center gap-3">
        {/* Author */}
        <span className="font-body font-medium text-te-text text-sm">
          {author}
        </span>

        {/* Reply indicator */}
        {replyTo && (
          <a
            href={`#post-${replyTo}`}
            className="font-mono text-[0.65rem] text-te-orange hover:underline tracking-wide"
            onClick={e => {
              e.preventDefault()
              document.getElementById(`post-${replyTo}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }}
          >
            &#8627;&nbsp;#{String(replyTo).padStart(4, '0')}
          </a>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Likes */}
        {likes > 0 && (
          <span
            className={`flex items-center gap-1 font-mono text-[0.65rem] tracking-wide ${
              likes >= 20 ? 'text-te-orange' : 'text-te-muted'
            }`}
          >
            <Heart
              size={11}
              weight={likes >= 20 ? 'fill' : 'regular'}
            />
            {likes}
          </span>
        )}

        {/* Timestamp */}
        <span className="font-mono text-[0.65rem] text-te-muted tracking-wide">
          {formatDate(date)}
        </span>
      </div>
    </div>
  )
}
