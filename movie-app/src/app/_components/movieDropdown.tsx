import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ChevronRight, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const API_KEY = "c57b8556952c6312699fd719663951e1"
const BASE_URL = "https://api.themoviedb.org/3"

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
                                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                alt="logo"
                                width={60}
                                height={40}
                                className="object-contain ab rounded-md w-fit"
                            ></Image>
                            <div className="w-full text-black flex flex-col justify-between h-[88px]">
                                <h1 className="text-lg font-semibold leading-6 w-[300px]">{item.title}</h1>
                                <div className="flex justify-between">
                                    <div className="flex text-base items-center gap-1">
                                        <Star className="fill-yellow-400 text-yellow-400 w-4 h-4" />
                                        <p className="text-base font-semibold">{item.vote_average.toFixed(1)}</p>
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
                </div >
            )
            }
        </div >
    )
}