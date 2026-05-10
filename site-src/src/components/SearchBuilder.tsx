import { useState, useMemo, useRef, type RefObject } from 'react'
import { X } from '@phosphor-icons/react'
import type { Post } from '../types'
import {
  parseQuery,
  hasFilter,
  addFilter,
  removeFilter,
  toggleFilter,
  type FilterKey,
} from '../lib/searchParser'

interface SearchBuilderProps {
  query: string
  setQuery: (q: string) => void
  posts: Post[]
  inputRef: RefObject<HTMLInputElement>
}

const HAS_CHIPS = [
  { value: 'image',      label: 'image' },
  { value: 'video',      label: 'video' },
  { value: 'link',       label: 'link' },
  { value: 'file',       label: 'file' },
  { value: 'embed',      label: 'embed' },
  { value: 'quote',      label: 'quote' },
  { value: 'code',       label: 'code' },
  { value: 'mention',    label: '@mention' },
] as const

const LIKES_CHIPS = [
  { value: '>5',  label: '♥ >5' },
  { value: '>20', label: '♥ >20' },
  { value: '>50', label: '♥ >50' },
] as const

const QUICK_AFTER = [
  { value: '2024-04', label: 'Apr 2024' },
  { value: '2025-01', label: 'Jan 2025' },
  { value: '2026-01', label: 'Jan 2026' },
]

// Re-focus the main search input after a builder interaction
function useApply(query: string, setQuery: (q: string) => void, inputRef: RefObject<HTMLInputElement>) {
  return (newQuery: string) => {
    setQuery(newQuery)
    requestAnimationFrame(() => inputRef.current?.focus())
  }
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onMouseDown={e => e.preventDefault()} // keep input focused
      onClick={onClick}
      className={`font-mono text-[0.6rem] tracking-wide px-2 py-0.5 rounded border transition-colors cursor-pointer ${
        active
          ? 'border-te-orange/50 bg-te-orange/15 text-te-orange'
          : 'border-te-border text-te-muted hover:border-te-muted/70 hover:text-te-text'
      }`}
    >
      {children}
    </button>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[0.55rem] text-te-muted/60 tracking-[0.2em] uppercase w-14 flex-shrink-0 pt-0.5">
      {children}
    </span>
  )
}

export function SearchBuilder({ query, setQuery, posts, inputRef }: SearchBuilderProps) {
  const [authorSearch, setAuthorSearch] = useState('')
  const afterInputRef = useRef<HTMLInputElement>(null)
  const beforeInputRef = useRef<HTMLInputElement>(null)

  const apply = useApply(query, setQuery, inputRef)
  const parsed = useMemo(() => parseQuery(query), [query])

  // Author list sorted by post count
  const authorList = useMemo(() => {
    const counts = new Map<string, number>()
    for (const p of posts) counts.set(p.author, (counts.get(p.author) ?? 0) + 1)
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([author, count]) => ({ author, count }))
  }, [posts])

  const filteredAuthors = useMemo(() => {
    if (!authorSearch.trim()) return authorList.slice(0, 12)
    const ql = authorSearch.toLowerCase()
    return authorList.filter(a => a.author.toLowerCase().includes(ql)).slice(0, 12)
  }, [authorList, authorSearch])

  const activeFrom = parsed.filters.find(f => f.key === 'from')
  const activeMentions = parsed.filters.find(f => f.key === 'mentions')
  const activeAfter = parsed.filters.find(f => f.key === 'after')
  const activeBefore = parsed.filters.find(f => f.key === 'before')

  function applyDateFilter(key: 'after' | 'before', value: string) {
    if (!value) return
    apply(addFilter(removeFilter(query, key), key, value))
  }

  return (
    <div
      className="absolute top-full left-0 right-0 z-[55] border-b border-te-border bg-te-black/98 backdrop-blur-md"
      // Prevent mousedown from blurring the main input
      onMouseDown={e => e.preventDefault()}
    >
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-4 space-y-3.5">

        {/* ── Active filters ── */}
        {parsed.filters.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pb-3 border-b border-te-border/40">
            <SectionLabel>active</SectionLabel>
            {parsed.filters.map((f, i) => (
              <button
                key={i}
                onMouseDown={e => e.preventDefault()}
                onClick={() => apply(removeFilter(query, f.key, f.value))}
                className="inline-flex items-center gap-1 font-mono text-[0.6rem] text-te-orange border border-te-orange/30 bg-te-orange/10 px-2 py-0.5 rounded hover:bg-te-orange/20 transition-colors"
              >
                {f.raw}
                <X size={8} />
              </button>
            ))}
          </div>
        )}

        {/* ── has: ── */}
        <div className="flex flex-wrap items-start gap-2">
          <SectionLabel>has:</SectionLabel>
          <div className="flex flex-wrap gap-1.5">
            {HAS_CHIPS.map(opt => (
              <Chip
                key={opt.value}
                active={hasFilter(query, 'has', opt.value)}
                onClick={() => apply(toggleFilter(query, 'has', opt.value))}
              >
                {opt.label}
              </Chip>
            ))}
          </div>
        </div>

        {/* ── likes: ── */}
        <div className="flex flex-wrap items-center gap-2">
          <SectionLabel>likes:</SectionLabel>
          <div className="flex gap-1.5">
            {LIKES_CHIPS.map(opt => (
              <Chip
                key={opt.value}
                active={hasFilter(query, 'likes', opt.value)}
                onClick={() => apply(toggleFilter(query, 'likes', opt.value))}
              >
                {opt.label}
              </Chip>
            ))}
          </div>
        </div>

        {/* ── after: / before: ── */}
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {/* after */}
          <div className="flex items-center gap-2">
            <SectionLabel>after:</SectionLabel>
            <div className="flex items-center gap-1.5">
              {QUICK_AFTER.map(q => (
                <Chip
                  key={q.value}
                  active={hasFilter(query, 'after', q.value)}
                  onClick={() => {
                    const next = removeFilter(query, 'after')
                    apply(hasFilter(query, 'after', q.value) ? next : addFilter(next, 'after', q.value))
                  }}
                >
                  {q.label}
                </Chip>
              ))}
              <input
                ref={afterInputRef}
                type="text"
                placeholder="YYYY-MM"
                defaultValue={activeAfter?.value ?? ''}
                onMouseDown={e => e.stopPropagation()} // allow this input to focus
                className="font-mono text-[0.6rem] bg-te-surface border border-te-border text-te-text px-2 py-0.5 rounded w-[5.5rem] focus:outline-none focus:border-te-orange placeholder:text-te-muted/40"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    const val = afterInputRef.current?.value.trim()
                    if (val) applyDateFilter('after', val)
                  }
                }}
              />
            </div>
          </div>

          {/* before */}
          <div className="flex items-center gap-2">
            <SectionLabel>before:</SectionLabel>
            <input
              ref={beforeInputRef}
              type="text"
              placeholder="YYYY-MM"
              defaultValue={activeBefore?.value ?? ''}
              onMouseDown={e => e.stopPropagation()}
              className="font-mono text-[0.6rem] bg-te-surface border border-te-border text-te-text px-2 py-0.5 rounded w-[5.5rem] focus:outline-none focus:border-te-orange placeholder:text-te-muted/40"
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  const val = beforeInputRef.current?.value.trim()
                  if (val) applyDateFilter('before', val)
                }
              }}
            />
          </div>
        </div>

        {/* ── from: (author search) ── */}
        <div className="flex items-start gap-2">
          <SectionLabel>from:</SectionLabel>
          <div className="flex-1 min-w-0">
            {activeFrom && (
              <div className="mb-1.5">
                <button
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => apply(removeFilter(query, 'from'))}
                  className="inline-flex items-center gap-1 font-mono text-[0.6rem] text-te-orange border border-te-orange/30 bg-te-orange/10 px-2 py-0.5 rounded hover:bg-te-orange/20 transition-colors"
                >
                  from:{activeFrom.value} <X size={8} />
                </button>
              </div>
            )}
            <input
              type="text"
              value={authorSearch}
              onChange={e => setAuthorSearch(e.target.value)}
              placeholder="filter authors…"
              onMouseDown={e => e.stopPropagation()}
              className="font-mono text-[0.6rem] bg-te-surface border border-te-border text-te-text px-2 py-1 rounded w-full max-w-[200px] focus:outline-none focus:border-te-orange placeholder:text-te-muted/40 mb-1.5"
            />
            <div className="flex flex-wrap gap-1">
              {filteredAuthors.map(({ author, count }) => {
                const isActive = activeFrom?.value === author.toLowerCase()
                return (
                  <button
                    key={author}
                    onMouseDown={e => e.preventDefault()}
                    onClick={() => {
                      const next = removeFilter(query, 'from')
                      apply(isActive ? next : addFilter(next, 'from', author))
                    }}
                    className={`inline-flex items-center gap-1.5 font-mono text-[0.6rem] px-2 py-0.5 rounded border transition-colors ${
                      isActive
                        ? 'border-te-orange/50 bg-te-orange/15 text-te-orange'
                        : 'border-te-border text-te-muted hover:border-te-muted/70 hover:text-te-text'
                    }`}
                  >
                    {author}
                    <span className="opacity-35 text-[0.5rem]">{count}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── mentions: (author search) ── */}
        <div className="flex items-start gap-2">
          <SectionLabel>mentions:</SectionLabel>
          <div className="flex-1 min-w-0">
            {activeMentions && (
              <div className="mb-1.5">
                <button
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => apply(removeFilter(query, 'mentions'))}
                  className="inline-flex items-center gap-1 font-mono text-[0.6rem] text-te-orange border border-te-orange/30 bg-te-orange/10 px-2 py-0.5 rounded hover:bg-te-orange/20 transition-colors"
                >
                  mentions:{activeMentions.value} <X size={8} />
                </button>
              </div>
            )}
            <div className="flex flex-wrap gap-1">
              {authorList.slice(0, 8).map(({ author }) => {
                const isActive = activeMentions?.value === author.toLowerCase()
                return (
                  <button
                    key={author}
                    onMouseDown={e => e.preventDefault()}
                    onClick={() => {
                      const next = removeFilter(query, 'mentions')
                      apply(isActive ? next : addFilter(next, 'mentions', author))
                    }}
                    className={`font-mono text-[0.6rem] px-2 py-0.5 rounded border transition-colors ${
                      isActive
                        ? 'border-te-orange/50 bg-te-orange/15 text-te-orange'
                        : 'border-te-border text-te-muted hover:border-te-muted/70 hover:text-te-text'
                    }`}
                  >
                    @{author}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── tip ── */}
        <div className="pt-1.5 border-t border-te-border/30 flex items-center justify-between">
          <p className="font-mono text-[0.5rem] text-te-muted/40 tracking-wide">
            filters combine: <span className="text-te-muted/60">from:timk has:image after:2025-01</span>
          </p>
          <p className="font-mono text-[0.5rem] text-te-muted/30 tracking-wide">
            esc to close
          </p>
        </div>

      </div>
    </div>
  )
}
