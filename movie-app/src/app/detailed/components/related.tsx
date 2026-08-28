"use client"
import type { Movie } from "@/app/type";
import { MovieCard } from "../../_components/movieCard";
import { Paginate } from "@/app/_components/pagination";


export const Related = ({ movie }: { movie: Movie[] }) => {

    return (
        <main className="grid grid-cols-2 items-center justify-center gap-5 px-4 sm:grid-cols-3 lg:grid-cols-5">
            {movie?.slice(0, 5).map((item, index) => (
                <div
                    key={item.id}
                    className={index >= 2 ? "hidden sm:block" : ""}
                >
                    <MovieCard
                        movies={item}
                        variant="small"
                    />
                </div>
            ))}
        </main>
    );
}
