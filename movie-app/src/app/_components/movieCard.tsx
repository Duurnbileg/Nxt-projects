import type { Movie } from "@/app/type";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const MovieCard = ({ movies, variant = "default" }: { movies: Movie, variant?: "default" | "small" }) => {

    return (
        <Link
            href={`/detailed/${movies.id}`}
            className="block w-full"
        >
                <div className="flex w-full flex-col overflow-hidden rounded-md bg-zinc-600 text-white">
                    <div className="relative aspect-2/3 w-full">
                    <Image
                        src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
                        alt={movies.title}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="flex min-h-19 flex-col gap-1 p-2 sm:min-h-22 sm:p-3">
                    <div className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 shrink-0 fill-yellow-400 text-yellow-400 sm:h-4 sm:w-4" />
                        <p className="text-sm sm:text-base">
                            {movies.vote_average.toFixed(1)}

                            <span className="text-xs text-gray-400 sm:text-sm">
                                {" "} / 10
                            </span>
                        </p>
                    </div>
                    <h1 className="line-clamp-2 text-sm leading-5 sm:text-base sm:leading-6">
                        {movies.title}
                    </h1>
                </div>

            </div>
        </Link>
    );
}
