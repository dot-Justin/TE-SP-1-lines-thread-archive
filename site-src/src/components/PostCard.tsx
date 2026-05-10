import { memo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CaretDown, CaretUp } from '@phosphor-icons/react'
import { AuthorTag } from './AuthorTag'
import { PostContent } from './PostContent'
import { MilestoneCard } from './MilestoneCard'
import { ReplyThread } from './ReplyThread'
import { isMilestone } from '../lib/milestones'
import type { Post } from '../types'

interface PostCardProps {
  post: Post
  urlMap: Record<string, string>
  avatarMap: Record<string, string>
  replyIndex: Map<number, number[]>
  postMap: Map<number, Post>
  isMatch?: boolean
  onNavigateToPost?: (postNum: number) => void
}

export const PostCard = memo(function PostCard({ post, urlMap, avatarMap, replyIndex, postMap, isMatch, onNavigateToPost }: PostCardProps) {
  const [repliesOpen, setRepliesOpen] = useState(false)
  const prefersReduced = useReducedMotion()

  if (isMilestone(post.num)) {
    return <MilestoneCard post={post} urlMap={urlMap} avatarMap={avatarMap} replyIndex={replyIndex} postMap={postMap} isMatch={isMatch} onNavigateToPost={onNavigateToPost} />
  }

  const numStr = String(post.num).padStart(4, '0')
  const isHighLiked = post.likes >= 20
  const directReplies = replyIndex.get(post.num) ?? []
  const hasReplies = directReplies.length > 0

  return (
    <article
      id={String(post.num)}
      className={`group border-b border-te-border bg-te-black hover:bg-te-surface/40 transition-colors duration-200 ${
        isMatch ? 'border-l-2 border-l-te-orange' : ''
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-6">
        {/* Post header */}
        <div className="flex items-center justify-between mb-4">
          <a
            href={`https://llllllll.co/t/te-stem-player/66795/${post.num}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-mono text-xs tracking-widest hover:text-te-orange transition-colors ${
              isHighLiked ? 'text-te-orange' : 'text-te-muted'
            }`}
            title="View on llllllll.co"
          >
            #{numStr}
          </a>
        </div>

        {/* Author + meta */}
        <AuthorTag
          author={post.author}
          date={post.date}
          likes={post.likes}
          replyTo={post.reply_to}
          avatarSrc={avatarMap[post.author]}
        />

        {/* Divider */}
        <div className="h-px bg-te-border mt-4 mb-4" />

        {/* Content */}
        <PostContent cooked={post.cooked} urlMap={urlMap} />

        {/* Reply toggle */}
        {hasReplies && (
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
        )}
      </div>
    </article>
  )
})
