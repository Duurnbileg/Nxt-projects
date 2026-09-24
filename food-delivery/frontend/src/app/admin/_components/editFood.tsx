"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FoodType } from "./adminFoodCard";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CategoryType } from "./foodMenu";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/lib/api";

export const EditFood = ({ food }: { food: FoodType }) => {
    const [editingFood, setEditingFood] = useState(food.foodName);
    const [ingredients, setIngredients] = useState(food.ingredients);
    const [price, setPrice] = useState(food.price);
    const [editCategory, setEditCategory] = useState(food.category._id);
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [imgUrl, setImgUrl] = useState(food.image);
    const [uploading, setUploading] = useState(false);

    const getCategory = async () => {
        try {
            const res = await fetch(`${API_URL}/category`);
            const data = await res.json();
            setCategories(data.categories);
        } catch {
            toast.error("Failed to load categories");
        }
    };

    const editFood = async () => {
        try {
            const res = await fetch(`${API_URL}/food`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: food._id,
                    foodName: editingFood,
                    ingredients: ingredients,
                    price: price,
                    category: editCategory,
                    image: imgUrl,
                }),
            });
            if (!res.ok) throw new Error();
            toast.success("Food updated");
        } catch {
            toast.error("Failed to update food");
        }
    };

    const deleteFood = async () => {
        try {
            const res = await fetch(`${API_URL}/food`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: food._id,
                }),
            });
            if (!res.ok) throw new Error();
            toast.success("Food deleted");
        } catch {
            toast.error("Failed to delete food");
        }
    };

    const uploadToCloudinary = async (file: File) => {
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
        console.log("Cloudinary config:", { cloudName, uploadPreset });
        if (!cloudName || !uploadPreset) {
            throw new Error("Cloudinary configuration is missing");
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);
        console.log("Uploading to Cloudinary with formData:", formData);
        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                },
            );
            const data = await response.json();
            if (!response.ok) {
                throw new Error(
                    data.error?.message || "Cloudinary upload failed",
                );
            }
            if (!data.secure_url) {
                throw new Error("secure_url not found");
            }
            console.log("Cloudinary upload successful, secure_url:", data);
            return data.secure_url;
        } catch (error) {
            console.error("Cloudinary upload error:", error);
            throw error;
        }
    };

    const handleImgUpload = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const url = await uploadToCloudinary(file);
            if (url) {
                setImgUrl(url);
                toast.success("Image uploaded");
            }
        } catch {
            // toast already shown
        } finally {
            setUploading(false);
        }
    };

    useEffect(() => {
        getCategory();
    }, []);
    return (
        <Dialog>
            <DialogTrigger className="w-10 h-10 bg-white rounded-full absolute z-10 top-25 left-50 flex items-center justify-center">
                <Pencil className="text-red-400 w-5 h-5" />
            </DialogTrigger>
            <DialogContent>
                <div className="flex flex-col w-full max-h-[600px] overflow-y-auto bg-white rounded-lg gap-3 ">
                    <div className="font-bold text-2xl">Dishes info</div>
                    <div className="flex gap-4 py-3 h-[60px]">
                        <div className="w-30 text-xs text-gray-400">Dish name</div>
                        <Input
                            value={editingFood}
                            onChange={(event) => setEditingFood(event?.target.value)}
                        />
                    </div>
                    <div className="flex gap-4 py-3 h-[60px]">
                        <div className="w-30 text-xs text-gray-400">Dish category</div>
                        <Select
                            value={editCategory}
                            onValueChange={(value) => setEditCategory(value)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {categories.map((item) => (
                                        <SelectItem key={item._id} value={item._id}>
                                            {item.categoryName}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex gap-4 py-3 h-[60px]">
                        <div className="w-30 text-xs text-gray-400">Ingredients</div>
                        <Textarea
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-4 py-3 h-[60px]">
                        <div className="w-30 text-xs text-gray-400">Price</div>
                        <Input
                            value={price}
                            type="number"
                            onChange={(e) => setPrice(Number(e.target.value))}
                        />
                    </div>
                    <div className="flex gap-4 py-3">
                        <div className="w-30 text-xs text-gray-400">Image</div>
                        <div className="flex w-full flex-col gap-2">
                            {uploading ? (
                                <p className="text-sm text-gray-400">Uploading...</p>
                            ) : (
                                imgUrl && (
                                    <img
                                        src={imgUrl}
                                        alt={editingFood}
                                        className="h-32 w-full rounded-lg object-cover"
                                    />
                                )
                            )}
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleImgUpload}
                            />
                        </div>
                    </div>
                    <div className="w-full flex gap-2">
                        <Button
                            variant="outline"
                            className="w-1/2"
                            onClick={() => deleteFood()}
                        >
                            Delete
                        </Button>
                        <Button
                            variant="default"
                            className="w-1/2"
                            onClick={() => editFood()}
                        >
                            Save Changes
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};