import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CaretDown, CaretUp, ArrowSquareOut } from '@phosphor-icons/react'
import { PostContent } from './PostContent'
import type { Post } from '../types'

const MAX_DEPTH = 5

// Stagger container: children animate in sequence
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
}
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

function ReplyItem({
  post,
  postMap,
  replyIndex,
  urlMap,
  avatarMap,
  depth,
}: {
  post: Post
  postMap: Map<number, Post>
  replyIndex: Map<number, number[]>
  urlMap: Record<string, string>
  avatarMap: Record<string, string>
  depth: number
}) {
  const [expanded, setExpanded] = useState(false)
  const prefersReduced = useReducedMotion()
  const childNums = replyIndex.get(post.num) ?? []
  const hasChildren = childNums.length > 0
  const atDepthCap = depth >= MAX_DEPTH

  return (
    <div>
      {/* Author row */}
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <Avatar src={avatarMap[post.author]} author={post.author} />
        <span className="font-body font-medium text-te-text text-sm leading-none">{post.author}</span>
        {post.reply_to !== null && (
          <a
            href={`#${post.reply_to}`}
            className="font-mono text-[0.6rem] text-te-orange hover:underline tracking-wide leading-none"
            onClick={e => {
              e.preventDefault()
              document.getElementById(String(post.reply_to))?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }}
          >
            &#8627;&nbsp;#{String(post.reply_to).padStart(4, '0')}
          </a>
        )}
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
        <PostContent cooked={post.cooked} urlMap={urlMap} />

        {hasChildren && (
          <div className="mt-3">
            {atDepthCap ? (
              <a
                href={`#${childNums[0]}`}
                className="inline-flex items-center gap-1 font-mono text-[0.6rem] text-te-muted hover:text-te-orange tracking-wide transition-colors"
                onClick={e => {
                  e.preventDefault()
                  document.getElementById(String(childNums[0]))?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                }}
              >
                <ArrowSquareOut size={10} />
                continue thread → #{String(childNums[0]).padStart(4, '0')}
              </a>
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
              depth={depth}
            />
          </motion.div>
        )
      })}
    </motion.div>
  )
}
