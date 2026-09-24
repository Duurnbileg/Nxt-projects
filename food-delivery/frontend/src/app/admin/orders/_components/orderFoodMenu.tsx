"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import { AdminOrderItem } from "./types"

export const OrderFoodMenu = ({
    foods,
    orderId,
}: {
    foods: AdminOrderItem[]
    orderId: string
}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    type="button"
                    className="flex items-center gap-1 text-sm text-zinc-700 outline-none hover:text-zinc-900"
                >
                    <span>{foods.length} foods</span>
                    <ChevronDown className="size-4 text-zinc-400" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="start"
                className="w-64 rounded-xl border border-zinc-200 bg-white p-2 shadow-lg"
            >
                {foods.length ? (
                    foods.map((item, foodIndex) => {
                        const food =
                            typeof item.food === "object" && item.food
                                ? item.food
                                : null

                        return (
                            <div
                                key={`${orderId}-food-${foodIndex}`}
                                className="flex items-center gap-2 rounded-lg px-1 py-1.5"
                            >
                                <Image
                                    src={food?.image || "/food-image.png"}
                                    alt={food?.foodName || "Food"}
                                    width={40}
                                    height={40}
                                    className="size-10 shrink-0 rounded-md object-cover"
                                />
                                <span className="min-w-0 flex-1 truncate text-sm text-zinc-700">
                                    {food?.foodName || "Food item"}
                                </span>
                                <span className="shrink-0 text-sm text-zinc-500">
                                    x {item.quantity || 0}
                                </span>
                            </div>
                        )
                    })
                ) : (
                    <p className="px-2 py-1 text-sm text-zinc-500">No foods</p>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
