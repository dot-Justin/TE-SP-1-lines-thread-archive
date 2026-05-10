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

// Strips lightbox wrappers from Discourse-generated HTML and fixes relative links
export function cleanDiscourseHtml(html: string): string {
  // Use DOMParser to reliably strip onebox embeds — regex fails on nested HTML in browsers
  const doc = new DOMParser().parseFromString(html, 'text/html')

  // Remove onebox embeds (Discourse link-preview cards) — actual <a> links are in surrounding text
  doc.querySelectorAll('aside.onebox, aside[data-onebox-src]').forEach(el => el.remove())

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

  // Remove Discourse lightbox meta divs
  doc.querySelectorAll('div.meta').forEach(el => el.remove())

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
