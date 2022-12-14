import Link from 'next/link'
import Image from 'next/image'
import { HeartIcon } from '@heroicons/react/solid'
import { IHome } from '../types/home'

interface ICardsProps extends IHome {
  favorite?: boolean
  onClickFavorite: (id: string) => void
}

const Card = ({
  id = '',
  image = '',
  title = '',
  guests = 0,
  beds = 0,
  baths = 0,
  price = 0,
  favorite = false,

  onClickFavorite = () => null,
}: ICardsProps) => (
  <Link className='block w-full' href={`/homes/${id}`}>
    <div className='relative'>
      <div className='aspect-w-16 aspect-h-9 overflow-hidden rounded-lg bg-gray-200 shadow'>
        {image ? (
          <Image
            priority
            src={image}
            alt={title}
            fill
            sizes='(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw'
            className='object-cover transition hover:opacity-80'
          />
        ) : null}
      </div>
      <button
        type='button'
        onClick={(e) => {
          e.preventDefault()
          if (typeof onClickFavorite === 'function') {
            onClickFavorite(id)
          }
        }}
        className='absolute top-2 right-2'
      >
        <HeartIcon
          className={`h-7 w-7 drop-shadow-lg transition ${
            favorite ? 'text-red-500' : 'text-white'
          }`}
        />
      </button>
    </div>
    <div className='mt-2 w-full font-semibold leading-tight text-gray-700'>
      {title ?? ''}
    </div>
    <ol className='mt-1 inline-flex items-center space-x-1 text-gray-500'>
      <li>
        <span>{guests ?? 0} guests</span>
        <span aria-hidden='true'> · </span>
      </li>
      <li>
        <span>{beds ?? 0} beds</span>
        <span aria-hidden='true'> · </span>
      </li>
      <li>
        <span>{baths ?? 0} baths</span>
      </li>
    </ol>
    <p className='mt-2'>
      {new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price ?? 0)}{' '}
      <span className='text-gray-500'>/night</span>
    </p>
  </Link>
)

export default Card
