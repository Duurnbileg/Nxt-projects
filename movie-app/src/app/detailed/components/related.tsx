"use client"
import type { Movie } from "@/app/type";
import { MovieCard } from "../../_components/movieCard";
import { Paginate } from "@/app/_components/pagination";


export const Related = ({ movie }: { movie: Movie[] }) => {

    return (
        <main className="flex flex-col items-center justify-center">
            <div className="flex flex-wrap gap-6 items-center justify-center">
                {
                    movie.slice(0, 5).map((item, index) => (
                        <MovieCard key={index} movies={item} variant="small" />
                    ))
                }
            </div>
        </main >
    );
}
