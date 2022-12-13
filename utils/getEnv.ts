export default function checkEnv(value: string | undefined): string {
  if (value) return value
  throw new Error(`Environment variable ${value} is not defined`)
}
