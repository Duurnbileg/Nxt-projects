"use client"
import type { Movie } from "@/app/type";
import { useEffect, useState } from "react";
import { Header } from "../_components/header";
import { MovieCard } from "../_components/movieCard";
import { Footer } from "../_components/footer";
import { useSearchParams } from "next/navigation";
import { Paginate } from "../_components/pagination";


const API_KEY = "c57b8556952c6312699fd719663951e1"
const BASE_URL = "https://api.themoviedb.org/3"

export default function SearchResult() {
    const searchParams = useSearchParams();

    const searchValue = searchParams.get("searchValue") || "";
    const [searchedMovies, setSearchedMovies] = useState<Movie[]>([])
    const [page, setPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)

    useEffect(() => {
        const fetchSearchedMovies = async () => {
            const response = await fetch(`${BASE_URL}/search/movie?query=${searchValue}&language=en-US&page=${page}&api_key=${API_KEY}`)
            const data = await response.json()
            setSearchedMovies(data.results)
            setTotalPages(data.total_pages)
        }
        if (searchValue) {
            fetchSearchedMovies()
        }
    }, [searchValue, page])

    return (
        <main className="flex flex-col items-center justify-center">
            <Header />
            <div className="w-[1440px] flex flex-col items-start justify-center gap-6 mt-4 px-20">
                <div className="flex flex-col gap-2">
                    <p className="text-2xl font-bold">Related Movies</p>
                    <p className="text-lg">Search result for <span className="font-bold text-xl">"{searchValue}"</span></p>
                </div>
                <div className="flex flex-wrap gap-8 items-center justify-start">
                    {
                        searchedMovies.map((item) => (
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
