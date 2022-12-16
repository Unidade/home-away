import swr from 'swr'
import { fetchJSON } from 'lib/fetchJSON'

export function useUser(id: string) {
  const { data, error, isLoading } = swr(`/api/user/${id}`, fetchJSON)
  return {
    user: data,
    isLoading,
    isError: error,
  }
}
