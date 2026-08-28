"use client"
import { Footer } from "@/app/_components/footer";
import { Header } from "@/app/_components/header";
import { MovieCard } from "@/app/_components/movieCard";
import { Paginate } from "@/app/_components/pagination";
import type { Movie } from "@/app/type";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


const API_KEY = "c57b8556952c6312699fd719663951e1"
const BASE_URL = "https://api.themoviedb.org/3"

export default function RelatedMovies() {
    const { id } = useParams()
    const [relatedMovies, setRelatedMovies] = useState<Movie[]>([])
    const [page, setPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)

    useEffect(() => {
        async function getRelatedMovies() {
            const response = await fetch(`${BASE_URL}/movie/${id}/similar?page=${page}&api_key=${API_KEY}`);
            const data = await response.json();
            console.log(data);
            setRelatedMovies(data.results);
            setTotalPages(data.total_pages)
        }
        getRelatedMovies();
    }, [page]);

    return (
        <main className="w-full max-w-[1520px] flex flex-col items-center justify-center">
            <Header />
            <div className="flex flex-col items-start justify-center gap-6 mt-4 px-20 max-[920px]:px-10 max-[410px]:px-4">
                <p className="text-2xl font-bold">Related Movies</p>
                <div className="w-full grid grid-cols-5 gap-4 justify-center max-[920px]:grid-cols-3 max-[410px]:grid-cols-2">
                    {
                        relatedMovies.map((item) => (
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
