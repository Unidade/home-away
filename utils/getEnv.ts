export default function getEnv(value?: string): string {
  if (value) return value
  throw new Error(`Environment variable ${value} is not defined`)
}
