// Technical terms that get highlighted in orange mono throughout post content

const TERMS = [
  'nRF52840',
  'APPROTECT',
  'CS42L42',
  'TAS2505',
  'THGBMNG5D1LBAIL',
  'BeagleBone',
  'OpenOCD',
  'J-Link',
  'SWD',
  'eMMC',
  'DFU',
  'CDC',
  'PCM',
  'PPQN',
  'PRU',
  'XF3B-1945-31A',
  'KiCad',
  'Ghidra',
  'solderless.engineering',
  'SP-1-dev',
]

// Build a regex from the terms list (case-sensitive, word-boundary aware)
const TERMS_RE = new RegExp(
  `(${TERMS.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
  'g'
)

// Wraps technical terms in a span with the highlight style
// Only runs on text nodes to avoid breaking HTML attributes
export function highlightTermsInHtml(html: string): string {
  // We operate only outside of HTML tags to avoid corrupting attributes
  return html.replace(/>([^<]+)</g, (match, text) => {
    const highlighted = text.replace(
      TERMS_RE,
      '<span class="term-highlight">$1</span>'
    )
    return `>${highlighted}<`
  })
}
