import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CaretDown, CaretUp } from '@phosphor-icons/react'
import { getMilestone } from '../lib/milestones'
import { AuthorTag } from './AuthorTag'
import { PostContent } from './PostContent'
import { ReplyThread } from './ReplyThread'
import type { Post } from '../types'

interface MilestoneCardProps {
  post: Post
  urlMap: Record<string, string>
  avatarMap: Record<string, string>
  replyIndex: Map<number, number[]>
  postMap: Map<number, Post>
  isMatch?: boolean
  onNavigateToPost?: (postNum: number) => void
}

export function MilestoneCard({ post, urlMap, avatarMap, replyIndex, postMap, isMatch, onNavigateToPost }: MilestoneCardProps) {
  const prefersReduced = useReducedMotion()
  const [repliesOpen, setRepliesOpen] = useState(false)
  const milestone = getMilestone(post.num)
  if (!milestone) return null

  const numStr = String(post.num).padStart(4, '0')

  return (
    <motion.div
      id={String(post.num)}
      initial={prefersReduced ? false : { opacity: 0, y: 20 }}
      whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
      viewport={prefersReduced ? undefined : { once: true, margin: '-80px' }}
      transition={prefersReduced ? undefined : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`relative bg-te-surface2 border-y border-te-orange/30 overflow-hidden ${
        isMatch ? 'border-l-2 border-l-te-orange' : ''
      }`}
      style={{ margin: '0 calc(-1 * var(--thread-gutter, 0px))' }}
    >
      {/* Ghost post number watermark */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 font-display font-black text-te-text/[0.04] leading-none pointer-events-none select-none"
        style={{ fontSize: 'clamp(8rem, 20vw, 18rem)' }}
        aria-hidden
      >
        {numStr}
      </div>

      {/* Orange top border accent */}
      <div className="h-[2px] bg-te-orange w-full" />

      <div className="relative px-6 md:px-12 py-10 md:py-14 max-w-5xl mx-auto">
        {/* Milestone label */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <div className="font-mono text-[0.6rem] text-te-orange tracking-[0.25em] uppercase mb-2">
              MILESTONE
            </div>
            <h2
              className="font-display font-black text-te-text uppercase leading-none tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
            >
              {milestone.label}
            </h2>
            <p className="font-mono text-te-muted text-xs mt-2 tracking-wide">
              {milestone.sublabel}
            </p>
          </div>

          {/* Post number tag — links to original forum post */}
          <a
            href={`https://llllllll.co/t/te-stem-player/66795/${post.num}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 font-mono text-te-orange text-xs tracking-widest border border-te-orange/40 px-3 py-1.5 rounded hover:border-te-orange hover:bg-te-orange/10 transition-colors"
            title="View on llllllll.co"
          >
            #{numStr}
          </a>
        </div>

        {/* Post meta */}
        <AuthorTag
          author={post.author}
          date={post.date}
          likes={post.likes}
          replyTo={post.reply_to}
          avatarSrc={avatarMap[post.author]}
        />

        {/* Divider */}
        <div className="h-px bg-te-border my-5" />

        {/* Content */}
        <PostContent cooked={post.cooked} urlMap={urlMap} />

        {/* Reply toggle */}
        {(() => {
          const directReplies = replyIndex.get(post.num) ?? []
          if (directReplies.length === 0) return null
          return (
            <>
              <div className="h-px bg-te-border/50 mt-5 mb-3" />
              <button
                onClick={() => setRepliesOpen(v => !v)}
                className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] text-te-muted hover:text-te-orange tracking-wide transition-colors"
              >
                {repliesOpen ? <CaretUp size={11} /> : <CaretDown size={11} />}
                {repliesOpen ? 'hide replies' : directReplies.length === 1 ? '1 reply' : `${directReplies.length} replies`}
              </button>
              <AnimatePresence>
                {repliesOpen && (
                  <motion.div
                    key="replies"
                    initial={prefersReduced ? false : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={prefersReduced ? {} : { height: 0, opacity: 0 }}
                    transition={{
                      height: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 0.18 },
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
                      depth={1}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )
        })()}
      </div>

      {/* Bottom border accent */}
      <div className="h-[2px] bg-te-orange/30 w-full" />
    </motion.div>
  )
}
