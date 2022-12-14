export async function fetchJSON(...args: Parameters<typeof fetch>) {
  const resp = await fetch(...args)
  const json = await resp.json()
  return json
}
