import type { NextPage } from 'next'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import Feed from '../components/Feed'
import PostBox from '../components/PostBox'

const Home: NextPage = () => {
  return (
    <div className="my-7 mx-auto max-w-5xl p-8 pt-0">
      <Head>
        <title>Reddit 2.0 (Clone)</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PostBox />

      <div className="flex">
        <Feed />
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
