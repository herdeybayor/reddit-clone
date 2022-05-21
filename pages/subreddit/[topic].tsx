import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import Avatar from '../../Avatar'

function Subreddit() {
  const {
    query: { topic },
  } = useRouter()
  return (
    <div className={`h-24 bg-red-400 p-8`}>
      <Head>
        <title>Reddit 2.0 (Clone) || {topic} Subreddit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="-mx-8 mt-10 bg-white">
        <div className="mx-auto flex max-w-5xl items-center space-x-4 pb-3">
          <div className="-mt-5">
            <Avatar seed={topic as string} large />
            {/* <div className="w-20 h-20"></div> */}
          </div>
        </div>

        <div className="py-2">
          <h1 className="text-3xl font-semibold">
            Welcome to r/{topic} subreddit
          </h1>
          <p className="text-sm text-gray-400">r/{topic}</p>
        </div>
      </div>
    </div>
  )
}

export default Subreddit
