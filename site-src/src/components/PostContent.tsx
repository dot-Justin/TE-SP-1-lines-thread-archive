import { useMemo } from 'react'
import DOMPurify from 'dompurify'
import { rewriteCooked, cleanDiscourseHtml } from '../lib/rewriteCooked'
import { useImageViewer } from '../hooks/useImageViewer'

// DOMPurify config: allow images and links from local + known safe origins
const PURIFY_CONFIG = {
  ALLOWED_TAGS: [
    'p', 'br', 'hr', 'a', 'img', 'em', 'strong', 'b', 'i', 'u', 's',
    'code', 'pre', 'blockquote', 'ul', 'ol', 'li',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'div', 'span', 'figure', 'figcaption',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'details', 'summary', 'aside',
  ],
  ALLOWED_ATTR: [
    'href', 'src', 'alt', 'title', 'class', 'id',
    'width', 'height', 'loading', 'srcset', 'sizes',
    'target', 'rel', 'colspan', 'rowspan',
    'data-index', 'data-post', 'data-jump-post',
  ],
  ALLOW_DATA_ATTR: false,
  FORCE_BODY: false,
}

interface PostContentProps {
  cooked: string
  urlMap: Record<string, string>
}

export function PostContent({ cooked, urlMap }: PostContentProps) {
  const { openViewer, navigateToPost } = useImageViewer()

  const safeHtml = useMemo(() => {
    let processed = rewriteCooked(cooked, urlMap)
    processed = cleanDiscourseHtml(processed)
    return DOMPurify.sanitize(processed, PURIFY_CONFIG) as string
  }, [cooked, urlMap])

  return (
    <div
      className="post-content prose-te"
      // Safe: content is DOMPurify-sanitized Discourse HTML from a static archive
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: safeHtml }}
      onClick={(e) => {
        const t = e.target as HTMLElement

        // Handle quote-jump-link clicks (injected by rewriteCooked)
        const jumpEl = t.dataset.jumpPost ? t : (t.closest('[data-jump-post]') as HTMLElement | null)
        if (jumpEl) {
          e.preventDefault()
          const postNum = parseInt(jumpEl.dataset.jumpPost ?? '0', 10)
          if (postNum && navigateToPost) navigateToPost(postNum)
          return
        }

        // Handle image clicks
        if (t.tagName === 'IMG' && !t.classList.contains('emoji') && !t.classList.contains('avatar')) {
          // Images inside a quote block → jump to the original post instead
          const quoteAside = t.closest('aside.quote[data-post]') as HTMLElement | null
          if (quoteAside) {
            const postNum = parseInt(quoteAside.dataset.post ?? '0', 10)
            if (postNum && navigateToPost) navigateToPost(postNum)
            return
          }
          openViewer((t as HTMLImageElement).src)
        }
      }}
    />
  )
}
