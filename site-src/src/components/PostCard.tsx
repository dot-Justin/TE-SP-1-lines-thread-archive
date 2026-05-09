import { memo } from 'react'
import { AuthorTag } from './AuthorTag'
import { PostContent } from './PostContent'
import { MilestoneCard } from './MilestoneCard'
import { isMilestone } from '../lib/milestones'
import type { Post } from '../types'

interface PostCardProps {
  post: Post
  urlMap: Record<string, string>
}

export const PostCard = memo(function PostCard({ post, urlMap }: PostCardProps) {
  if (isMilestone(post.num)) {
    return <MilestoneCard post={post} urlMap={urlMap} />
  }

  const numStr = String(post.num).padStart(4, '0')
  const isHighLiked = post.likes >= 20

  return (
    <article
      id={`post-${post.num}`}
      className="group border-b border-te-border bg-te-black hover:bg-te-surface/40 transition-colors duration-200"
    >
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-6">
        {/* Post header */}
        <div className="flex items-center justify-between mb-4">
          {/* Post number */}
          <span
            className={`font-mono text-xs tracking-widest ${
              isHighLiked ? 'text-te-orange' : 'text-te-muted'
            }`}
          >
            #{numStr}
          </span>
        </div>

        {/* Author + meta */}
        <AuthorTag
          author={post.author}
          date={post.date}
          likes={post.likes}
          replyTo={post.reply_to}
        />

        {/* Divider */}
        <div className="h-px bg-te-border mt-4 mb-4" />

        {/* Content */}
        <PostContent cooked={post.cooked} urlMap={urlMap} />
      </div>
    </article>
  )
})
