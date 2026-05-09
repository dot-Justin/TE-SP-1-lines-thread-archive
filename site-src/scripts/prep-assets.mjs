/**
 * prep-assets.mjs
 *
 * Copies raw upload files from raw/assets/uploads/ to docs/assets/uploads/
 * with proper file extensions, and generates docs/assets/url-map.json which
 * maps original llllllll.co URLs to local /assets/uploads/HASH.ext paths.
 *
 * Run from site-src/: node scripts/prep-assets.mjs
 */

import { readFileSync, writeFileSync, copyFileSync, mkdirSync, existsSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = join(__dirname, '..', '..')

const MANIFEST_PATH = join(REPO_ROOT, 'docs', 'metadata', 'upload_manifest.json')
const RAW_UPLOADS  = join(REPO_ROOT, 'raw', 'assets', 'uploads')
const OUT_UPLOADS  = join(REPO_ROOT, 'docs', 'assets', 'uploads')
const OUT_MAP      = join(REPO_ROOT, 'docs', 'assets', 'url-map.json')

// Magic byte signatures for common image/file types
function detectExtension(buf) {
  const b = buf
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return 'jpg'
  if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return 'png'
  if (b[0] === 0x47 && b[1] === 0x49 && b[2] === 0x46) return 'gif'
  if (b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 &&
      b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50) return 'webp'
  if (b[0] === 0x25 && b[1] === 0x50 && b[2] === 0x44 && b[3] === 0x46) return 'pdf'
  if (b[0] === 0x50 && b[1] === 0x4b && b[2] === 0x03 && b[3] === 0x04) return 'zip' // docx/zip
  if (b[0] === 0x4f && b[1] === 0x67 && b[2] === 0x67) return 'ogg'
  // Fallback: check for text-based formats
  const str = buf.slice(0, 5).toString('utf8')
  if (str.startsWith('<svg')) return 'svg'
  return 'bin'
}

// DOCX files show as zip; check content type hint from URL
function refineExtByUrl(ext, remoteUrl) {
  if (ext !== 'zip') return ext
  const lower = remoteUrl.toLowerCase()
  if (lower.includes('.docx')) return 'docx'
  if (lower.includes('.xlsx')) return 'xlsx'
  if (lower.includes('.zip')) return 'zip'
  return 'docx' // most common in Discourse threads
}

async function main() {
  if (!existsSync(MANIFEST_PATH)) {
    console.error('Manifest not found at', MANIFEST_PATH)
    process.exit(1)
  }

  mkdirSync(OUT_UPLOADS, { recursive: true })

  const manifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'))
  const urlMap = {}

  let copied = 0
  let skipped = 0
  let missing = 0

  const entries = Object.entries(manifest)
  console.log(`Processing ${entries.length} manifest entries...`)

  for (const [remoteUrl, info] of entries) {
    // info.local is like "assets/uploads/default_HASH"
    const localBase = info.local.replace(/^assets\/uploads\//, '')
    const srcPath = join(RAW_UPLOADS, localBase)

    if (!existsSync(srcPath)) {
      missing++
      continue
    }

    // Detect extension from magic bytes
    const buf = readFileSync(srcPath)
    let ext = detectExtension(buf)
    ext = refineExtByUrl(ext, remoteUrl)

    const destName = `${localBase}.${ext}`
    const destPath = join(OUT_UPLOADS, destName)

    if (!existsSync(destPath)) {
      copyFileSync(srcPath, destPath)
      copied++
    } else {
      skipped++
    }

    // Map the remote URL (and all variants using the same hash) to the local path
    const sha1Match = remoteUrl.match(/\/([0-9a-f]{40})/)
    if (sha1Match) {
      const sha1 = sha1Match[1]
      urlMap[sha1] = `/assets/uploads/${destName}`
    }

    // Also map the exact remote URL
    urlMap[remoteUrl] = `/assets/uploads/${destName}`
  }

  // Write the url-map.json
  writeFileSync(OUT_MAP, JSON.stringify(urlMap, null, 2))

  console.log(`Done.`)
  console.log(`  Copied:  ${copied}`)
  console.log(`  Skipped: ${skipped} (already exist)`)
  console.log(`  Missing: ${missing} (not in raw/assets/uploads)`)
  console.log(`  URL map written to: ${OUT_MAP}`)
  console.log(`  Total mappings: ${Object.keys(urlMap).length}`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
