import type { Movie } from "@/app/type";
import { Star } from "lucide-react";
import Image from "next/image";
import { tmdbImage } from "@/lib/tmdb";

export const DetailedHero = ({ movie }: { movie?: Movie }) => {
    return (
        <div className="flex flex-col gap-6 mt-4 w-full">
            <div className="flex justify-between w-full gap-4">
                <div className="flex flex-col gap-1">
                    <div>
                        <h1 className="text-4xl max-sm:text-2xl font-bold">{movie?.title}</h1>
                    </div>
                    <p className="text-lg max-[760px]:text-base">
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
                            <p className="text-2xl font-semibold max-sm:text-lg">
                                {(movie?.vote_average ?? 0).toFixed(1)}
                                <span className="text-gray-500 text-xl max-sm:text-sm">/10</span>
                            </p>
                            <span className="text-gray-500 text-xs">{movie?.vote_count}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-8 max-md:flex-col">
                <Image
                    src={tmdbImage(movie?.poster_path)}
                    alt={movie?.title ?? "poster"}
                    loading="eager"
                    width={290}
                    height={430}
                    className="w-[290px] h-[428px] max-[641]:hidden"
                />
                <Image
                    src={tmdbImage(movie?.backdrop_path ?? movie?.poster_path, "original")}
                    alt={movie?.title ?? "backdrop"}
                    loading="eager"
                    width={760}
                    height={430}
                    className="w-full h-[430px] max-md:h-auto max-md:aspect-video object-cover"
                />
            </div>
        </div>
    )
}
