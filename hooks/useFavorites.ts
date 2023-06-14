import swr, { KeyedMutator } from 'swr'
import { fetchJSON } from 'lib/fetchJSON'
import { useSession } from 'next-auth/react'
import { Home } from '@prisma/client'

export function useFavorites(): useFavoritesReturn {
  const { data: session } = useSession()
  const user = session?.user
  const { data, isLoading, error, mutate, isValidating } = swr(
    user ? `/api/users/${user.id}/favorites` : null,
    fetchJSON
  )

  return {
    favorites: data,
    isLoading,
    error,
    mutate,
    isValidating
  }
}

interface useFavoritesReturn {
  favorites: Home[]
  isLoading: boolean
  error: Error
  mutate: KeyedMutator<any>
  isValidating: boolean
}
