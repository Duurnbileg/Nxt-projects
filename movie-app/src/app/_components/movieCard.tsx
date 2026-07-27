import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MovieCard({ movie, variant = "default" }: { movie: Movie, variant?: "default" | "small" }) {

    const isSmall = variant === "small";

    return (
        <Link href={`/detailed/${movie.id}`}>
            <div className={`
                relative flex flex-col items-center justify-between text-white bg-gray-200 rounded-md overflow-hidden
                ${isSmall ? "w-47.5 h-92.5" : "w-57.5 h-110"}
            `}>
                <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt="hero"
                    width={230}
                    height={340}
                    className={`
                        ${isSmall ? "w-auto h-auto" : "w-57.5 h-85"}
                    `}
                />
                <div className="flex flex-col h-full w-full p-4 items-start text-black gap-1">
                    <div className="flex text-base items-center gap-1">
                        <Star className="fill-yellow-400 text-yellow-400 w-4 h-4" />
                        <p className="text-base ">{movie.vote_average.toFixed(1)} <span className="text-sm text-gray-600"> / 10</span></p>
                    </div>
                    <div className="w-full h-full">
                        <h1 className="text-lg leading-6">{movie.title}</h1>
                    </div>
                </div>
            </div>
        </Link>
    );
}
