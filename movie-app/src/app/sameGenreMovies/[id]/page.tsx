"use client"
import { Footer } from "@/app/_components/footer";
import { Header } from "@/app/_components/header";
import { MovieCard } from "@/app/_components/movieCard";
import { Paginate } from "@/app/_components/pagination";
import type { Movie } from "@/app/type";
import { InputGroupButton } from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


const API_KEY = "c57b8556952c6312699fd719663951e1"
const BASE_URL = "https://api.themoviedb.org/3"
const GENRE_ENDPOINT = "/genre/movie/list?language=en"

const genreApiUrl = `${BASE_URL}${GENRE_ENDPOINT}&api_key=${API_KEY}`

export default function SameGenreMovies() {
    const { id } = useParams()
    const searchParams = useSearchParams()
    const genreName = searchParams.get("name")
    const [relatedMovies, setRelatedMovies] = useState<Movie[]>([])
    const [genreList, setGenreList] = useState<Genre[]>([])
    const [page, setPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)
    const [totalResult, setTotalResult] = useState<number>(1)

    useEffect(() => {
        async function getRelatedMovies() {
            const response = await fetch(`${BASE_URL}/discover/movie?language=en&with_genres=${id}&page=${page}&api_key=${API_KEY}`);
            const data = await response.json();
            setRelatedMovies(data.results);
            setTotalPages(data.total_pages)
            setTotalResult(data.total_results)
        }
        if (id) {
            getRelatedMovies();
        }
    }, [id, page]);

    const fetchGenreList = async () => {
        const response = await fetch(genreApiUrl)
        const data = await response.json()
        setGenreList(data.genres)
    }

    useEffect(() => {
        fetchGenreList()
    }, [id])

    return (
        <main className="flex flex-col items-center">
            <Header />
            <div className="mt-4 flex w-full flex-col gap-8 px-4 sm:px-6 md:px-10 lg:flex-row lg:px-16 xl:px-20">
                <div className="min-w-0 w-full flex-1">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <p className="text-2xl font-bold">
                                {genreName}
                            </p>
                            <p className="text-base sm:text-lg">
                                Search result for{" "}
                                <span className="text-lg font-bold sm:text-xl">
                                    "{totalResult}"
                                </span>
                            </p>
                        </div>
                        <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5">
                            {relatedMovies.map((item) => (
                                <MovieCard
                                    key={item.id}
                                    movies={item}
                                />
                            ))}
                        </div>
                        <Paginate
                            page={page}
                            setPage={setPage}
                            totalPages={totalPages}
                        />
                    </div>
                </div>
                <div className="w-full shrink-0 lg:w-[300px] xl:w-[360px]">
                    <h1 className="text-2xl font-bold">
                        Genres
                    </h1>
                    <p>
                        See lists of movies by genre
                    </p>
                    <Separator className="my-4" />
                    <div className="flex flex-wrap gap-3">
                        {genreList.map((item) => (
                            <Link
                                key={item.id}
                                href={`/sameGenreMovies/${item.id}?name=${item.name}`}
                            >
                                <InputGroupButton className="rounded-full border-gray-300 bg-white text-xs font-semibold text-black">
                                    {item.name}
                                    <ChevronRight className="size-4" />
                                </InputGroupButton>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
