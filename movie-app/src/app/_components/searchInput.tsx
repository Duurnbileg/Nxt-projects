"use client"

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import { MovieDropdown } from "./movieDropdown"
import { tmdbUrl } from "@/lib/tmdb"

export const SearchInput = () => {
    const [searchValue, setSearchValue] = useState<string>("")
    const [searchData, setSearchData] = useState<Movie[]>([])

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (!searchValue.trim()) {
                setSearchData([]);
                return;
            }
            const response = await fetch(
                tmdbUrl("/search/movie", {
                    query: searchValue,
                    language: "en-US",
                    page: 1,
                })
            )
            const data = await response.json()
            setSearchData(data.results ?? [])
        }, 500);
        return () => clearTimeout(timer)
    }, [searchValue])

    return (
        <InputGroup className="w-full max-w-[600px]">
            <InputGroupInput
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <InputGroupAddon>
                <Search />
            </InputGroupAddon>
            <MovieDropdown
                movie={searchData}
                searchValue={searchValue}
            />
        </InputGroup>
    )
}
