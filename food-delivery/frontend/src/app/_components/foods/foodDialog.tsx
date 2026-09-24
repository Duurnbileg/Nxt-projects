"use client";

import { useEffect, useState } from "react";
import { Check, Minus, Plus, X } from "lucide-react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { FoodType } from "@/app/admin/_components/adminFoodCard";

export function FoodDetailDialog({ food }: { food: FoodType }) {
    const [open, setOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [inCart, setInCart] = useState(false);

    const price = Number(food.price) || 0;
    const total = price * quantity;

    useEffect(() => {
        const check = () => {
            const cart = JSON.parse(localStorage.getItem("cart") || "[]");
            setInCart(cart.some((item: any) => item.foodId === food._id));
        };
        check();
        window.addEventListener("cart-updated", check);
        return () => window.removeEventListener("cart-updated", check);
    }, [food._id]);

    const handleAddToCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");

        const found = cart.find((item: any) => item.foodId === food._id);

        if (found) {
            found.quantity += quantity;
        } else {
            cart.push({
                foodId: food._id,
                foodName: food.foodName,
                price,
                imageSrc: food.image,
                ingredients: food.ingredients,
                quantity,
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem("cart-count", JSON.stringify(cart.length));

        window.dispatchEvent(new Event("cart-updated"));
        toast.success(`${food.foodName} added to cart`);
        setOpen(false);
        setQuantity(1);
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(next) => {
                setOpen(next);
                if (next) setQuantity(1);
            }}
        >
            <DialogTrigger
                className={`absolute bottom-3 right-3 flex size-10 items-center justify-center rounded-full shadow-md transition hover:scale-105 ${inCart ? "bg-red-500 text-white" : "bg-white"
                    }`}
            >
                {inCart ? (
                    <Check className="size-5" strokeWidth={2.5} />
                ) : (
                    <Plus className="size-5 text-red-500" strokeWidth={2.5} />
                )}
            </DialogTrigger>

            <DialogContent
                showCloseButton={false}
                className="max-h-[90vh] overflow-y-auto rounded-3xl p-4 sm:max-w-[720px] sm:p-5"
            >
                <div className="grid gap-5 sm:grid-cols-2">
                    <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100 sm:aspect-auto sm:min-h-[280px]">
                        {food.image ? (
                            <img
                                src={food.image}
                                alt={food.foodName}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full min-h-[200px] items-center justify-center text-sm text-neutral-400">
                                No image
                            </div>
                        )}
                    </div>

                    <div className="relative flex flex-col pr-8">
                        <div className="flex justify-between">
                            <div className="w-1 h-1"></div>
                            <DialogClose className="flex size-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-700 transition hover:bg-neutral-200">
                                <X className="size-4" />
                            </DialogClose>
                        </div>
                        <div className="flex flex-col gap-2">
                            <DialogTitle className="text-2xl font-semibold text-red-500">
                                {food.foodName}
                            </DialogTitle>
                            <DialogDescription className="text-base leading-relaxed">
                                {food.ingredients}
                            </DialogDescription>
                        </div>
                        <div className="mt-auto flex items-end justify-between gap-4 pt-4">
                            <div>
                                <p className="text-xs text-neutral-500">Total price</p>
                                <p className="text-xl font-semibold text-neutral-900">
                                    {total}₮
                                </p>
                            </div>

                            <div className="flex w-[121px] items-center justify-between">
                                <button
                                    type="button"
                                    disabled={quantity <= 1}
                                    onClick={() => setQuantity(quantity - 1)}
                                    className="flex size-9 items-center justify-center rounded-full border border-neutral-300 disabled:opacity-40"
                                >
                                    <Minus className="size-4" />
                                </button>
                                <span className="min-w-6 text-center text-base font-medium">
                                    {quantity}
                                </span>
                                <button
                                    type="button"
                                    disabled={quantity >= 10}
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="flex size-9 items-center justify-center rounded-full bg-neutral-900 text-white"
                                >
                                    <Plus className="size-4" />
                                </button>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={handleAddToCart}
                            className="mt-4 flex h-11 w-full items-center justify-center rounded-full bg-neutral-900 text-sm font-medium text-white"
                        >
                            Add to cart
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}