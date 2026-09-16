"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Minus, Plus, X } from "lucide-react"
import Image from "next/image"

type CartFoodCardProps = {
    name?: string
    description?: string
    price?: number
    imageSrc?: string
    onRemove?: () => void
}

export const CartFoodCard = ({
    name = "Sunshine Stackers",
    description = "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    price = 12.99,
    imageSrc = "/food-image.png",
    onRemove,
}: CartFoodCardProps) => {
    const [quantity, setQuantity] = useState(1)

    return (
        <div className="flex gap-2 py-4 first:pt-0 last:pb-0">
            <Image
                src={imageSrc}
                alt={name}
                width={100}
                height={100}
                loading="eager"
                className="size-25 shrink-0 rounded-xl object-cover"
            />
            <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                    <p className="text-base font-bold leading-5 text-red-500">{name}</p>
                    <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="size-6 shrink-0 rounded-full bg-white p-0 text-red-500 border-red-500 hover:bg-red-400 hover:text-white"
                        onClick={onRemove}
                        aria-label={`Remove ${name}`}
                    >
                        <X className="size-3.5 bg-transparent" />
                    </Button>
                </div>
                <p className="text-xs leading-4 text-zinc-500 line-clamp-2">{description}</p>
                <div className="mt-auto flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            className="flex size-5 items-center justify-center text-lg leading-none text-zinc-900 disabled:opacity-40"
                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                            disabled={quantity <= 1}
                            aria-label="Decrease quantity"
                        >
                            <Minus className="size-4" />
                        </button>
                        <span className="min-w-4 text-center text-lg font-semibold text-zinc-900">
                            {quantity}
                        </span>
                        <button
                            type="button"
                            className="flex size-5 items-center justify-center text-lg leading-none text-zinc-900"
                            onClick={() => setQuantity((q) => q + 1)}
                            aria-label="Increase quantity"
                        >
                            <Plus className="size-4" />
                        </button>
                    </div>
                    <p className="text-base font-bold text-zinc-900">${price.toFixed(2)}</p>
                </div>
            </div>
        </div>
    )
}
