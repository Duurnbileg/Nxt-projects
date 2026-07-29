import type { Credit, Movie } from "@/app/type";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const DetailedContent = ({ movie, credit }: { movie?: Movie, credit?: Credit }) => {

    const directors = credit?.crew?.filter((item) => item.known_for_department == "Directing")
    const writers = credit?.crew?.filter((item) => item.known_for_department == "Writing")
    const stars = credit?.cast?.filter((item) => item.known_for_department == "Acting")

    return (
        <div className="w-full flex flex-col gap-5 items-start px-8 py-4">
            <div className="flex gap-2">
                {movie?.genres.map((item, index) => (
                    <Badge key={index}>{item.name}</Badge>
                ))}
            </div>
            <p>{movie?.overview}</p>
            <div className="flex flex-col gap-2 w-full">
                <div className="flex gap-13">
                    <p className="font-bold w-[80px]">Director</p>
                    <div className="flex gap-4">
                        {directors?.slice(0, 2)?.map((item, index) => {
                            return (
                                <span key={index}>{item.name}</span>
                            )
                        })}
                    </div>
                </div>
                <Separator className="w-full" />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <div className="flex gap-13">
                    <p className="font-bold w-[80px]">Writers</p>
                    <div className="flex gap-4">
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
                <div className="flex gap-13">
                    <p className="font-bold w-[80px]">Stars</p>
                    <div className="flex gap-4">
                        {stars?.slice(0, 3)?.map((item, index) => {
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