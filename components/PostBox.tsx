import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import Avatar from '../Avatar'
import { HiOutlineLink, HiOutlinePhotograph } from 'react-icons/hi'
import { useForm } from 'react-hook-form'
import FormInput from './FormInput'
import { FormData } from '../typings'
import { useMutation } from '@apollo/client'
import { ADD_POST, ADD_SUBREDDIT } from '../graphql/mutations'
import client from '../apollo-client'
import { GET_SUBREDDIT_BY_TOPIC } from '../graphql/queries'
import toast from 'react-hot-toast'

function PostBox() {
  const { data: session } = useSession()
  const [addPost] = useMutation(ADD_POST)
  const [addSubreddit] = useMutation(ADD_SUBREDDIT)
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>()
  const [isImageBoxOpen, setIsImageBoxOpen] = useState<boolean>(false)

  const onSubmit = handleSubmit(async (formData) => {
    console.log(formData)
    const notification = toast('Creating new post...')

    try {
      // Query for subreddit topic
      const {
        data: { getSubredditListByTopic },
      } = await client.query({
        fetchPolicy: 'no-cache',
        query: GET_SUBREDDIT_BY_TOPIC,
        variables: {
          topic: formData.subreddit,
        },
      })

      const subredditExists = getSubredditListByTopic.length > 0

      if (!subredditExists) {
        // create subreddit...
        console.log('Subreddit is NEW! -> creating a new subreddit')

        const {
          data: { insertSubreddit: newSubreddit },
        } = await addSubreddit({
          variables: {
            topic: formData.subreddit,
          },
        })

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            title: formData.postTitle,
            body: formData.postBody,
            image: formData.postImage || '',
            subreddit_id: newSubreddit.id,
            username: session?.user?.name,
          },
        })

        console.log('New post added:', newPost)
        toast.success('New post created!', {
          id: notification,
        })
      } else {
        // use existing subreddit
        console.log('Subreddit exists! -> using existing subreddit')
        console.log(getSubredditListByTopic)

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            title: formData.postTitle,
            body: formData.postBody,
            image: formData.postImage || '',
            subreddit_id: getSubredditListByTopic[0].id,
            username: session?.user?.name,
          },
        })

        console.log('New post added:', newPost)
        toast.success('New post created!', {
          id: notification,
        })
      }
    } catch (error) {
      console.log(error)
      toast.error('Whoops something went wrong!', {
        id: notification,
      })
    } finally {
      // After the post has been added
      setValue('postBody', '')
      setValue('postImage', '')
      setValue('postTitle', '')
      setValue('subreddit', '')
    }
  })

  return (
    <form
      onSubmit={onSubmit}
      className="sticky top-16 z-20 rounded-md border border-gray-300 bg-white p-2"
    >
      <div className="flex items-center space-x-3">
        <Avatar />

        <input
          {...register('postTitle', { required: true })}
          className="flex-1 rounded-md bg-gray-50 p-2 pl-5 outline-none"
          type="text"
          placeholder={
            session ? 'Create a post by entering a title!' : 'Sign in to post'
          }
          disabled={!session}
        />

        <HiOutlinePhotograph
          onClick={() => setIsImageBoxOpen((prev) => !prev)}
          className={`h-6 w-6 cursor-pointer ${
            !isImageBoxOpen ? 'text-gray-300' : 'text-blue-300'
          }`}
        />
        <HiOutlineLink className="h-6 w-6 cursor-pointer text-gray-300" />
      </div>

      {!!watch('postTitle') && (
        <div className="flex flex-col py-2">
          {/* Body */}
          <FormInput
            label="Body"
            placeholder="Post Body"
            name="postBody"
            register={register}
          />

          <FormInput
            label="Subreddit"
            placeholder="i.e reactjs"
            name="subreddit"
            register={register}
            required
          />

          {isImageBoxOpen && (
            <FormInput
              label="Image URL"
              placeholder="Optional..."
              name="postImage"
              register={register}
            />
          )}

          {/* Errors */}
          {Object.keys(errors).length > 0 && (
            <div className="space-y-2 p-2 text-red-500">
              {errors.postTitle?.type === 'required' && (
                <p>- A Post Title is required</p>
              )}

              {errors.subreddit?.type === 'required' && (
                <p>- A Subreddit is required</p>
              )}
            </div>
          )}

          {/* Submit Button */}
          {!!watch('postTitle') && (
            <button
              className="w-full rounded-full bg-blue-400 p-2 text-white"
              type="submit"
            >
              Create Post
            </button>
          )}
        </div>
      )}
    </form>
  )
}

export default PostBox
