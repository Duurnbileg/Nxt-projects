import { Star } from "lucide-react";
import Image from "next/image";

export default function DetailedHero() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between">
                <div>
                    <div>
                        <h1 className="text-4xl font-bold">Wicked</h1>
                        <p></p>
                    </div>
                    <p className="text-lg">
                        Release date
                        <span> · </span>
                        PG
                        <span> · </span>
                        Duration time
                    </p>
                </div>
                <div>
                    <p className="text-xs">Rating</p>
                    <div className="flex text-base items-center gap-2">
                        <Star className="w-6 h-6 fill-amber-300 stroke-amber-300" />
                        <div className="flex flex-col">
                            <p className="text-lg font-semibold">
                                6.9
                                <span className="text-gray-500 text-base">/10</span>
                            </p>
                            <span className="text-gray-500 text-xs">37k</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-8">
                <Image
                    src="/MoviePoster.png"
                    alt="hero"
                    width={290}
                    height={430}
                    className="w-full w-[290px] h-[430px] "
                ></Image>
                <Image
                    src="/movieImg.png"
                    alt="hero"
                    width={290}
                    height={430}
                    className="w-full w-[290px] h-[430px] "
                ></Image>
            </div>
        </div>
    )

}