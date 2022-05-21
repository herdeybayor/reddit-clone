import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_ALL_POST } from '../graphql/queries'
import { Post as PostType } from '../typings'
import Post from './Post'

function Feed() {
  const { data, error } = useQuery(GET_ALL_POST)

  const posts: PostType[] = data?.getPostList

  return (
    <div className="mt-5 space-y-4">
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}

export default Feed
