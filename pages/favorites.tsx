import Grid from 'components/Grid'
import Layout from 'components/Layout'
import { fetchJSON } from 'lib/fetchJSON'
import { useSession } from 'next-auth/react'
import swr from 'swr'

const Favorites = () => {
  const { data: session } = useSession()
  const user = session?.user
  console.log(session)
  const {
    data: homes,
    isLoading,
    error,
  } = swr(user ? `/api/users/${session.user.id}/favorites` : null, fetchJSON)
  console.log(homes)
  if (error) return <div>failed to load</div>
  if (isLoading)
    return (
      <Layout>
        <h1 className='text-xl font-medium text-gray-800'>My favorites</h1>
        <Grid homes={[]} />
      </Layout>
    )
  if (homes) {
    return (
      <Layout>
        <h1 className='text-xl font-medium text-gray-800'>My favorites</h1>
        <Grid homes={homes} />
      </Layout>
    )
  }
}

export default Favorites
