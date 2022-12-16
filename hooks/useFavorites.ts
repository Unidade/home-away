import swr from 'swr'
import { fetchJSON } from 'lib/fetchJSON'

export function useFavorites(id: string) {
  const { data, isLoading, error } = swr(
    `/api/users/${id}/favorites`,
    fetchJSON
  )

  return {
    favorites: data,
    isLoading,
    error,
  }
}
