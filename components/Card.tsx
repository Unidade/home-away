import Link from 'next/link'
import Image from 'next/image'
import { HeartIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { useSession } from 'next-auth/react'
import { useFavorites } from 'hooks/useFavorites'
import { Home } from '@prisma/client'
import { useModal } from 'context/modalContext'

interface ICardsProps extends Home {
  isFavorite?: boolean
}

const Card = ({
  id = '',
  image = '',
  title = '',
  guests = 0,
  beds = 0,
  baths = 0,
  price = 0,
  isFavorite = false
}: ICardsProps) => {
  const [favorite, setFavorite] = useState(false)
  const { data: session } = useSession()
  const { favorites, mutate } = useFavorites()
  const { openModal } = useModal()
  useEffect(() => {
    if (isFavorite) {
      setFavorite(isFavorite)
    }
  }, [isFavorite])

  const addToFavorites = (homeID: string) =>
    fetch(`/api/homes/${homeID}/favorite`, { method: 'PUT' })
  const removeFromFavorites = (homeID: string) =>
    fetch(`/api/homes/${homeID}/favorite`, { method: 'DELETE' })

  const debouncedSubmitLike = useDebouncedCallback(async (homeID: string) => {
    if (session) {
      if (favorite) {
        await addToFavorites(homeID)
        mutate()
      } else {
        removeFromFavorites(homeID)
        mutate(
          favorites.filter((home) => home.id !== homeID),
          { revalidate: false }
        )
      }
    }
  }, 100)
  return (
    <Link className='block w-full' href={`/homes/${id}`}>
      <div className='relative'>
        <div className='aspect-w-16 aspect-h-9 overflow-hidden rounded-lg bg-gray-200 shadow'>
          {image ? (
            <Image
              priority
              src={image}
              alt={title}
              fill
              sizes='(max-width: 600px) 100vw,
              (max-width: 900px) 50vw,
              (max-width: 1200px) 25vw,
              20vw'
              className='object-cover transition hover:opacity-80'
            />
          ) : null}
        </div>
        <button
          type='button'
          aria-label='Add to favorites'
          onClick={(e) => {
            e.preventDefault()
            if (!session) {
              openModal()
            } else {
              setFavorite(!favorite)
              debouncedSubmitLike(id)
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
          currency: 'USD'
        }).format(price ?? 0)}{' '}
        <span className='text-gray-500'>/night</span>
      </p>
    </Link>
  )
}
export default Card
