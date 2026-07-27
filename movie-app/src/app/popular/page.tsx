"use client"
import { useEffect, useState } from "react";
import Footer from "../_components/footer";
import Header from "../_components/header";
import MovieCard from "../_components/movieCard";

const API_KEY = "c57b8556952c6312699fd719663951e1"
const BASE_URL = "https://api.themoviedb.org/3"
const POPULAR_ENDPOINT = "/movie/popular?language=en-US&page=1"

const popularApiUrl = `${BASE_URL}${POPULAR_ENDPOINT}&api_key=${API_KEY}`

type Movie = {
    id: number,
    title: string,
    poster_path: string,
    backdrop_path: string,
    release_date: string,
    overview: string,
    vote_average: number;
}

export default function Popular() {
    const [popularMovies, setPopularMovies] = useState<Movie[]>([])
    const fetchPopularMovies = async () => {
        const response = await fetch(popularApiUrl)
        const data = await response.json()
        setPopularMovies(data.results)
    }

    useEffect(() => {
        fetchPopularMovies()
    }, [])

    return (
        <main className="flex flex-col items-center justify-center">
            <Header />
            <div className="w-[1440px] flex flex-col items-start justify-center gap-6 mt-4 px-20">
                <p className="text-2xl font-bold">Popular movies</p>
                <div className="flex flex-wrap gap-6 items-center justify-center">
                    {
                        popularMovies.map((item) => (
                            <MovieCard key={item.id} movie={item} />
                        ))
                    }
                </div>
            </div>
            <Footer />
        </main >
    );
}
