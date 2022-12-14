import swr from 'swr'
import { fetchJSON } from '../lib/fetchJSON'

export function useOwnerID(id: string) {
  const { data, error, isLoading } = swr(`/api/homes/${id}/ownerId`, fetchJSON)
  return {
    ownerID: data,
    isLoading,
    isError: error,
  }
}
