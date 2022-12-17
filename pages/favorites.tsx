import Grid from 'components/Grid'
import Layout from 'components/Layout'
import LoadingSpinner from 'components/LoadingSpinner'
import { useFavorites } from 'hooks/useFavorites'

const Favorites = () => {
  const { favorites: homes, isLoading, isValidating } = useFavorites()

  if (isLoading || isValidating)
    return (
      <Layout>
        <h1 className='mb-10 text-center text-xl font-medium text-gray-800'>
          My favorites
        </h1>
        <LoadingSpinner />
      </Layout>
    )

  if (homes) {
    return (
      <Layout>
        <h1 className='mb-10 text-center text-xl font-medium text-gray-800'>
          My favorites
        </h1>
        <Grid homes={homes} />
      </Layout>
    )
  }
}

export default Favorites
