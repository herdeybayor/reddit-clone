import React from 'react'
import { useRouter } from 'next/router'
import Post from '../../components/Post'
import { gql, useQuery } from '@apollo/client'
import { GET_POST_BY_ID } from '../../graphql/queries'
function PostPage() {
  const router = useRouter()

  const { loading, error, data } = useQuery(GET_POST_BY_ID, {
    variables: {
      post_id: '57',
    },
  })
  console.log(data, error)

  const post = data?.getPostById

  return (
    <div>
      <Post post={post} />
    </div>
  )
}

export default PostPage
