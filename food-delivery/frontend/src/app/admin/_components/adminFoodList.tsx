"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ImagePlus, Plus } from "lucide-react";
import { AdminFoodCard } from "./adminFoodCard";
import { API_URL } from "@/lib/api";
import { CategoryType } from "./foodMenu";

const inputClass =
    "h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10";

export const AdminFoodList = ({
    category,
    getCategory,
}: {
    category: CategoryType;
    getCategory: () => void;
}) => {
    const [foods, setFoods] = useState([]);
    const [foodName, setFoodName] = useState("");
    const [foodPrice, setFoodPrice] = useState("");
    const [foodIngredients, setFoodIngredients] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [uploading, setUploading] = useState(false);

    const getFoods = async () => {
        try {
            const response = await fetch(
                `${API_URL}/category/${category._id}`,
            );
            const data = await response.json();
            setFoods(data.foods);
        } catch {
            toast.error("Failed to load foods");
        }
    };

    const createFood = async () => {
        if (!foodName.trim()) {
            toast.error("Enter a food name");
            return;
        }
        try {
            const res = await fetch(`${API_URL}/food`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    foodName: foodName,
                    image: imgUrl,
                    ingredients: foodIngredients,
                    price: foodPrice,
                    category: category._id,
                }),
            });
            if (!res.ok) throw new Error()
            toast.success("Food created");
            setFoodName("");
            setFoodPrice("");
            setFoodIngredients("");
            setImgUrl("");
            getCategory();
            getFoods();
        } catch {
            toast.error("Failed to create food");
        }
    };

    const uploadToCloudinary = async (file: File) => {
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
        if (!cloudName || !uploadPreset) {
            throw new Error("Cloudinary configuration is missing");
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);
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
            setImgUrl(url);
            toast.success("Image uploaded");
        } catch (error) {
            toast.error("Image upload failed");
        } finally {
            setUploading(false);
        }
    };

    useEffect(() => {
        getFoods();
        createFood();
    }, []);

    return (
        <section className="p-5 bg-white rounded-lg w-full ">
            <div className="mb-4 flex items-center gap-2 uppercase">
                <h2 className="text-xl font-semibold tracking-tight">
                    {category.categoryName}
                </h2>
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1.5 text-[11px] font-medium text-white">
                    {category.foodCount}
                </span>
            </div>
            <div className="flex gap-4 h-[244px]">
                <Dialog>
                    <DialogTrigger className="group w-[270px] h-full flex aspect-3/4 flex-col items-center justify-center rounded-2xl border border-dashed border-red-200 bg-red-50/60 text-red-500 transition hover:border-red-400 hover:bg-red-50">
                        <div className="flex size-10 items-center justify-center rounded-full bg-red-500 text-white shadow-sm transition group-hover:scale-105">
                            <Plus className="size-5" />
                        </div>
                        <p className="mt-3 text-sm font-medium text-black">Add new dish to <br /> Appetizers</p>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Add {category.categoryName}</DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-2">
                                <div className="flex flex-col gap-1">
                                    <p>Food name</p>
                                    <input
                                        className={inputClass}
                                        type="text"
                                        placeholder="Food name"
                                        onChange={(e) => setFoodName(e.target.value)}
                                        value={foodName}
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p>Food price</p>
                                    <input
                                        className={inputClass}
                                        type="number"
                                        placeholder="Price"
                                        onChange={(e) => setFoodPrice(e.target.value)}
                                        value={foodPrice}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p>Ingredients</p>
                                <input
                                    className={inputClass}
                                    type="text"
                                    placeholder="Ingredients"
                                    onChange={(e) => setFoodIngredients(e.target.value)}
                                    value={foodIngredients}
                                />
                            </div>
                            {imgUrl ? (
                                <img
                                    src={imgUrl}
                                    alt="Food Image"
                                    className="h-40 w-full rounded-xl object-cover"
                                />
                            ) : uploading ? (
                                <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-neutral-200 bg-neutral-50 text-sm text-neutral-500">
                                    Uploading...
                                </div>
                            ) : (
                                <div className="flex flex-col gap-1">
                                    <p>Food image</p>
                                    <label className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-neutral-200 bg-neutral-50 text-neutral-500 transition hover:border-neutral-400 hover:bg-neutral-100">
                                        <ImagePlus className="mb-2 size-6" />
                                        <span className="text-sm font-medium">Upload image</span>
                                        <input
                                            className="hidden"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImgUpload}
                                        />
                                    </label>
                                </div>
                            )}

                            <Button
                                className="mt-1 h-10 w-full bg-red-500 text-white hover:bg-red-600"
                                onClick={createFood}
                                disabled={uploading}
                            >
                                Add Food
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
                <div className="flex flex-wrap gap-4">
                    {foods.map((food: any) => (
                        <AdminFoodCard key={food._id} food={food} />
                    ))}
                </div>
            </div>
        </section>
    );
};