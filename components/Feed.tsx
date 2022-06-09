import { useQuery } from '@apollo/client'
import { Jelly } from '@uiball/loaders'
import React from 'react'
import { GET_ALL_POST, GET_POST_BY_TOPIC } from '../graphql/queries'
import { Post as PostType } from '../typings'
import Post from './Post'

type Props = {
  topic?: string
}

function Feed({ topic }: Props) {
  const { data, error } = !topic
    ? useQuery(GET_ALL_POST)
    : useQuery(GET_POST_BY_TOPIC, {
        variables: {
          topic: topic,
        },
      })

  const posts: PostType[] = !topic
    ? data?.getPostList
    : data?.getPostListByTopic

  return (
    <div className="mt-5 flex-1 space-y-4">
      {!posts && (
        <div className="flex w-full items-center justify-center p-10 text-xl">
          <Jelly size={50} speed={0.9} color="#ff4501" />
        </div>
      )}
      {posts?.map((post) => (
        <Post truncate key={post.id} post={post} />
      ))}
    </div>
  )
}

export default Feed
