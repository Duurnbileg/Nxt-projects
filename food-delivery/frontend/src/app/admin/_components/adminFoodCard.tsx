import { Button } from "@/components/ui/button"
import { Edit, Pencil, Plus } from "lucide-react"
import Image from "next/image"
import { CategoryType } from "./foodMenu";

export type FoodType = {
    foodName: string;
    price: number;
    image: string;
    ingredients: string;
    _id: string;
    category: CategoryType;
};

export const AdminFoodCard = ({ food }: { food: FoodType }) => {
    return (
        <main className="flex w-[270px] flex-col overflow-hidden rounded-2xl border p-2">
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
                    <Pencil className="text-red-500" />
                </Button>
            </div>
            <div className="w-full flex flex-col gap-1 p-4">
                <div className="flex justify-between">
                    <p className="text-lg font-semibold text-red-400">Finger Food</p>
                    <p className="text-base font-semibold">12.99$</p>
                </div>
                <p className="text-xs line-clamp-2">Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.</p>
            </div>
        </main>
    )
}