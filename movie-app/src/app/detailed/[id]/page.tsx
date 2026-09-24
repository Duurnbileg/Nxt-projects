"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DetailedContent } from "../components/detailedContent";
import { Header } from "@/app/_components/header";
import { DetailedHero } from "../components/detailedHero";
import { Footer } from "@/app/_components/footer";
import { Credit, Movie } from "@/app/type";
import { Related } from "../components/related";
import { tmdbUrl } from "@/lib/tmdb";

export default function Detailed() {
    const { id } = useParams()
    const [detailedMovie, setDetailedMovie] = useState<Movie>()
    const [relatedMovies, setRelatedMovies] = useState<Movie[]>([])
    const [movieCredit, setMovieCredit] = useState<Credit>()

    useEffect(() => {
        if (!id) return

        async function getMovie() {
            const response = await fetch(tmdbUrl(`/movie/${id}`))
            const data = await response.json()
            setDetailedMovie(data);
        }

        async function getRelatedMovies() {
            const response = await fetch(tmdbUrl(`/movie/${id}/similar`));
            const data = await response.json();
            setRelatedMovies(data.results ?? []);
        }

        async function getCredits() {
            const response = await fetch(
                tmdbUrl(`/movie/${id}/credits`, { language: "en-US" })
            )
            const data = await response.json()
            setMovieCredit(data)
        }

        getMovie();
        getRelatedMovies();
        getCredits();
    }, [id])

    return (
        <main className="w-full max-w-[1520px] flex flex-col items-center justify-center">
            <Header />
            <div className="w-full max-w-[1260px] flex flex-col items-center">
                <div className=" flex flex-col items-start justify-center px-4 gap-8">
                    <DetailedHero movie={detailedMovie} />
                    <DetailedContent movie={detailedMovie} credit={movieCredit} />
                </div>
                <div className="w-full flex flex-col items-center justify-center gap-2">
                    <div className="flex items-center justify-between w-full px-4 mt-8">
                        <p className="text-2xl font-semibold mb-4 max-sm:text-lg">More like this</p>
                        <Button variant="ghost" size="sm" className="ml-4">
                            <Link href={`/relatedMovies/${id}`} className="flex items-center">
                                <p>See more</p>
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </Button>
                    </div>
                    <div className="w-full gap-8 justify-center">
                        <Related movie={relatedMovies} />
                    </div>
                </div>
                <Footer />
            </div>
        </main>
    );
}
