"use client"

import { useState } from "react"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

const STATUS_OPTIONS = [
    { value: "DELIVERED", label: "Delivered" },
    { value: "PENDING", label: "Pending" },
    { value: "CANCELED", label: "Cancelled" },
] as const

type ChangeDeliveryStateDialogProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    updating?: boolean
    onSave: (status: string) => void
}

export const ChangeDeliveryStateDialog = ({
    open,
    onOpenChange,
    updating,
    onSave,
}: ChangeDeliveryStateDialogProps) => {
    const [selectedStatus, setSelectedStatus] = useState("DELIVERED")

    return (
        <Dialog
            open={open}
            onOpenChange={(next) => {
                if (next) setSelectedStatus("DELIVERED")
                onOpenChange(next)
            }}
        >
            <DialogContent
                showCloseButton={false}
                className="gap-6 rounded-2xl border-none p-6 sm:max-w-md"
            >
                <DialogHeader className="flex-row items-center justify-between space-y-0">
                    <DialogTitle className="text-lg font-semibold text-zinc-900">
                        Change delivery state
                    </DialogTitle>
                    <DialogClose asChild>
                        <button
                            type="button"
                            className="flex size-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                            aria-label="Close"
                        >
                            <X className="size-4" />
                        </button>
                    </DialogClose>
                </DialogHeader>

                <div className="flex justify-between gap-2">
                    {STATUS_OPTIONS.map((option) => {
                        const active = selectedStatus === option.value
                        return (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => setSelectedStatus(option.value)}
                                className={`rounded-full px-4 py-2 text-sm font-medium transition w-full ${
                                    active
                                        ? "border border-red-300 bg-red-50 text-red-500"
                                        : "border border-transparent bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
                                }`}
                            >
                                {option.label}
                            </button>
                        )
                    })}
                </div>

                <Button
                    type="button"
                    disabled={updating}
                    onClick={() => onSave(selectedStatus)}
                    className="h-11 w-full rounded-full bg-zinc-900 text-base font-medium text-white hover:bg-zinc-800"
                >
                    {updating ? "Saving..." : "Save"}
                </Button>
            </DialogContent>
        </Dialog>
    )
}
