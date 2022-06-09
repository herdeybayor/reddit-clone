import type { NextPage } from 'next'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import Feed from '../components/Feed'
import PostBox from '../components/PostBox'
import { useQuery } from '@apollo/client'
import { GET_SUBREDDITS_WITH_LIMIT } from '../graphql/queries'
import { Subreddit } from '../typings'
import SubredditRow from '../components/SubredditRow'

const Home: NextPage = () => {
  const { data, loading } = useQuery(GET_SUBREDDITS_WITH_LIMIT, {
    variables: {
      limit: 10,
    },
  })

  const topCommunities: Subreddit[] = data?.getSubredditListLimit

  return (
    <div className="my-7 mx-auto max-w-5xl p-8 pt-0">
      <Head>
        <title>Reddit 2.0 (Clone)</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PostBox />

      <div className="flex space-x-5">
        <Feed />

        <div className="sticky top-36 mt-5 hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline">
          <p className="text-md mb-1 p-4 pb-3 font-bold">Top Communities</p>

          <div>
            {topCommunities?.map((subreddit, i) => (
              <SubredditRow
                key={subreddit.id}
                topic={subreddit.topic}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

export async function getServerSideProps(context: any) {
  const session = await getSession(context)

  return {
    props: {
      session: session,
    },
  }
}
