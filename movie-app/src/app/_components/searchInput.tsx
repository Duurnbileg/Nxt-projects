"use client"

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import { MovieDropdown } from "./movieDropdown"

const API_KEY = "c57b8556952c6312699fd719663951e1"
const BASE_URL = "https://api.themoviedb.org/3"

export const SearchInput = () => {
    const [searchValue, setSearchValue] = useState<string>("")
    const [searchData, setSearchData] = useState<Movie[]>([])

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (!searchValue.trim()) {
                setSearchData([]);
                return;
            }
            const response = await fetch(`${BASE_URL}/search/movie?query=${searchValue}&language=en-US&page=1&api_key=${API_KEY}`)
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
