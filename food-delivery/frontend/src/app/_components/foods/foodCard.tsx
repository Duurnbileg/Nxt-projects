import { FoodType } from "@/app/admin/_components/adminFoodCard"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Image from "next/image"
import { FoodDetailDialog } from "./foodDialog"

export const FoodCard = ({ food }: { food: FoodType }) => {
    return (
        <main className="flex w-full flex-col overflow-hidden rounded-2xl bg-white p-4 gap-2 shadow-md">
            <div className="relative w-full">
                <Image
                    src="/food-image.png"
                    alt="Description"
                    width={900}
                    height={600}
                    loading="eager"
                    className="object-fill w-full h-full"
                />
                <FoodDetailDialog food={food} />
            </div>
            <div className="w-full flex flex-col gap-2 p-2">
                <div className="flex justify-between">
                    <p className="text-2xl font-semibold text-red-400">{food.foodName}</p>
                    <p className="text-xl font-semibold">{food.price}₮</p>
                </div>
                <p className="text-base font-medium">{food.ingredients}</p>
            </div>
        </main>
    )
}