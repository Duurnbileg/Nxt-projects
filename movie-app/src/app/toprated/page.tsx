"use client"
import type { Movie } from "@/app/type";
import { useEffect, useState } from "react";
import { Header } from "../_components/header";
import { MovieCard } from "../_components/movieCard";
import { Footer } from "../_components/footer";
import { Paginate } from "../_components/pagination";


const API_KEY = "c57b8556952c6312699fd719663951e1"
const BASE_URL = "https://api.themoviedb.org/3"
const TOPRATED_ENDPOINT = "/movie/top_rated?language=en-US"

export default function TopRated() {
    const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([])
    const [page, setPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)
    const fetchTopRatedMovies = async () => {
        const response = await fetch(`${BASE_URL}${TOPRATED_ENDPOINT}&page=${page}&api_key=${API_KEY}`)
        const data = await response.json()
        setTopRatedMovies(data.results)
        setTotalPages(data.total_pages)
    }

    useEffect(() => {
        fetchTopRatedMovies()
    }, [page])

    return (
        <main className="flex flex-col items-center justify-center">
            <Header />
            <div className="w-[1440px] flex flex-col items-start justify-center gap-6 mt-4 px-20">
                <p className="text-2xl font-bold">Top rated movies</p>
                <div className="flex flex-wrap gap-6 items-center justify-start">
                    {
                        topRatedMovies.map((item) => (
                            <MovieCard key={item.id} movies={item} />
                        ))
                    }
                </div>
                <Paginate page={page} setPage={setPage} totalPages={totalPages} />
            </div>
            <Footer />
        </main >
    );
}
