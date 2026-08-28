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
    const [page, setPage] = useState(1)

    const fetchSearchMovie = async () => {
        const response = await fetch(`${BASE_URL}/search/movie?query=${searchValue}&language=en-US&page=${page}&api_key=${API_KEY}`)
        const data = await response.json()
        console.log(data);
        setSearchData(data.results)
    }

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Enter") {
            fetchSearchMovie()
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchValue) {
                if (!searchValue.trim()) {
                    setSearchData([]);
                    return;
                }
                fetchSearchMovie()
            };
        }, 500);
        return () => clearTimeout(timer)
    }, [searchValue])

    return (
        <InputGroup className="w-full max-w-[600px]">
            <InputGroupInput
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleKeyDown}
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