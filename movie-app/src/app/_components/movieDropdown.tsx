import { Button } from "@/components/ui/button"
import { ChevronRight, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { tmdbImage } from "@/lib/tmdb"

export const MovieDropdown = ({ movie, searchValue }: { movie: Movie[], searchValue: string }) => {
    return (
        <div className="absolute z-10 top-7 left-0 w-full">
            {movie.length > 0 && (
                <div className="h-[400px] w-full rounded-lg border bg-white shadow-lg overflow-scroll mt-2">
                    {movie.map((item) => (
                        <Link
                            key={item.id}
                            href={`/detailed/${item.id}`}
                            className="flex items-center gap-3 p-2 hover:bg-gray-100"
                        >
                            <Image
                                src={tmdbImage(item.poster_path, "w185")}
                                alt={item.title}
                                width={60}
                                height={90}
                                className="object-cover rounded-md"
                            />
                            <div className="w-full text-black flex flex-col justify-between h-[88px]">
                                <h1 className="text-base font-semibold leading-6">{item.title}</h1>
                                <div className="flex justify-between">
                                    <div className="flex text-base items-center gap-1">
                                        <Star className="fill-yellow-400 text-yellow-400 w-4 h-4" />
                                        <p className="text-base font-semibold">
                                            {(item.vote_average ?? 0).toFixed(1)}
                                        </p>
                                    </div>
                                    <Button variant={"ghost"}>See more
                                        <ChevronRight />
                                    </Button>
                                </div>
                            </div>
                        </Link>
                    ))}
                    <Link href={`/searchResult?searchValue=${searchValue}`} className="h-[64px] flex justify-end items-center px-4">
                        <Button variant={"ghost"} className="w-full text-black bg-gray-200">See all results</Button>
                    </Link>
                </div>
            )}
        </div>
    )
}
