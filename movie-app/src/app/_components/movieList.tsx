import { Button } from "@/components/ui/button";
import MovieCard from "./movieCard";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function MovieList({ genre, seeMoreShow, movies }: { genre: string, seeMoreShow: boolean, movies: Movie[] }) {

    return (
        <div className="w-full flex flex-col justify-center px-20">
            <div className="w-full flex items-center justify-between mb-4">
                <p className="text-2xl font-bold">{genre}</p>
                {seeMoreShow &&
                    <div className="flex items-center">
                        <Button variant="ghost" size="sm" className="ml-4">
                            <Link href={`/${genre.toLowerCase()}`} className="flex items-center gap-1">
                                <p>See more</p>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </Button>
                    </div>
                }
            </div>
            <div className="w-full flex flex-wrap gap-8 justify-center ">
                {
                    movies.slice(0, 10).map((item) => (
                        <MovieCard key={item.id} movie={item} />
                    ))
                }
            </div>
        </div >
    );
}
