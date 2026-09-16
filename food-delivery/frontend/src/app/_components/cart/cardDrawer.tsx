"use client"

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { ShoppingCart } from "lucide-react"
import { CartTabs } from "./cartTabs"

export function CardDrawer({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) {
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent className="flex w-full flex-col gap-6 overflow-y-auto border-none bg-zinc-700 p-6 sm:max-w-xl [&>button]:rounded-full [&>button]:bg-white [&>button]:text-black [&>button]:opacity-100 [&>button]:hover:bg-zinc-100">
                <SheetHeader className="p-0">
                    <div className="flex items-center gap-2 text-white">
                        <ShoppingCart className="size-5" />
                        <SheetTitle className="text-xl font-semibold text-white">
                            Order detail
                        </SheetTitle>
                    </div>
                </SheetHeader>
                <CartTabs />
            </SheetContent>
        </Sheet>
    )
}
