"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Moon, Search, Sun, X } from "lucide-react"
import Link from "next/link"
import { SearchInput } from "./searchInput"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { GenreDropDown } from "./genreDropdown"

export const Header = () => {
    const { resolvedTheme, setTheme } = useTheme()

    const [mounted, setMounted] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <header className="w-full px-4 py-3 sm:px-6 md:px-10 lg:px-16">
            {isSearchOpen ? (
                <div className="flex w-full items-center gap-3 sm:hidden">
                    <div className="min-w-0 flex-1">
                        <SearchInput />
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0"
                        onClick={() => setIsSearchOpen(false)}
                    >
                        <X />
                    </Button>
                </div>
            ) : (
                <div className="flex w-full items-center justify-between gap-4">
                    <Link
                        href="/"
                        className="flex shrink-0 items-center gap-2"
                    >
                        <Image
                            src="/Logo.png"
                            alt="logo"
                            width={72}
                            height={16}
                            className="object-contain"
                            priority
                        />
                    </Link>
                    <div className="hidden items-center gap-2 sm:flex">
                        <GenreDropDown />

                        <div className="w-[280px] md:w-[350px]">
                            <SearchInput />
                        </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="sm:hidden"
                            onClick={() => setIsSearchOpen(true)}
                        >
                            <Search />
                        </Button>
                        {mounted && (
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                    setTheme(
                                        resolvedTheme === "dark"
                                            ? "light"
                                            : "dark"
                                    )
                                }
                            >
                                {resolvedTheme === "dark" ? (
                                    <Sun />
                                ) : (
                                    <Moon />
                                )}
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </header>
    )
}