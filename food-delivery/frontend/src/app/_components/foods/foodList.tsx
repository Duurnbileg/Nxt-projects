"use client"
import { useEffect, useState } from "react"
import { FoodCard } from "./foodCard"
import { FoodType } from "@/app/admin/_components/adminFoodCard";
import { API_URL } from "@/lib/api";
import { toast } from "sonner";

export type CategoryType = {
    _id: string;
    categoryName: string;
    foodCount: number;
    description: string;
};

const food = [1, 2, 3, 4]

export const FoodList = ({ category }: { category: CategoryType }) => {
    const [foods, setFoods] = useState<FoodType[]>([]);

    const getFoods = async () => {
        try {
            const response = await fetch(
                `${API_URL}/category/${category._id}`,
            );
            if (!response.ok) throw new Error();
            const data = await response.json();
            setFoods(data.foods || []);
        } catch {
            toast.error(`Failed to load ${category.categoryName}`);
        }
    };

    useEffect(() => {
        getFoods();
    }, [category._id]);

    if (!foods.length) return null;


    return (
        <main className="w-full my-20">
            <div className="flex w-full justify-between">
                <p className="text-3xl text-white mb-6 font-semibold">
                    {category.categoryName}
                    <span className="text-2xl text-zinc-400 font-normal"> ({foods.length})</span>
                </p>
            </div>
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {foods.map((food) => (
                    <FoodCard key={food._id} food={food} />
                ))}
            </div>
        </main>
    )
}