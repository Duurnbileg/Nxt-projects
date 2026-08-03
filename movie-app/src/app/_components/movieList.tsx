import type { Movie } from "@/app/type";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MovieCard } from "./movieCard";

export const MovieList = ({ genre, seeMoreShow, movies, genreLink }: { genre: string, seeMoreShow: boolean, movies: Movie[], genreLink: string }) => {

    return (
        <div className="w-full flex flex-col justify-center">
            <div className="w-fill flex items-center justify-between mb-4">
                <p className="text-2xl font-bold">{genre}</p>
                {seeMoreShow &&
                    <div className="flex items-center">
                        <Button variant="ghost" size="sm" className="ml-4">
                            <Link href={`/${genreLink}`} className="flex items-center gap-1">
                                <p>See more</p>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </Button>
                    </div>
                }
            </div>
            <div className="w-full flex flex-wrap gap-6 justify-center ">
                {
                    movies.slice(0, 10).map((item) => (
                        <MovieCard key={item.id} movies={item} />
                    ))
                }
            </div>
        </div >
    );
}
