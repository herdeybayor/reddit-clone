import type { NextPage } from 'next'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import Header from '../components/Header'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Reddit 2.0 (Clone)</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Hello</h1>
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
