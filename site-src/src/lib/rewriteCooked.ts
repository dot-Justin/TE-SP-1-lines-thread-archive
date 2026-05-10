// Rewrites llllllll.co upload URLs to local asset paths using the url-map
// Falls back to original URL if no local mapping exists

const EMOJI_MAP: Record<string, string> = {
  ':+1:t4:': '👍🏾', ':100:': '💯', ':black_heart:': '🖤',
  ':blush:': '😊', ':clap:t4:': '👏🏾', ':confused:': '😕',
  ':construction_worker_man:t2:': '👷🏻‍♂️', ':cowboy_hat_face:': '🤠',
  ':crossed_fingers:': '🤞', ':crossed_fingers:t4:': '🤞🏾',
  ':cry:': '😢', ':detective:': '🕵️', ':dotted_line_face:': '🫥',
  ':drooling_face:': '🤤', ':expressionless_face:': '😑',
  ':face_with_peeking_eye:': '🫣', ':face_with_spiral_eyes:': '😵‍💫',
  ':floppy_disk:': '💾', ':flushed_face:': '😳', ':folded_hands:t4:': '🙏🏾',
  ':frowning:': '😦', ':green_heart:': '💚', ':grimacing:': '😬',
  ':heart:': '❤️', ':heart_eyes:': '😍', ':hot_face:': '🥵',
  ':joy:': '😂', ':laughing:': '😆', ':low_battery:': '🪫',
  ':man_facepalming:t2:': '🤦🏻‍♂️', ':man_shrugging:': '🤷‍♂️',
  ':melting_face:': '🫠', ':next_track_button:': '⏭️',
  ':ok_hand:t4:': '👌🏾', ':partying_face:': '🥳',
  ':raising_hands:': '🙌', ':raising_hands:t4:': '🙌🏾',
  ':rofl:': '🤣', ':roll_eyes:': '🙄', ':sad_but_relieved_face:': '😥',
  ':saluting_face:': '🫡', ':scream:': '😱', ':skull:': '💀',
  ':slight_smile:': '🙂', ':smiley:': '😃',
  ':smiling_face_with_sunglasses:': '😎', ':sob:': '😭',
  ':stuck_out_tongue:': '😛', ':sweat_smile:': '😅',
  ':thinking:': '🤔', ':upside_down_face:': '🙃',
  ':white_check_mark:': '✅', ':wink:': '😉',
  ':winking_face_with_tongue:': '😜', ':zany_face:': '🤪',
}

const UPLOAD_RE = /https:\/\/llllllll\.co\/uploads\/(default|short-url)\/[^\s"')>]*/g

export function rewriteCooked(html: string, urlMap: Record<string, string>): string {
  if (!html || Object.keys(urlMap).length === 0) return html

  // Normalize relative /uploads/ paths (no domain) → absolute, so URL-map lookup works
  const normalized = html
    .replace(/href="\/uploads\//g, 'href="https://llllllll.co/uploads/')
    .replace(/src="\/uploads\//g, 'src="https://llllllll.co/uploads/')

  return normalized.replace(UPLOAD_RE, (match) => {
    // Extract SHA1 first — the short-hash key in url-map always points to the
    // full-resolution original, whereas the exact URL key may point to a
    // compressed/resized "optimized" variant. Prefer originals.
    const sha1Match = match.match(/\/([0-9a-f]{40})(?:[._][^/]*)?$/)
    if (sha1Match) {
      const sha1 = sha1Match[1]
      // Short 40-char key → original file (highest priority)
      if (urlMap[sha1]) return urlMap[sha1]
    }

    // Exact URL match — may be an optimized/resized variant
    if (urlMap[match]) return urlMap[match]

    // Last-resort SHA1 scan (handles edge cases with different key formats)
    if (sha1Match) {
      const sha1 = sha1Match[1]
      const mapKey = Object.keys(urlMap).find(k => k.includes(sha1))
      if (mapKey) return urlMap[mapKey]
    }

    return match
  })
}

// Strips lightbox wrappers from Discourse-generated HTML and fixes relative links
export function cleanDiscourseHtml(html: string): string {
  // Use DOMParser to reliably strip onebox embeds — regex fails on nested HTML in browsers
  const doc = new DOMParser().parseFromString(html, 'text/html')

  // Replace onebox embeds with a compact inline link (preserves destination)
  doc.querySelectorAll('aside.onebox, aside[data-onebox-src]').forEach(el => {
    const url = el.getAttribute('data-onebox-src')
      ?? el.querySelector('header a')?.getAttribute('href')
      ?? ''
    if (!url) { el.remove(); return }

    // Prefer the article h3 title, fall back to the URL itself
    const titleEl = el.querySelector('article h3 a, article h2 a')
    const title = titleEl?.textContent?.trim() || url

    const a = doc.createElement('a')
    a.href = url
    a.textContent = title
    a.className = 'onebox-link'
    a.setAttribute('target', '_blank')
    a.setAttribute('rel', 'noopener noreferrer')

    // Wrap in a paragraph so it sits on its own line
    const p = doc.createElement('p')
    p.appendChild(a)
    el.replaceWith(p)
  })

  // Remove lightbox wrapper anchors but keep the img inside
  doc.querySelectorAll('a.lightbox').forEach(a => {
    const frag = document.createDocumentFragment()
    while (a.firstChild) frag.appendChild(a.firstChild)
    a.replaceWith(frag)
  })

  // Replace Discourse emoji images with Unicode characters
  doc.querySelectorAll('img.emoji').forEach(img => {
    const alt = img.getAttribute('alt') ?? ''
    const emoji = EMOJI_MAP[alt]
    const span = doc.createElement('span')
    if (emoji) {
      span.textContent = emoji
    } else {
      span.textContent = alt // fallback: show the :shortcode: text
    }
    img.replaceWith(span)
  })

  // Replace iframes (e.g. SoundCloud embeds) with a compact link — iframes get stripped by DOMPurify
  doc.querySelectorAll('iframe[src]').forEach(iframe => {
    const src = iframe.getAttribute('src') ?? ''
    if (!src) { iframe.remove(); return }

    // Try to extract a human-readable domain for the label
    let label = src
    try {
      const u = new URL(src)
      label = u.hostname.replace(/^w\./, '')
    } catch { /* keep src as label */ }

    const a = doc.createElement('a')
    a.href = src
    a.textContent = `[${label} embed]`
    a.className = 'onebox-link'
    a.setAttribute('target', '_blank')
    a.setAttribute('rel', 'noopener noreferrer')

    const p = doc.createElement('p')
    p.appendChild(a)
    iframe.replaceWith(p)
  })

  // Inject a "jump to original post" link into each quote's title bar
  doc.querySelectorAll('aside.quote[data-post]').forEach(aside => {
    const postNum = parseInt(aside.getAttribute('data-post') ?? '0', 10)
    if (!postNum) return
    const titleDiv = aside.querySelector('div.title')
    if (!titleDiv) return
    const a = doc.createElement('a')
    a.className = 'quote-jump-link'
    a.setAttribute('data-jump-post', String(postNum))
    a.href = '#'
    a.textContent = `#${String(postNum).padStart(4, '0')}`
    titleDiv.appendChild(a)
  })

  // Remove Discourse lightbox meta divs
  doc.querySelectorAll('div.meta').forEach(el => el.remove())

  // Remove spurious direct children of image grids that pollute the CSS grid layout.
  // Discourse emits images either as separate <p><div>...</div></p> entries or as a single <p>
  // with all images separated by <br>. HTML5 parsing of <p><div> creates empty sibling <p>s;
  // <br> separators land as direct grid children. Both become unwanted grid cells.
  doc.querySelectorAll('.d-image-grid > p, .d-image-grid > br').forEach(el => el.remove())

  // Strip data-base62-sha1 / data-download-href attributes
  doc.querySelectorAll('[data-base62-sha1]').forEach(el => {
    el.removeAttribute('data-base62-sha1')
    el.removeAttribute('data-download-href')
  })

  let clean = doc.body.innerHTML

  // Fix Discourse relative links → absolute llllllll.co URLs
  // Covers @mentions (/u/), topic links (/t/), category links (/c/)
  clean = clean.replace(/href="\/u\//g, 'href="https://llllllll.co/u/')
  clean = clean.replace(/href="\/t\//g, 'href="https://llllllll.co/t/')
  clean = clean.replace(/href="\/c\//g, 'href="https://llllllll.co/c/')

  // Open all external links in new tab
  clean = clean.replace(/<a\s/gi, '<a target="_blank" rel="noopener noreferrer" ')

  // Remove duplicate target attributes introduced by the step above
  clean = clean.replace(/target="_blank"[^>]*target="_blank"/gi, (m) =>
    m.replace(/target="_blank"\s*/, '')
  )

  return clean
}
