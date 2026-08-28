import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Image from "next/image"

export const FoodCard = () => {
    return (
        <main className="flex w-full flex-col overflow-hidden rounded-2xl bg-white p-4">
            <div className="relative w-full">
                <Image
                    src="/food-image.png"
                    alt="Description"
                    width={360}
                    height={210}
                    loading="eager"
                    className="object-fill w-full"
                />
                <Button className="absolute bottom-3 right-3 rounded-full w-12 h-12 bg-white hover:bg-zinc-200">
                    <Plus className="text-red-500" />
                </Button>
            </div>
            <div className="w-full flex flex-col gap-2 p-4">
                <div className="flex justify-between">
                    <p className="text-2xl font-semibold text-red-400">Finger Food</p>
                    <p className="text-lg font-semibold">12.99$</p>
                </div>
                <p className="text-sm">Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.</p>
            </div>
        </main>
    )
}