import Layout from '../components/Layout'
import Grid from '../components/Grid'
import { prisma } from '../lib/prisma'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth/next'
import { GetServerSideProps } from 'next'

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  )
  if (!session) {
    return {
      redirect: { destination: '/', permanent: false },
    }
  }
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
    return {
      props: {},
    }
  }
}
