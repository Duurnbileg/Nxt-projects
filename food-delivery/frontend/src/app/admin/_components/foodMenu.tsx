"use client"

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import { AdminFoodList } from "./adminFoodList";

export type CategoryType = {
    categoryName: string;
    _id: string;
    foodCount: number;
};

export const FoodMenu = () => {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [totalFoods, setTotalFoods] = useState(0);
    const [categgoryName, setCateggoryName] = useState("");

    const getCategory = async () => {
        try {
            const res = await fetch(api.category);
            const data = await res.json();
            console.log(data);
            setCategories(data.categories);
            setTotalFoods(data.allFoodCount);
        } catch {
            toast.error("Failed to load categories");
        }
    };


    const createCategory = async () => {
        if (!categgoryName.trim()) {
            toast.error("Enter a category name");
            return;
        }
        try {
            const res = await fetch(api.category, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    categoryName: categgoryName,
                }),
            });
            if (!res.ok) throw new Error();
            toast.success("Category created");
            getCategory();
            setCateggoryName("");
        } catch {
            toast.error("Failed to create category");
        }
    };

    const deleteCategory = async (categoryId: string) => {
        try {
            const res = await fetch(api.category, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: categoryId,
                }),
            });
            if (!res.ok) throw new Error();
            toast.success("Category deleted");
            getCategory();
        } catch {
            toast.error("Failed to delete category");
        }
    };

    useEffect(() => {
        getCategory();
    }, []);

    return (
        <section className="bg-accent flex justify-center w-full">
            <div className="w-full flex flex-col flex-1 min-w-0 p-2 gap-6">
                <div className="w-full flex flex-col items-end gap-2">
                    <div className="w-8 h-8 bg-red-400 rounded-full"></div>
                    <div className="w-full flex bg-white p-4 gap-2 rounded-xl">
                        {categories.map((category) => {
                            return (
                                <Button
                                    key={category._id}
                                    variant="outline"
                                    className="rounded-full"
                                >
                                    {category.categoryName}
                                    <Badge>{category.foodCount}</Badge>
                                </Button>
                            )
                        })}
                        <Dialog>
                            <DialogTrigger  >
                                <div className="flex items-center justify-center h-8 w-8 bg-red-500 text-white text-2xl rounded-full ">
                                    +
                                </div>
                            </DialogTrigger>
                            <DialogContent>
                                <div className="flex flex-col gap-4">
                                    <p className="text-2xl font-semibold">Add new category</p>
                                    <div className="flex flex-col gap-2">
                                        <p className="font-medium">Cateogory name</p>
                                        <Input
                                            placeholder="Type category name..."
                                            onChange={(e) => setCateggoryName(e.target.value)}
                                            value={categgoryName}
                                        />
                                    </div>
                                    <Button onClick={() => createCategory()}>Add category</Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-8">
                    {categories.map((category) => (
                        <AdminFoodList key={category._id} category={category} getCategory={() => getCategory()} />
                    ))}
                </div>
            </div>
        </ section>
    )
}