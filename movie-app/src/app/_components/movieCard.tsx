import type { Movie } from "@/app/type";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const MovieCard = ({ movies, variant = "default" }: { movies: Movie, variant?: "default" | "small" }) => {

    const isSmall = variant === "small";

    return (
        <Link href={`/detailed/${movies.id}`}>
            <div className={`
                relative flex flex-col items-center justify-between text-white bg-gray-200 rounded-md overflow-hidden
                ${isSmall ? "w-[190px] h-[372px]" : "w-[220px] h-[440px]"}
            `}>
                <Image
                    src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
                    alt="hero"
                    loading="eager"
                    width={230}
                    height={340}
                    className={`
                        ${isSmall ? "h-[280px] object-cover" : "w-full h-[340px] object-cover"}
                    `}
                />
                <div className="flex flex-col h-full w-full p-3 items-start text-black gap-1">
                    <div className="flex text-base items-center gap-1">
                        <Star className="fill-yellow-400 text-yellow-400 w-4 h-4" />
                        <p className="text-base ">{movies.vote_average.toFixed(1)} <span className="text-sm text-gray-600"> / 10</span></p>
                    </div>
                    <div className="w-full h-full">
                        <h1 className="text-base leading-6">{movies.title}</h1>
                    </div>
                </div>
            </div>
        </Link>
    );
}
