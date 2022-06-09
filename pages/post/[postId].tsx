import React from 'react'
import { useRouter } from 'next/router'
import Post from '../../components/Post'
import { gql, useMutation, useQuery } from '@apollo/client'
import { GET_POST_BY_ID } from '../../graphql/queries'
import { useSession } from 'next-auth/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { ADD_COMMENT } from '../../graphql/mutations'
import { Post as PostType } from '../../typings'
import Avatar from '../../components/Avatar'
import ReactTimeago from 'react-timeago'
import Head from 'next/head'

type FormData = {
  comment: string
}

function PostPage() {
  const router = useRouter()
  const { data: session } = useSession()

  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [GET_POST_BY_ID, 'getPostList'],
  })

  const { loading, error, data } = useQuery(GET_POST_BY_ID, {
    variables: {
      post_id: router.query.postId,
    },
  })

  const post: PostType = data?.getPostListById

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data)
    const notification = toast('Posting your comment...')

    try {
      await addComment({
        variables: {
          post_id: router.query.postId,
          username: session?.user?.name,
          text: data.comment,
        },
      })

      toast.success('Comment posted!', {
        id: notification,
      })
    } catch (error) {
      console.log(error)
      toast.error('Whoops something went wrong!', {
        id: notification,
      })
    } finally {
      setValue('comment', '')
    }
  }

  return (
    <div className="my-7 mx-auto max-w-5xl px-5">
      <Head>
        <title>
          {!post
            ? 'loading...'
            : `r/${post?.subreddit[0]?.topic} || ${post?.title}`}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="group">
        <Post post={post} />
        {!loading && (
          <>
            <div className="-mt-1 rounded-b-md border border-t-0 border-gray-300 bg-white p-5 pl-16 group-hover:border-gray-600">
              <p className="text-sm">
                Comment as{' '}
                <span className="text-red-500">{session?.user?.name}</span>
              </p>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col space-y-2"
              >
                <textarea
                  {...register('comment', { required: true })}
                  className="h-24 rounded-md border border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-50"
                  placeholder={
                    session
                      ? 'What are your thoughts'
                      : 'Please sign in to comment'
                  }
                  disabled={!session}
                />
                <button
                  disabled={!watch('comment')}
                  type="submit"
                  className="rounded-full bg-red-500 p-3 font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-200"
                >
                  Comment
                </button>
              </form>
            </div>

            <div className="-my-5 overflow-hidden rounded-b-md border border-t-0 border-gray-300 bg-white py-5 px-10 pb-10 group-hover:border-gray-600">
              <hr className="py-2" />
              {post?.comments.map((comment) => (
                <div
                  className="relative flex items-center space-x-2 space-y-5"
                  key={comment.id}
                >
                  <hr className="absolute top-10 left-7 z-0 h-16 border" />
                  <div className="z-20">
                    <Avatar seed={comment.username} />
                  </div>

                  <div className="flex flex-col">
                    <p className="py-2 text-xs text-gray-400">
                      <span className="font-semibold text-gray-600">
                        {comment.username}
                      </span>{' '}
                      • <ReactTimeago date={comment.created_at} />
                    </p>
                    <p>{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default PostPage
