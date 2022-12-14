import Card from '../components/Card'
import { ExclamationIcon } from '@heroicons/react/outline'
import { IHome } from '../types/home'

interface IGridProps {
  homes: IHome[]
}

const Grid = ({ homes }: IGridProps) => {
  const isEmpty = homes.length === 0

  const toggleFavorite = async () => {
    // TODO: Add/remove home from the authenticated user's favorites
  }

  return isEmpty ? (
    <p className='text-amber-700 bg-amber-100 px-4 rounded-md py-2 max-w-max inline-flex items-center space-x-1'>
      <ExclamationIcon className='shrink-0 w-5 h-5 mt-px' />
      <span>Unfortunately, there is nothing to display yet.</span>
    </p>
  ) : (
    <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
      {homes.map((home: IHome) => (
        <Card key={home.id} {...home} onClickFavorite={toggleFavorite} />
      ))}
    </div>
  )
}

export default Grid
