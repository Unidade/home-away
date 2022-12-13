import Layout from '../components/Layout'
import ListingForm from '../components/ListingForm'
import axios from 'axios'
import { IHome } from '../types/home'

export default function Create() {
  const addHome = (data: IHome) => {
    axios.post('/api/homes', data)
  }

  return (
    <Layout>
      <div className='max-w-screen-sm mx-auto'>
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
