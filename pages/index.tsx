import { prisma } from '../lib/prisma'
import Grid from '../components/Grid'
import Layout from '../components/Layout'
import Head from 'next/head'

export async function getStaticProps() {
  const homes = await prisma.home.findMany()

  return {
    props: {
      homes: JSON.parse(JSON.stringify(homes)),
    },
    revalidate: 5,
  }
}

export default function Home({ homes = [] }) {
  return (
    <>
      <Head>
        <link rel='canonical' href='https://home-away.ninja/' />
      </Head>
      <Layout>
        <h1 className='text-xl font-medium text-gray-800'>
          Top-rated places to stay
        </h1>
        <p className='text-gray-500'>
          Explore some of the best places in the world
        </p>
        <div className='mt-8'>
          <Grid key={homes.length} homes={homes} />
        </div>
      </Layout>
    </>
  )
}
