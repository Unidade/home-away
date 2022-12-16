import Grid from 'components/Grid'
import Layout from 'components/Layout'
import LoadingSpinner from 'components/LoadingSpinner'
import { useFavorites } from 'hooks/useFavorites'

const Favorites = () => {
  const { favorites: homes, isLoading } = useFavorites()
  console.log(isLoading)
  if (isLoading)
    return (
      <Layout>
        <h1 className='text-center text-xl font-medium text-gray-800'>
          My favorites
        </h1>
        <LoadingSpinner />
      </Layout>
    )
  console.log(homes)
  if (homes) {
    return (
      <Layout>
        <h1 className='text-center text-xl font-medium text-gray-800'>
          My favorites
        </h1>
        <Grid homes={homes} />
      </Layout>
    )
  }
}

export default Favorites
