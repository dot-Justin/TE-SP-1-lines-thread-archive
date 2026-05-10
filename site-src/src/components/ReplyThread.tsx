import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CaretDown, ArrowSquareOut } from '@phosphor-icons/react'
import { PostContent } from './PostContent'
import type { Post } from '../types'

const MAX_DEPTH = 5

// Item stagger: parent container sequences children with 40ms gaps
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
}

// Each item slides up + fades; author chars and content animate on top of this
const itemVariants = {
  hidden: { opacity: 0, y: 5 },
  show: { opacity: 1, y: 0, transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] as const } },
}

interface ReplyThreadProps {
  postNum: number
  postMap: Map<number, Post>
  replyIndex: Map<number, number[]>
  urlMap: Record<string, string>
  avatarMap: Record<string, string>
  onNavigateToPost?: (postNum: number) => void
  depth?: number
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function Avatar({ src, author }: { src?: string; author: string }) {
  const [failed, setFailed] = useState(false)
  const initials = author.split(/[^a-zA-Z]+/).filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('')

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={author}
        onError={() => setFailed(true)}
        className="w-6 h-6 rounded-full object-cover border border-te-border flex-shrink-0"
        loading="lazy"
      />
    )
  }
  return (
    <div className="w-6 h-6 rounded-full border border-te-border bg-te-surface flex items-center justify-center flex-shrink-0">
      <span className="font-mono text-[0.45rem] text-te-muted font-medium leading-none">{initials}</span>
    </div>
  )
}

// Per-character soft-blur-in, adapted from soft-blur-in spec at micro scale:
// blur 3px (spec: 12px → 6px for <24px text → 3px for 14px UI label)
// y 2px (spec: 16px → 9px site → 2px for compact row)
// duration 110ms per char, stagger 8ms
// Parent opacity-fade compounds with this for a "materializing" effect — no separate opacity needed here
function AnimatedName({ name, prefersReduced }: { name: string; prefersReduced: boolean | null }) {
  if (prefersReduced) return <>{name}</>
  return (
    <>
      {name.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ filter: 'blur(3px)', y: 2 }}
          animate={{ filter: 'blur(0px)', y: 0 }}
          transition={{
            duration: 0.11,
            delay: i * 0.008,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {char}
        </motion.span>
      ))}
    </>
  )
}

function ReplyItem({
  post,
  postMap,
  replyIndex,
  urlMap,
  avatarMap,
  onNavigateToPost,
  depth,
}: {
  post: Post
  postMap: Map<number, Post>
  replyIndex: Map<number, number[]>
  urlMap: Record<string, string>
  avatarMap: Record<string, string>
  onNavigateToPost?: (postNum: number) => void
  depth: number
}) {
  const [expanded, setExpanded] = useState(false)
  const prefersReduced = useReducedMotion()
  const childNums = replyIndex.get(post.num) ?? []
  const hasChildren = childNums.length > 0
  const atDepthCap = depth >= MAX_DEPTH
  const numStr = String(post.num).padStart(4, '0')

  return (
    <div>
      {/* Author row */}
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <Avatar src={avatarMap[post.author]} author={post.author} />

        {/* Name: per-character blur-in (soft-blur-in at micro scale) */}
        <span className="font-body font-medium text-te-text text-sm leading-none">
          <AnimatedName name={post.author} prefersReduced={prefersReduced} />
        </span>

        {/* Post number: middle dot + #NNNN linking to canonical post position */}
        <span className="font-mono text-[0.6rem] text-te-muted/50 leading-none select-none">·</span>
        <button
          className="font-mono text-[0.6rem] text-te-muted/60 hover:text-te-muted tracking-wide leading-none transition-colors"
          onClick={() => onNavigateToPost?.(post.num)}
        >
          #{numStr}
        </button>

        <div className="flex items-center gap-3 ml-auto">
          {post.likes > 0 && (
            <span className={`font-mono text-[0.6rem] tracking-wide leading-none ${post.likes >= 20 ? 'text-te-orange' : 'text-te-muted'}`}>
              ♥ {post.likes}
            </span>
          )}
          <span className="font-mono text-[0.6rem] text-te-muted tracking-wide leading-none">
            {formatDate(post.date)}
          </span>
        </div>
      </div>

      {/* Content + nested toggle */}
      <div className="pl-8">
        {/* Content: micro-scale-fade (scale 0.98→1 + opacity), 30ms after chars start */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.15,
            delay: 0.03,
            ease: [0.32, 0.72, 0, 1],
          }}
          style={{ transformOrigin: '0% 50%' }}
        >
          <PostContent cooked={post.cooked} urlMap={urlMap} />
        </motion.div>

        {hasChildren && (
          <div className="mt-3">
            {atDepthCap ? (
              <button
                className="inline-flex items-center gap-1 font-mono text-[0.6rem] text-te-muted hover:text-te-orange tracking-wide transition-colors"
                onClick={() => onNavigateToPost?.(childNums[0])}
              >
                <ArrowSquareOut size={10} />
                continue thread → #{String(childNums[0]).padStart(4, '0')}
              </button>
            ) : (
              <button
                onClick={() => setExpanded(v => !v)}
                className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] text-te-muted hover:text-te-orange tracking-wide transition-colors"
              >
                <motion.span
                  animate={{ rotate: expanded ? 180 : 0 }}
                  transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: 'flex' }}
                >
                  <CaretDown size={10} />
                </motion.span>
                {expanded ? 'hide' : childNums.length === 1 ? '1 reply' : `${childNums.length} replies`}
              </button>
            )}
          </div>
        )}

        <AnimatePresence>
          {expanded && !atDepthCap && (
            <motion.div
              key="nested"
              initial={prefersReduced ? false : { height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={prefersReduced ? {} : { height: 0, opacity: 0 }}
              transition={{
                height: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.15 },
              }}
              style={{ overflow: 'hidden' }}
            >
              <ReplyThread
                postNum={post.num}
                postMap={postMap}
                replyIndex={replyIndex}
                urlMap={urlMap}
                avatarMap={avatarMap}
                onNavigateToPost={onNavigateToPost}
                depth={depth + 1}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export function ReplyThread({
  postNum,
  postMap,
  replyIndex,
  urlMap,
  avatarMap,
  onNavigateToPost,
  depth = 1,
}: ReplyThreadProps) {
  const prefersReduced = useReducedMotion()
  const childNums = replyIndex.get(postNum) ?? []
  if (childNums.length === 0) return null

  return (
    <motion.div
      className="mt-4 border-l-2 border-te-border/50 pl-4 space-y-5"
      variants={prefersReduced ? undefined : containerVariants}
      initial={prefersReduced ? false : 'hidden'}
      animate={prefersReduced ? undefined : 'show'}
    >
      {childNums.map(num => {
        const post = postMap.get(num)
        if (!post) return null
        return (
          <motion.div
            key={num}
            variants={prefersReduced ? undefined : itemVariants}
          >
            <ReplyItem
              post={post}
              postMap={postMap}
              replyIndex={replyIndex}
              urlMap={urlMap}
              avatarMap={avatarMap}
              onNavigateToPost={onNavigateToPost}
              depth={depth}
            />
          </motion.div>
        )
      })}
    </motion.div>
  )
}
