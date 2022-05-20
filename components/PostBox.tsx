import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import Avatar from '../Avatar'
import { HiOutlineLink, HiOutlinePhotograph } from 'react-icons/hi'
import { useForm } from 'react-hook-form'
import FormInput from './FormInput'
import { FormData } from '../typings'

function PostBox() {
  const { data: session } = useSession()
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>()
  const [isImageBoxOpen, setIsImageBoxOpen] = useState<boolean>(false)

  const onSubmit = handleSubmit(async (data: any) => {
    console.log(data)
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
            placeholder="Text (Optional)"
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
