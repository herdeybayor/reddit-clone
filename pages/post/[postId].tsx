import React from 'react'
import { useRouter } from 'next/router'
import Post from '../../components/Post'
import { gql, useQuery } from '@apollo/client'
import { GET_POST_BY_ID } from '../../graphql/queries'
function PostPage() {
  const router = useRouter()

  const { loading, error, data } = useQuery(GET_POST_BY_ID, {
    variables: {
      post_id: router.query.postId,
    },
  })

  const post = data?.getPostListById

  return (
    <div className="mx-auto my-7 max-w-5xl">
      <Post post={post} />
    </div>
  )
}

export default PostPage
