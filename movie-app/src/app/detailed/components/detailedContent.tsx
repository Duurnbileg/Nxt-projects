import type { Credit, Movie } from "@/app/type";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export const DetailedContent = ({ movie, credit }: { movie?: Movie, credit?: Credit }) => {

    const directors = credit?.crew?.filter((item) => item.known_for_department == "Directing")
    const writers = credit?.crew?.filter((item) => item.known_for_department == "Writing")
    const stars = credit?.cast?.filter((item) => item.known_for_department == "Acting")

    return (
        <div className="w-full flex flex-col gap-5 items-start px-8 py-4 max-[410px]:px-4">
            <div className="flex gap-4 w-full">
                <Image
                    src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                    alt="hero"
                    loading="eager"
                    width={290}
                    height={148}
                    className="w-[100px] h-[148px] max-[410px]:visible min-[640px]:hidden"
                ></Image>
                <div className="w-full">
                    <div className="flex flex-wrap gap-2">
                        {movie?.genres.map((item, index) => (
                            <Badge key={index}>{item.name}</Badge>
                        ))}
                    </div>
                    <p className="w-full mt-4 line-clamp-6">{movie?.overview}</p>
                </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <div className="flex gap-13 max-sm:gap-4 max-sm:flex-col">
                    <p className="font-bold w-[80px]">Director</p>
                    <div className="flex gap-4 max-sm:flex-wrap">
                        {directors?.slice(0, 1)?.map((item, index) => {
                            return (
                                <span key={index}>{item.name}</span>
                            )
                        })}
                    </div>
                </div>
                <Separator className="w-full" />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <div className="flex gap-13 max-sm:gap-4 max-sm:flex-col">
                    <p className="font-bold w-[80px]">Writers</p>
                    <div className="flex gap-4 max-sm:flex-wrap">
                        {writers?.slice(0, 2)?.map((item, index) => {
                            return (
                                <span key={index}>{item.name}</span>
                            )
                        })}
                    </div>
                </div>
                <Separator className="w-full" />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <div className="flex gap-13 max-sm:gap-4 max-sm:flex-col">
                    <p className="font-bold w-[80px]">Stars</p>
                    <div className="flex gap-4 max-sm:flex-wrap">
                        {stars?.slice(0, 4)?.map((item, index) => {
                            return (
                                <span key={index}>{item.name}</span>
                            )
                        })}
                    </div>
                </div>
                <Separator className="w-full" />
            </div>
        </div>
    )

}