"use client"

import { Button } from "@/components/ui/button";
import { ArrowRight, Link } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DetailedContent } from "../components/detailedContent";
import { Header } from "@/app/_components/header";
import { DetailedHero } from "../components/detailedHero";
import { MovieCard } from "@/app/_components/movieCard";
import { Footer } from "@/app/_components/footer";
import { Credit, Movie } from "@/app/type";

const API_KEY = "c57b8556952c6312699fd719663951e1"
const BASE_URL = "https://api.themoviedb.org/3"

export default function Detailed() {
    const { id } = useParams()
    const [detailedMovie, setDetailedMovie] = useState<Movie>()
    const [relatedMovies, setRelatedMovies] = useState<Movie[]>([])
    const [movieCredit, setMovieCredit] = useState<Credit>()

    useEffect(() => {
        async function getMovie() {
            const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
            const data = await response.json()
            console.log("dasda", data);
            setDetailedMovie(data);
        } getMovie();
    }, [id])

    useEffect(() => {
        async function getSimilarMovies() {
            const response = await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`);
            const data = await response.json();
            setRelatedMovies(data.results);
        }
        getSimilarMovies();
    }, [id]);

    useEffect(() => {
        async function getCredits() {
            const response = await fetch(`${BASE_URL}/movie/${id}/credits?language=en-US&api_key=${API_KEY}`)
            const data = await response.json()
            console.log(data);
            setMovieCredit(data)
        }
        getCredits()
    }, [id])

    return (
        <main className="w-full flex items-center justify-center">
            <div className="w-full max-w-380 flex flex-col items-center">
                <Header />
                <div className=" flex flex-col items-start justify-center w-270 gap-8">
                    <DetailedHero movie={detailedMovie} />
                    <DetailedContent movie={detailedMovie} credit={movieCredit} />
                </div>
                <div className="w-full flex flex-col items-center justify-center gap-2">
                    <div className="flex items-center justify-between w-270 mt-8">
                        <p className="text-2xl font-semibold mb-4">More like this</p>
                        <div className="flex items-center">
                            <Button variant="ghost" size="sm" className="ml-4">
                                <p>See more</p>
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="w-full flex flex-wrap gap-8 justify-center">
                        {
                            relatedMovies.slice(0, 5).map((item) => (
                                <MovieCard key={item.id} movies={item} variant="small" />
                            ))
                        }
                    </div>
                </div>
                <Footer />
            </div >
        </main >
    );
}
