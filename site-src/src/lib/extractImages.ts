import { rewriteCooked } from './rewriteCooked'
import type { Post, ImageMeta } from '../types'

// Parses all posts' raw HTML to build a deduplicated list of ImageMeta objects.
// Runs once after posts + urlMap are loaded (via useMemo in App.tsx).
export function extractImages(posts: Post[], urlMap: Record<string, string>): ImageMeta[] {
  const seen = new Set<string>()
  const images: ImageMeta[] = []

  for (const post of posts) {
    if (!post.cooked) continue

    // Apply URL remapping before parsing so src values match what's shown in PostContent
    const remapped = rewriteCooked(post.cooked, urlMap)
    const doc = new DOMParser().parseFromString(remapped, 'text/html')

    // Exclude emoji replacements and Discourse inline avatars (quote blocks use img.avatar)
    const imgs = doc.querySelectorAll<HTMLImageElement>('img:not(.emoji):not(.avatar)')
    for (const img of imgs) {
      const src = img.getAttribute('src') ?? ''
      if (!src || seen.has(src)) continue

      // Skip images inside onebox embeds — website thumbnails/favicons from link previews.
      if (img.closest('aside.onebox, aside[data-onebox-src]')) continue

      // Skip images inside quote blocks — they already appear in the quoted post's own images.
      if (img.closest('aside.quote')) continue

      seen.add(src)

      // Try to extract filesize from adjacent .meta .informations span
      // Discourse HTML: <img> followed by <div class="meta"><span class="informations">WxH SIZE</span></div>
      let filesize: string | undefined
      const metaDiv = img.closest('.d-image-grid')
        ? null // inside grid, meta is a sibling div after the grid
        : img.nextElementSibling?.matches('div.meta')
          ? img.nextElementSibling
          : img.parentElement?.nextElementSibling?.matches('div.meta')
            ? img.parentElement.nextElementSibling
            : null

      if (metaDiv) {
        const info = metaDiv.querySelector('.informations')?.textContent?.trim()
        if (info) {
          // Format: "3024×4032 759 KB" — extract everything after the dimensions
          const match = info.match(/\d+[×x]\d+\s+(.+)/)
          if (match) filesize = match[1].trim()
        }
      }

      images.push({
        src,
        alt: img.getAttribute('alt') ?? '',
        width: parseInt(img.getAttribute('width') ?? '0', 10) || 0,
        height: parseInt(img.getAttribute('height') ?? '0', 10) || 0,
        dominantColor: img.getAttribute('data-dominant-color') ?? undefined,
        filesize,
        postNum: post.num,
        author: post.author,
        date: post.date,
      })
    }
  }

  return images
}
