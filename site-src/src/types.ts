export interface Post {
  num: number
  id: number
  author: string
  date: string
  reply_to: number | null
  likes: number
  word_count: number
  cooked: string
  images?: number
  attachments?: number
}

export interface Stats {
  total_posts: number
  total_participants: number
  total_views: number
  total_likes: number
  total_uploads: number
  total_replies: number
  first_post_at: string
  last_post_at: string
  topic_title: string
}

export type TopicFilter =
  | 'all'
  | 'hardware'
  | 'audio'
  | 'firmware'
  | 'bootloader'
  | 'reverse_engineering'
