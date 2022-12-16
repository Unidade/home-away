import { prisma } from '../lib/prisma'
import Grid from '../components/Grid'
import Layout from '../components/Layout'

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in

export async function getStaticProps() {
  const homes = await prisma.home.findMany()
  console.log(homes)
  return {
    props: { homes: JSON.parse(JSON.stringify(homes)) },
    revalidate: 10,
  }
}

export default function Home({ homes = [] }) {
  console.log(homes)
  return (
    <Layout>
      <h1 className='text-xl font-medium text-gray-800'>
        Top-rated places to stay
      </h1>
      <p className='text-gray-500'>
        Explore some of the best places in the world
      </p>
      <div className='mt-8'>
        <Grid homes={homes} />
      </div>
    </Layout>
  )
}
