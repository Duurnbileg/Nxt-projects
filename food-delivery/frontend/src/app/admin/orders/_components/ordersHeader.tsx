"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CalendarDays } from "lucide-react"
import { toast } from "sonner"
import { ChangeDeliveryStateDialog } from "./changeDeliveryStateDialog"

type OrdersHeaderProps = {
    count: number
    dateFrom: string
    dateTo: string
    selectedCount: number
    updating: boolean
    onDateFromChange: (value: string) => void
    onDateToChange: (value: string) => void
    onBulkUpdate: (status: string) => Promise<void> | void
}

export const OrdersHeader = ({
    count,
    dateFrom,
    dateTo,
    selectedCount,
    updating,
    onDateFromChange,
    onDateToChange,
    onBulkUpdate,
}: OrdersHeaderProps) => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        if (!selectedCount) {
            toast.error("Select at least one order")
            return
        }
        setOpen(true)
    }

    const handleSave = async (status: string) => {
        try {
            await onBulkUpdate(status)
            setOpen(false)
        } catch {
            // keep dialog open on failure
        }
    }

    return (
        <>
            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-zinc-900">Orders</h1>
                    <p className="mt-1 text-sm text-zinc-500">{count} items</p>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700">
                        <CalendarDays className="size-4 text-zinc-500" />
                        <input
                            type="date"
                            value={dateFrom}
                            onChange={(e) => onDateFromChange(e.target.value)}
                            className="w-[118px] bg-transparent text-sm outline-none"
                        />
                        <span className="text-zinc-400">-</span>
                        <input
                            type="date"
                            value={dateTo}
                            onChange={(e) => onDateToChange(e.target.value)}
                            className="w-[118px] bg-transparent text-sm outline-none"
                        />
                    </div>

                    <Button
                        type="button"
                        disabled={updating || !selectedCount}
                        onClick={handleOpen}
                        className={`h-10 rounded-full px-4 text-sm text-white ${
                            selectedCount
                                ? "bg-zinc-900 hover:bg-zinc-800"
                                : "bg-zinc-200 hover:bg-zinc-200"
                        }`}
                    >
                        Change delivery state
                    </Button>
                </div>
            </div>

            <ChangeDeliveryStateDialog
                open={open}
                onOpenChange={setOpen}
                updating={updating}
                onSave={handleSave}
            />
        </>
    )
}
