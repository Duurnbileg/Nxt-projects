export type Genre = {
    name: string
    id: number
}

export type Genres = Genre

export type Movie = {
    id: number
    title: string
    poster_path: string
    backdrop_path: string
    release_date: string
    overview: string
    vote_average: number
    vote_count: number
    genres: Genre[]
    runtime: number
    total_result: number,
    total_pages: number
}

export type Cast = {
    name: string
    known_for_department?: string
}

export type Crew = {
    name: string
    known_for_department?: string
    job?: string
}

export type Credit = {
    cast?: Cast[]
    crew?: Crew[]
}