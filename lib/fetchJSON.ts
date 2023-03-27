// Wrapper around fetch that returns the JSON response
export async function fetchJSON(...args: Parameters<typeof fetch>) {
  try {
    const resp = await fetch(...args)
    if (!resp.ok) {
      throw new Error(resp.statusText)
    }
    const json = await resp.json()
    return json
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      throw error
    } else {
      console.error(error)
      throw new Error('Unknown error')
    }
  }
}
