import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { ShoppingCart } from "lucide-react"
import { CartTabs } from "../_components/cartTabs"

export function FoodSheet({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) {
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent className="bg-zinc-800 px-4 w-200">
                <SheetHeader>
                    <div className="flex gap-2 text-white">
                        <ShoppingCart />
                        <SheetTitle className="self-center text-white text-lg font-bold"> Edit profile</SheetTitle>
                    </div>
                </SheetHeader>
                <CartTabs />
                <SheetFooter>
                    <Button type="submit">Save changes</Button>
                    <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
