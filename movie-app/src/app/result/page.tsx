"use client"
import type { Movie } from "@/app/type";
import { useEffect, useState } from "react";
import { Header } from "../_components/header";
import { MovieCard } from "../_components/movieCard";
import { Footer } from "../_components/footer";


const API_KEY = "c57b8556952c6312699fd719663951e1"
const BASE_URL = "https://api.themoviedb.org/3"
const TOPRATED_ENDPOINT = "/movie/top_rated?language=en-US&page=1"

const topRatedApiUrl = `${BASE_URL}${TOPRATED_ENDPOINT}&api_key=${API_KEY}`

export default function TopRated() {
    const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([])
    const fetchTopRatedMovies = async () => {
        const response = await fetch(topRatedApiUrl)
        const data = await response.json()
        setTopRatedMovies(data.results)
    }

    useEffect(() => {
        fetchTopRatedMovies()
    }, [])

    return (
        <main className="flex flex-col items-center justify-center">
            <Header />
            <div className="w-[1440px] flex flex-col items-start justify-center gap-6 mt-4 px-20">
                <p className="text-2xl font-bold">Top rated movies</p>
                <div className="flex flex-wrap gap-6 items-center justify-center">
                    {
                        topRatedMovies.map((item) => (
                            <MovieCard key={item.id} movies={item} />
                        ))
                    }
                </div>
            </div>
            <Footer />
        </main >
    );
}
