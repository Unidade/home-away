import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import axios from 'axios'

import Layout from '../../../components/Layout'
import ListingForm from '../../../components/ListingForm'
import { IHome } from '../../../types/home'
import { prisma } from '../../../lib/prisma'

const Edit = (home: IHome) => {
  const updateHome = (data: Partial<IHome>) => {
    console.log('data:', data, 'home:', home)
    axios.patch(`/api/homes/${home?.id}`, data)
  }

  return (
    <Layout>
      <div className='max-w-screen-sm mx-auto'>
        <h1 className='text-xl font-medium text-gray-800'>Edit your home</h1>
        <p className='text-gray-500'>
          Fill out the form below to update your home.
        </p>
        <div className='mt-8'>
          <ListingForm
            onSubmit={updateHome}
            initialValues={home}
            buttonText='Update home'
            redirectPath={`/homes/${home?.id}`}
          />
        </div>
      </div>
    </Layout>
  )
}

// Check if current logged user owns the home, if so, authorize editing, otherwise, redirect to home page
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const redirect = {
    redirect: {
      destination: '/',
      permanent: false,
    },
  }
  const session = await getSession(context)

  if (!session || !session.user || !session.user.email) {
    return redirect
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { listedHomes: true },
  })

  const id = context?.params?.id
  const home = user?.listedHomes.find((home) => home.id === id)
  if (!home) {
    return redirect
  }

  return {
    props: JSON.parse(JSON.stringify(home)),
  }
}

export default Edit
