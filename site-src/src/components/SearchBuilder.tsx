import { useState, useMemo, useRef, useEffect, type RefObject } from 'react'
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
  { value: 'image',   label: 'image' },
  { value: 'video',   label: 'video' },
  { value: 'link',    label: 'link' },
  { value: 'file',    label: 'file' },
  { value: 'embed',   label: 'embed' },
  { value: 'quote',   label: 'quote' },
  { value: 'code',    label: 'code' },
  { value: 'mention', label: '@mention' },
] as const

const LIKES_CHIPS = [
  { value: '>5',  label: '♥ >5' },
  { value: '>20', label: '♥ >20' },
  { value: '>50', label: '♥ >50' },
] as const

const MONTH_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function useApply(query: string, setQuery: (q: string) => void, inputRef: RefObject<HTMLInputElement>) {
  return (newQuery: string) => {
    setQuery(newQuery)
    requestAnimationFrame(() => inputRef.current?.focus())
  }
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onMouseDown={e => e.preventDefault()}
      onClick={onClick}
      className={`font-mono text-[0.65rem] tracking-wide px-2.5 py-1 rounded border transition-colors cursor-pointer ${
        active
          ? 'border-te-orange/50 bg-te-orange/15 text-te-orange'
          : 'border-te-border text-te-muted hover:border-te-muted/70 hover:text-te-text'
      }`}
    >
      {children}
    </button>
  )
}

function ColLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[0.5rem] text-te-muted/60 tracking-[0.3em] uppercase mb-4 select-none">
      {children}
    </p>
  )
}

function RowLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[0.6rem] text-te-muted/75 tracking-[0.12em] uppercase block mb-1.5 select-none">
      {children}
    </span>
  )
}

const textInput = "font-mono text-[0.65rem] bg-te-surface border border-te-border text-te-text px-2 py-1 rounded focus:outline-none focus:border-te-orange placeholder:text-te-muted/40"
const selectCls = `${textInput} appearance-none cursor-pointer`

// --- DateRow ---

interface DateRowProps {
  label: string
  filterKey: 'after' | 'before'
  activeValue: string   // current raw filter value e.g. "2025-04-01" or ""
  query: string
  apply: (q: string) => void
  yearOptions: string[]
  monthsByYear: Map<string, string[]>
}

function DateRow({ label, filterKey, activeValue, query, apply, yearOptions, monthsByYear }: DateRowProps) {
  const parts = activeValue.split('-')
  const [year,  setYear]  = useState(parts[0] ?? '')
  const [month, setMonth] = useState(parts[1] ?? '')
  const [day,   setDay]   = useState(parts[2] ?? '')

  // Sync when filter is removed externally (e.g. via active filter chip)
  useEffect(() => {
    const p = activeValue.split('-')
    setYear(p[0] ?? '')
    setMonth(p[1] ?? '')
    setDay(p[2] ?? '')
  }, [activeValue])

  const availableMonths = year ? (monthsByYear.get(year) ?? []) : []

  function applyParts(y: string, m: string, d: string) {
    const val = [y, m, d].filter(Boolean).join('-')
    const base = removeFilter(query, filterKey)
    apply(val ? addFilter(base, filterKey, val) : base)
  }

  function handleYear(y: string) {
    setYear(y)
    // reset month/day if year cleared or month no longer valid
    const newMonths = y ? (monthsByYear.get(y) ?? []) : []
    const newMonth = newMonths.includes(month) ? month : ''
    const newDay = newMonth ? day : ''
    setMonth(newMonth)
    setDay(newDay)
    applyParts(y, newMonth, newDay)
  }

  function handleMonth(m: string) {
    setMonth(m)
    const newDay = m ? day : ''
    setDay(newDay)
    applyParts(year, m, newDay)
  }

  function handleDay(d: string) {
    setDay(d)
    applyParts(year, month, d)
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="font-mono text-[0.6rem] text-te-muted/75 tracking-[0.12em] uppercase w-12 shrink-0 select-none">
        {label}
      </span>

      {/* Year */}
      <div className="relative">
        <select
          value={year}
          onChange={e => handleYear(e.target.value)}
          onMouseDown={e => e.stopPropagation()}
          className={`${selectCls} pr-5 w-[4.5rem]`}
        >
          <option value="">year</option>
          {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
        <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-te-muted/50 text-[0.5rem]">▾</span>
      </div>

      {/* Month */}
      <div className="relative">
        <select
          value={month}
          onChange={e => handleMonth(e.target.value)}
          onMouseDown={e => e.stopPropagation()}
          disabled={!year || availableMonths.length === 0}
          className={`${selectCls} pr-5 w-[4.5rem] disabled:opacity-30 disabled:cursor-not-allowed`}
        >
          <option value="">mo</option>
          {availableMonths.map(m => (
            <option key={m} value={m}>{MONTH_SHORT[parseInt(m, 10) - 1]}</option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-te-muted/50 text-[0.5rem]">▾</span>
      </div>

      {/* Day */}
      <input
        type="number"
        min={1}
        max={31}
        placeholder="dd"
        value={day}
        disabled={!month}
        onMouseDown={e => e.stopPropagation()}
        onChange={e => handleDay(e.target.value.slice(0, 2))}
        className={`${textInput} w-14 disabled:opacity-30 disabled:cursor-not-allowed [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
      />
    </div>
  )
}

// --- Main component ---

export function SearchBuilder({ query, setQuery, posts, inputRef }: SearchBuilderProps) {
  const [authorSearch, setAuthorSearch] = useState('')
  const numInputRef = useRef<HTMLInputElement>(null)

  const apply  = useApply(query, setQuery, inputRef)
  const parsed = useMemo(() => parseQuery(query), [query])

  const authorList = useMemo(() => {
    const counts = new Map<string, number>()
    for (const p of posts) counts.set(p.author, (counts.get(p.author) ?? 0) + 1)
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([author, count]) => ({ author, count }))
  }, [posts])

  const filteredAuthors = useMemo(() => {
    const q = authorSearch.trim()
    if (!q) return authorList.slice(0, 6)
    const ql = q.toLowerCase()
    return authorList.filter(a => a.author.toLowerCase().includes(ql)).slice(0, 10)
  }, [authorList, authorSearch])

  // Derive year/month options from actual post dates
  const { yearOptions, monthsByYear } = useMemo(() => {
    const byYear = new Map<string, Set<string>>()
    for (const p of posts) {
      const d = new Date(p.date)
      const y = String(d.getFullYear())
      const m = String(d.getMonth() + 1).padStart(2, '0')
      if (!byYear.has(y)) byYear.set(y, new Set())
      byYear.get(y)!.add(m)
    }
    const yearOptions = Array.from(byYear.keys()).sort()
    const monthsByYear = new Map<string, string[]>()
    for (const [y, ms] of byYear) {
      monthsByYear.set(y, Array.from(ms).sort())
    }
    return { yearOptions, monthsByYear }
  }, [posts])

  const activeFrom     = parsed.filters.find(f => f.key === 'from')
  const activeMentions = parsed.filters.find(f => f.key === 'mentions')
  const activeAfter    = parsed.filters.find(f => f.key === 'after')
  const activeBefore   = parsed.filters.find(f => f.key === 'before')
  const activeNum      = parsed.filters.find(f => f.key === 'num')

  useEffect(() => {
    if (numInputRef.current) numInputRef.current.value = activeNum?.value ?? ''
  }, [activeNum?.value])

  return (
    <div onMouseDown={e => e.preventDefault()}>
      <div className="max-w-5xl mx-auto px-4 md:px-8 pt-5 pb-4">

        {/* Active filters */}
        {parsed.filters.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pb-3 mb-4 border-b border-te-border/30">
            {parsed.filters.map((f, i) => (
              <button
                key={i}
                onMouseDown={e => e.preventDefault()}
                onClick={() => apply(removeFilter(query, f.key, f.value))}
                className="inline-flex items-center gap-1 font-mono text-[0.65rem] text-te-orange border border-te-orange/30 bg-te-orange/10 px-2.5 py-1 rounded hover:bg-te-orange/20 transition-colors"
              >
                {f.raw} <X size={8} />
              </button>
            ))}
          </div>
        )}

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-0">

          {/* ── LEFT: Content & engagement ── */}
          <div className="md:pr-8 space-y-4">
            <ColLabel>Content</ColLabel>

            <div>
              <RowLabel>has:</RowLabel>
              <div className="flex flex-wrap gap-1">
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

            <div className="flex items-start gap-6">
              <div>
                <RowLabel>likes:</RowLabel>
                <div className="flex gap-1">
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

              <div>
                <RowLabel>#:</RowLabel>
                <input
                  ref={numInputRef}
                  type="number"
                  min={1}
                  placeholder="post #"
                  defaultValue={activeNum?.value ?? ''}
                  onMouseDown={e => e.stopPropagation()}
                  className={`${textInput} w-20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      const val = numInputRef.current?.value.trim()
                      if (val && /^\d+$/.test(val)) {
                        apply(addFilter(removeFilter(query, 'num'), 'num', val))
                      } else if (!val) {
                        apply(removeFilter(query, 'num'))
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* ── RIGHT: People ── */}
          <div className="md:pl-8 md:border-l md:border-te-border/30 space-y-4">
            <ColLabel>People</ColLabel>

            <div>
              <RowLabel>from:</RowLabel>
              <input
                type="text"
                value={authorSearch}
                onChange={e => setAuthorSearch(e.target.value)}
                placeholder="filter authors…"
                onMouseDown={e => e.stopPropagation()}
                className={`${textInput} w-full max-w-[180px] mb-1.5`}
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
                      className={`inline-flex items-center gap-1 font-mono text-[0.65rem] px-2.5 py-1 rounded border transition-colors ${
                        isActive
                          ? 'border-te-orange/50 bg-te-orange/15 text-te-orange'
                          : 'border-te-border text-te-muted hover:border-te-muted/70 hover:text-te-text'
                      }`}
                    >
                      {author}
                      <span className="opacity-30 text-[0.5rem]">{count}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <RowLabel>mentions:</RowLabel>
              <div className="flex flex-wrap gap-1">
                {authorList.slice(0, 6).map(({ author }) => {
                  const isActive = activeMentions?.value === author.toLowerCase()
                  return (
                    <button
                      key={author}
                      onMouseDown={e => e.preventDefault()}
                      onClick={() => {
                        const next = removeFilter(query, 'mentions')
                        apply(isActive ? next : addFilter(next, 'mentions', author))
                      }}
                      className={`font-mono text-[0.65rem] px-2.5 py-1 rounded border transition-colors ${
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
        </div>

        {/* ── Date range ── */}
        <div className="mt-5 pt-4 border-t border-te-border/30 space-y-2">
          <ColLabel>Date Range</ColLabel>
          <DateRow
            label="after:"
            filterKey="after"
            activeValue={activeAfter?.value ?? ''}
            query={query}
            apply={apply}
            yearOptions={yearOptions}
            monthsByYear={monthsByYear}
          />
          <DateRow
            label="before:"
            filterKey="before"
            activeValue={activeBefore?.value ?? ''}
            query={query}
            apply={apply}
            yearOptions={yearOptions}
            monthsByYear={monthsByYear}
          />
        </div>

        {/* Bottom hint */}
        <div className="mt-4 pt-2 border-t border-te-border/30 flex items-center justify-between">
          <p className="font-mono text-[0.55rem] text-te-muted/45 tracking-wide">
            filters combine: <span className="text-te-muted/65">from:timk has:image after:2025-04</span>
          </p>
          <p className="font-mono text-[0.55rem] text-te-muted/35 tracking-wide">esc to close</p>
        </div>

      </div>
    </div>
  )
}
