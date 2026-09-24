export const TMDB_API_KEY =
  process.env.NEXT_PUBLIC_TMDB_API_KEY ?? ""

export const TMDB_BASE_URL = "https://api.themoviedb.org/3"

export const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p"

export function tmdbUrl(path: string, params: Record<string, string | number> = {}) {
  const url = new URL(`${TMDB_BASE_URL}${path}`)
  url.searchParams.set("api_key", TMDB_API_KEY)
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, String(value))
  }
  return url.toString()
}

export function tmdbImage(
  path: string | null | undefined,
  size: "w92" | "w185" | "w500" | "original" = "w500"
) {
  if (!path) return "/Logo.png"
  return `${TMDB_IMAGE_BASE}/${size}${path}`
}
