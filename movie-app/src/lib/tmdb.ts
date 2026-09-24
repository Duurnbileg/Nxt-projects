export const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p"

export function tmdbImage(
  path: string | null | undefined,
  size: "w92" | "w185" | "w500" | "original" = "w500"
) {
  if (!path) return "/Logo.png"
  return `${TMDB_IMAGE_BASE}/${size}${path}`
}
