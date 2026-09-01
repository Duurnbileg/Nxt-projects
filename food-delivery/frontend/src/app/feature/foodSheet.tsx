import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
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
                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                    <div className="grid gap-3">
                        <Label htmlFor="sheet-demo-name">Name</Label>
                        <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="sheet-demo-username">Username</Label>
                        <Input id="sheet-demo-username" defaultValue="@peduarte" />
                    </div>
                </div>
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
