import Layout from '../components/Layout'
import ListingForm from '../components/ListingForm'
import axios from 'axios'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth/next'
import { GetServerSideProps } from 'next'

import { IHome } from '../types/home'

export default function Create() {
  const addHome = async (data: IHome) => {
    await axios.post('/api/homes', data)
  }

  return (
    <Layout>
      <div className='mx-auto max-w-screen-sm'>
        <h1 className='text-xl font-medium text-gray-500'>List your home</h1>
        <p className='text-gray-500'>
          Fill out the form below to list a new home.
        </p>
        <div className='mt-8'>
          <ListingForm
            buttonText='Add home'
            redirectPath='/'
            onSubmit={addHome}
          />
        </div>
      </div>
    </Layout>
  )
}

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

  return {
    props: {},
  }
}
