# TE SP-1 Lines Thread Archive

> permanent archive of the Teenage Engineering Stem Player reverse-engineering thread on [llllllll.co](https://llllllll.co/t/te-stem-player/66795). 846 posts, 179 participants, April 2024 - May 2026.

---

## What This Is

A complete scrape of the Lines forum thread about cracking the TE Stem Player (the pre-Kano prototype from ~2018). Everything preserved — every post, every reply, every file upload, all formatting. Two formats:

- **`raw/`** — direct-from-API JSON. Every field Discourse exposed, verbatim HTML, all metadata. What the server actually sent.
- **`agent/`** — clean markdown with YAML frontmatter. One file per post, plus a single `thread.md` for dumping into an LLM context window without fighting HTML.

The goal: when the Lines thread eventually goes down, nothing is lost.

---

## Structure

```
raw/
├── api/topic.json           Full JSON print of all 846 posts
├── api/posts/               Per-post API JSON (includes raw markdown field)
├── posts/                   Rendered HTML post files
└── metadata/                Stats, participant list, upload manifest

agent/
├── thread.md                Whole thread in one markdown file — drop this into Claude/GPT
├── posts/001.md — 893.md    Per-post with YAML frontmatter (author, date, reply chain, likes)
├── indexes/                 Structured JSON for programmatic access
│   ├── post-index.json
│   ├── participant-index.json
│   └── attachment-index.json
└── summaries/               Pre-computed overviews

site/                        Browsable HTML archive (see below)
```

---

## Usage

### AI / LLM ingestion

```bash
# Full thread — best for context windows
cat agent/thread.md

# Per-post for targeted retrieval
cat agent/posts/042.md

# Structured metadata for filtering
cat agent/indexes/participant-index.json
```

Each agent post has YAML frontmatter:

```yaml
---
post_number: 42
author: username
created_at: 2024-04-15T14:30:00Z
reply_to: 17
likes: 12
word_count: 240
attachments: 0
---
```

### Raw data access

```bash
# Full API response
cat raw/api/topic.json

# Per-post with all Discourse metadata
cat raw/api/posts/694337.json
```

### Browsable archive

The `site/` directory is a standalone HTML archive with search and pagination. It's designed to be served as a static site — drop it behind any web server or use GitHub Pages.

---

## What's Here

The thread covers the community's work on the TE Stem Player prototype:

- **Bootloader crack** — USB-C bypass of TE's firmware lock
- **Hardware specs** — Nordic nRF52840 SoC, Cirrus CS42L42 codec, TI TAS2505 amp
- **Debug mode** — hold Track 1+4 while plugging USB-C for 60s serial interface
- **3D models** — belt clip, magnetic case, 1:1 scale model
- **Solderless Engineering** — web-based firmware flashing utility
- **~675 uploads** — firmware dumps, teardown photos, PCB scans, datasheets

---

## Why Two Formats

**raw/** preserves exactly what the Discourse API returned. If you're writing a tool that needs the original data, this is your source of truth. All fields, all formatting, nothing cleaned up.

**agent/** was designed for LLMs. Markdown instead of HTML, resolved reply chains, YAML headers for metadata filtering, pre-computed summaries of key discoveries. It's what you feed an agent when you want it to understand the thread without fighting 846 nested HTML blocks.

---

## What the agent format optimizes for

- Sequential post numbering means chunk boundaries are obvious to a retriever
- YAML frontmatter lets an LLM filter by author, date range, or engagement without parsing prose
- `thread.md` is a single contiguous document — no stitching, no missing context
- Pre-computed summaries compress 2 years of work into a few hundred tokens for initial orientation
- Attachment-index links filenames to post numbers so file provenance is traceable

---

## Notes

- Thread is closed. One-shot archive, no refresh needed.
- Largest upload is ~1.7 MB — everything fits in the repo.
- S3 mirror at `https://s3.dotjust.in/te-sp-1-lines-thread-archive/` (requires Cloudflare Access token like the Discord archive).
- Per-post JSONs include the `raw` field with original Discourse markdown where available.

---

## Links

- **Live archive**: [`https://sp-1.dotjust.in/`](https://sp-1.dotjust.in/) — browsable, searchable, up now
- [Original Thread](https://llllllll.co/t/te-stem-player/66795)
- [Solderless Engineering](https://solderless.engineering/) — Custom firmware utility
- [TE SP-1 Dev Discord](https://discord.gg/y4V6VfHYck)
- [Discord Archive](https://github.com/dot-Justin/TE-SP-1-Dev-discord-archive)

---

Scraped May 2026.