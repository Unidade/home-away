import swr from 'swr'
import { fetchJSON } from 'lib/fetchJSON'

export function useFavorites(id: string) {
  const { data, isLoading, error } = swr(`/api/user/${id}/favorites`, fetchJSON)

  return {
    data: data as string[],
    isLoading,
    error,
  }
}
