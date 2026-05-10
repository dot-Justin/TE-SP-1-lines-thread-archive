/**
 * fetch-avatars.mjs
 *
 * Reads all raw post JSONs, dedupes by username, downloads each avatar
 * from llllllll.co at 2x size (64px) and saves to raw/assets/avatars/.
 *
 * Run from site-src/: node scripts/fetch-avatars.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { execFileSync } from 'child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = join(__dirname, '..', '..')
const RAW_POSTS  = join(REPO_ROOT, 'raw', 'api', 'posts')
const OUT_DIR    = join(REPO_ROOT, 'raw', 'assets', 'avatars')

const AVATAR_SIZE = 64
const DELAY_MS = 120 // be polite to llllllll.co

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

function fetchAvatar(url, destPath) {
  // llllllll.co requires --tlsv1.2; Node's built-in fetch can't negotiate it
  execFileSync('curl', [
    '-L', '--tlsv1.2', '--max-time', '15', '--silent', '--fail',
    '-A', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    url, '-o', destPath,
  ])
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true })

  // Build username → avatar_template map from all raw posts
  const avatarMap = {}
  for (const fname of readdirSync(RAW_POSTS)) {
    const post = JSON.parse(readFileSync(join(RAW_POSTS, fname), 'utf8'))
    const { username, avatar_template } = post
    if (username && avatar_template && !avatarMap[username]) {
      avatarMap[username] = avatar_template
    }
  }

  const users = Object.entries(avatarMap)
  console.log(`Found ${users.length} unique users. Downloading avatars...\n`)

  let downloaded = 0
  let skipped = 0
  let failed = 0
  const results = {}

  for (const [username, template] of users) {
    const destPath = join(OUT_DIR, `${username}.png`)

    if (existsSync(destPath)) {
      results[username] = `${username}.png`
      skipped++
      continue
    }

    const url = 'https://llllllll.co' + template.replace('{size}', String(AVATAR_SIZE))

    try {
      fetchAvatar(url, destPath)
      results[username] = `${username}.png`
      downloaded++
      process.stdout.write(`  ✓ ${username}\n`)
    } catch (err) {
      failed++
      process.stdout.write(`  ✗ ${username}: ${err.message}\n`)
    }

    await sleep(DELAY_MS)
  }

  // Write manifest for prep-assets to consume
  writeFileSync(
    join(OUT_DIR, '_manifest.json'),
    JSON.stringify(results, null, 2)
  )

  console.log(`\nDone.`)
  console.log(`  Downloaded: ${downloaded}`)
  console.log(`  Skipped (already exist): ${skipped}`)
  console.log(`  Failed: ${failed}`)
}

main().catch(err => { console.error(err); process.exit(1) })
