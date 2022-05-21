export type FormData = {
  postTitle: string
  postBody: string
  postImage: string
  subreddit: string
}

export type Post = {
  body: string
  created_at: string
  id: number
  image: string
  subreddit_id: string
  title: string
  username: string
  subreddit: Subreddit[]
  comments: Comment[]
  votes: Vote[]
}

export type Subreddit = {
  created_at: string
  topic: string
  id: number
}

export type Comment = {
  created_at: string
  id: number
  post_id: number
  text: string
  username: string
}

export type Vote = {
  created_at: string
  id: number
  post_id: number
  upvote: boolean
  username: string
}
