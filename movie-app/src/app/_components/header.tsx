"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./searchInput";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const Header = () => {
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <header className="w-full max-w-[1520px] flex justify-between px-16 py-3">
            <Link href="/" className="flex items-center gap-2">
                <Image
                    src="/Logo.png"
                    alt="logo"
                    width={88}
                    height={20}
                    className="object-contain"
                    loading="eager"
                ></Image>
            </Link>
            <SearchInput />
            {mounted && (
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                        setTheme(resolvedTheme === "dark" ? "light" : "dark")
                    }
                >
                    {resolvedTheme === "dark"
                        ? <Sun />
                        : <Moon />
                    }
                </Button>
            )}
        </header>
    );
}
