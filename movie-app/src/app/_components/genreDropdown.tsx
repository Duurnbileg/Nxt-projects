"use client"

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { InputGroupButton } from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { tmdbUrl } from "@/lib/tmdb";

export const GenreDropDown = () => {
    const [genreList, setGenreList] = useState<Genre[]>([])

    useEffect(() => {
        const fetchGenreList = async () => {
            const response = await fetch(
                tmdbUrl("/genre/movie/list", { language: "en" })
            )
            const data = await response.json()
            setGenreList(data.genres ?? [])
        }
        fetchGenreList()
    }, [])

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <ChevronDown />
                    Genre
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[540px] flex flex-col gap-4 p-6">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold">Genres</h1>
                    <p>See lists of movies by genre</p>
                </div>
                <Separator />
                <DropdownMenuGroup className="flex flex-wrap gap-3">
                    {genreList?.map((item) => (
                        <Link key={item.id} href={`/sameGenreMovies/${item.id}?name=${item.name}`} className="flex items-center">
                            <InputGroupButton className="bg-white text-black text-xs font-semibold border-gray-300 rounded-4xl">
                                {item.name}
                                <ChevronRight />
                            </InputGroupButton>
                        </Link>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
