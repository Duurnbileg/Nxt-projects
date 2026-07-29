import type { Movie } from "@/app/type";
import { Star } from "lucide-react";
import Image from "next/image";

export const DetailedHero = ({ movie }: { movie?: Movie }) => {

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between">
                <div className="flex flex-col gap-1">
                    <div>
                        <h1 className="text-4xl font-bold">{movie?.title}</h1>
                    </div>
                    <p className="text-lg">
                        {movie?.release_date}
                        <span> · </span>
                        PG
                        <span> · </span>
                        {movie?.runtime} min
                    </p>
                </div>
                <div>
                    <p className="text-sm">Rating</p>
                    <div className="flex text-base items-center gap-2">
                        <Star className="w-6 h-6 fill-amber-300 stroke-amber-300" />
                        <div className="flex flex-col">
                            <p className="text-2xl font-semibold">
                                {movie?.vote_average.toFixed(1)}
                                <span className="text-gray-500 text-xl">/10</span>
                            </p>
                            <span className="text-gray-500 text-xs">{movie?.vote_count}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-8">
                <Image
                    src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                    alt="hero"
                    loading="eager"
                    width={290}
                    height={430}
                    className="w-full w-[290px] h-[430px] "
                ></Image>
                <Image
                    src={`https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`}
                    alt="hero"
                    loading="eager"
                    width={290}
                    height={430}
                    className="w-full w-[290px] h-[430px] "
                ></Image>
            </div>
        </div>
    )

}