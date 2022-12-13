import Layout from '../components/Layout'
import Grid from '../components/Grid'
import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const Homes = ({ homes = [] }) => {
  return (
    <Layout>
      <h1 className='text-xl font-medium text-gray-800'>My homes</h1>
      <p className='text-gray-500'>
        Manage your homes and update your listings
      </p>
      <div className='mt-8'>
        <Grid homes={homes} />
      </div>
    </Layout>
  )
}
export default Homes

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: { destination: '/', permanent: false },
    }
  }
  if (session.user) {
    try {
      const homes = await prisma.home.findMany({
        where: { owner: { email: session.user.email } },
        orderBy: { createdAt: 'desc' },
      })

      return {
        props: { homes: JSON.parse(JSON.stringify(homes)) },
      }
    } catch (error) {
      console.error(error)
    }
  }
}
