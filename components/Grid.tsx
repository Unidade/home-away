import Card from '../components/Card'
import { ExclamationIcon } from '@heroicons/react/outline'
import { IHome } from '../types/home'
import { useSession } from 'next-auth/react'
import { fetchJSON } from 'lib/fetchJSON'
import swr from 'swr'
interface IGridProps {
  homes: IHome[]
}

const Grid = ({ homes }: IGridProps) => {
  const { data: session } = useSession()
  const id = session?.user.id
  console.log(session)
  const { data } = swr(id ? `/api/user/${id}/favorites` : null, fetchJSON)

  const isEmpty = homes.length === 0
  console.log(data)

  return isEmpty ? (
    <p className='inline-flex max-w-max items-center space-x-1 rounded-md bg-amber-100 px-4 py-2 text-amber-700'>
      <ExclamationIcon className='mt-px h-5 w-5 shrink-0' />
      <span>Unfortunately, there is nothing to display yet.</span>
    </p>
  ) : (
    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {homes.map((home: IHome) => (
        <Card
          key={home.id}
          {...home}
          isFavorite={data?.length !== 0 && data?.includes(home.id)}
        />
      ))}
    </div>
  )
}

export default Grid
