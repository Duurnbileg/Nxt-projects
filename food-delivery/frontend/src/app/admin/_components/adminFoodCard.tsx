import Image from "next/image"
import { CategoryType } from "./foodMenu";
import { EditFood } from "./editFood";

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
        <main className="flex w-[270px] h-full flex-col justify-between overflow-hidden rounded-2xl border p-2">
            <div className="relative w-full">
                <Image
                    src={food.image || "/food-image.png"}
                    alt="Description"
                    width={900}
                    height={600}
                    loading="eager"
                    className="object-cover w-full h-[150px] rounded-lg"
                />
                <EditFood food={food} />
            </div>
            <div className="w-full h-fit flex flex-col gap-1 p-4">
                <div className="flex justify-between">
                    <p className="text-lg font-semibold text-red-400">{food.foodName}</p>
                    <p className="text-base font-semibold">{food.price}<span>₮</span></p>
                </div>
                <p className="text-xs line-clamp-2">{food.ingredients}</p>
            </div>
        </main>
    )
}