import React from 'react'
import { HiOutlineArrowDown, HiOutlineArrowUp } from 'react-icons/hi'
import Avatar from '../Avatar'
import { Post } from '../typings'
import TimeAgo from 'react-timeago'
import Image from 'next/image'
import {
  HiOutlineChatAlt,
  HiOutlineGift,
  HiOutlineShare,
  HiOutlineBookmark,
  HiOutlineDotsHorizontal,
} from 'react-icons/hi'

interface Props {
  post: Post
}

function Post({ post }: Props) {
  return (
    <div className="flex cursor-pointer rounded-md border border-gray-300 bg-white shadow-sm hover:border hover:border-gray-600">
      {/* Votes */}
      <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400">
        <HiOutlineArrowUp className="voteButtons hover:text-red-400" />
        <p className="text-xs font-bold text-black">0</p>
        <HiOutlineArrowDown className="voteButtons hover:text-blue-400" />
      </div>

      <div className="p-3 pb-1">
        {/* Header */}
        <div className="flex items-center space-x-2">
          <Avatar seed={post.subreddit[0]?.topic} />
          <p className="text-xs text-gray-400">
            <span className="font-bold text-black hover:text-blue-400 hover:underline">
              r/{post.subreddit[0]?.topic}
            </span>{' '}
            • Posted by u/
            {post.username} <TimeAgo date={post.created_at} />
          </p>
        </div>
        {/* Body */}
        <div className="py-4">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="mt-2 text-sm font-light">{post.body}</p>
        </div>
        {/* Image */}
        {post.image && (
          <div className="relative aspect-video w-full">
            <Image
              src={`/api/imageproxy?url=${encodeURIComponent(post.image)}`}
              layout="fill"
              objectFit="contain"
            />
          </div>
        )}
        {/* Footer */}
        <div className="flex space-x-4 text-gray-400">
          <div className="postButtons">
            <HiOutlineChatAlt className="h-6 w-6" />
            <p className="">{post.comments.length} Comments</p>
          </div>
          <div className="postButtons">
            <HiOutlineGift className="h-6 w-6" />
            <p className="hidden sm:inline">Award</p>
          </div>
          <div className="postButtons">
            <HiOutlineShare className="h-6 w-6" />
            <p className="hidden sm:inline">Share</p>
          </div>
          <div className="postButtons">
            <HiOutlineBookmark className="h-6 w-6" />
            <p className="hidden sm:inline">Save</p>
          </div>
          <div className="postButtons">
            <HiOutlineDotsHorizontal className="h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
