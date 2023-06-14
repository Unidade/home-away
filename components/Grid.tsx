import Card from '../components/Card'
import { ExclamationIcon } from '@heroicons/react/outline'
import { Home } from '@prisma/client'

import { useFavorites } from 'hooks/useFavorites'
interface IGridProps {
  homes: Home[]
}

const Grid = ({ homes = [] }: IGridProps) => {
  const { favorites } = useFavorites()
  const isEmpty = homes.length === 0
  console.log(homes)
  return isEmpty ? (
    <p className='inline-flex max-w-max items-center space-x-1 rounded-md bg-amber-100 px-4 py-2 text-amber-700'>
      <ExclamationIcon className='mt-px h-5 w-5 shrink-0' />
      <span>Unfortunately, there is nothing to display yet.</span>
    </p>
  ) : (
    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {homes.map((home) => (
        <Card
          key={home.id}
          {...home}
          isFavorite={
            favorites &&
            favorites?.length !== 0 &&
            favorites.filter((fav) => fav.id === home.id).length !== 0
          }
        />
      ))}
    </div>
  )
}

export default Grid
