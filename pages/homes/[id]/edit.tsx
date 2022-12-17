import Layout from 'components/Layout'
import ListingForm from 'components/ListingForm'
import { IHome } from 'types/home'
import { prisma } from 'lib/prisma'
import { GetServerSideProps } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from 'pages/api/auth/[...nextauth]'

const Edit = (home: IHome) => {
  const updateHome = async (data: Partial<IHome>) => {
    await fetch(`/api/homes/${home?.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }

  return (
    <Layout>
      <div className='mx-auto max-w-screen-sm'>
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
export const getServerSideProps: GetServerSideProps = async (context) => {
  const redirect = {
    redirect: {
      destination: '/',
      permanent: false,
    },
  }
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  )

  if (!session) {
    return redirect
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email as string },
    select: { listedHomes: true },
  })

  const id = context?.params?.id
  const home = user?.listedHomes.find((home) => home.id === id)
  if (!home) {
    return redirect
  }
  context.res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
  return {
    props: JSON.parse(JSON.stringify(home)),
  }
}

export default Edit
