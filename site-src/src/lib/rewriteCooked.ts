// Rewrites llllllll.co upload URLs to local asset paths using the url-map
// Falls back to original URL if no local mapping exists

const UPLOAD_RE = /https:\/\/llllllll\.co\/uploads\/default\/[^\s"')>]*/g

export function rewriteCooked(html: string, urlMap: Record<string, string>): string {
  if (!html || Object.keys(urlMap).length === 0) return html

  return html.replace(UPLOAD_RE, (match) => {
    // Try exact match first
    if (urlMap[match]) return urlMap[match]

    // Extract the sha1 hash from the URL path
    // URLs look like: /uploads/default/original/3X/a/b/HASH.ext
    // or: /uploads/default/optimized/3X/a/b/HASH_2_WxH.ext
    const sha1Match = match.match(/\/([0-9a-f]{40})(?:[._][^/]*)?$/)
    if (sha1Match) {
      const sha1 = sha1Match[1]
      // Look for any entry in urlMap that contains this sha1
      const mapKey = Object.keys(urlMap).find(k => k.includes(sha1))
      if (mapKey) return urlMap[mapKey]
    }

    return match
  })
}

// Strips lightbox wrappers from Discourse-generated HTML
export function cleanDiscourseHtml(html: string): string {
  // Remove lightbox wrapper anchors but keep the img inside
  let clean = html.replace(
    /<a[^>]*class="[^"]*lightbox[^"]*"[^>]*>([\s\S]*?)<\/a>/gi,
    (_, inner) => inner
  )

  // Remove the meta/details elements Discourse adds to lightboxes
  clean = clean.replace(/<div[^>]*class="[^"]*meta[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')
  clean = clean.replace(/<[^>]*data-base62-sha1[^>]*>/g, (tag) => {
    // Keep img tags but remove extra lightbox attributes
    return tag
      .replace(/\s+data-base62-sha1="[^"]*"/, '')
      .replace(/\s+data-download-href="[^"]*"/, '')
  })

  // Open all external links in new tab
  clean = clean.replace(/<a\s/gi, '<a target="_blank" rel="noopener noreferrer" ')

  // Remove duplicate target attributes
  clean = clean.replace(/target="_blank"[^>]*target="_blank"/gi, (m) =>
    m.replace(/target="_blank"\s*/, '')
  )

  return clean
}
