"use client"
import { ShoppingCart, User } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { LocationDialog } from "../_components/locationDialog"
import { useState } from "react"
import { FoodSheet } from "./foodSheet"

export const Header = () => {
    const [open, setOpen] = useState(false)
    return (
        <header className="bg-black flex w-full justify-between px-22 py-3">
            <Image
                src="/Logo-white.png"
                alt="Description"
                width={120}
                height={32}
                loading="eager"
                className="object-cover"
            />
            <div className="flex gap-2">
                <LocationDialog />
                <Button className="bg-white rounded-full hover:bg-zinc-200" onClick={() => setOpen(true)}>
                    <ShoppingCart className="text-black" />
                </Button>
                <Button className="rounded-full bg-red-400 hover:bg-red-300">
                    <User />
                </Button>
                <FoodSheet open={open} setOpen={setOpen} />
            </div>
        </header>
    )
}