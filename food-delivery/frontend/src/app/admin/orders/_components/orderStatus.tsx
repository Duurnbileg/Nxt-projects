"use client"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const STATUS_OPTIONS = [
    { value: "PENDING", label: "Pending" },
    { value: "DELIVERED", label: "Delivered" },
    { value: "CANCELED", label: "Cancelled" },
] as const

const statusStyle: Record<string, string> = {
    PENDING: "border-red-300 bg-red-50 text-red-500 hover:bg-red-50",
    DELIVERED: "border-green-300 bg-green-50 text-green-700 hover:bg-green-50",
    CANCELED: "border-zinc-300 bg-zinc-100 text-zinc-700 hover:bg-zinc-100",
}

export const OrderStatus = ({
    status,
    onChange,
    disabled,
}: {
    status: string
    onChange?: (status: string) => void
    disabled?: boolean
}) => {
    const value = STATUS_OPTIONS.some((option) => option.value === status)
        ? status
        : "PENDING"

    return (
        <Select value={value} onValueChange={onChange} disabled={disabled}>
            <SelectTrigger
                className={`h-8 w-[130px] rounded-full border px-3 text-xs font-medium shadow-none focus-visible:ring-0 ${statusStyle[value] || statusStyle.PENDING}`}
            >
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
