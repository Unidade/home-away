import Layout from '../components/Layout'
import ListingForm from '../components/ListingForm'
import axios from 'axios'
import { getSession } from 'next-auth/react'

import { IHome } from '../types/home'
import { NextPageContext } from 'next'

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

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: { destination: '/', permanent: false },
    }
  }

  return {
    props: {},
  }
}
