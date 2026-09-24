"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { TableCell, TableRow } from "@/components/ui/table"
import { OrderStatus } from "./orderStatus"
import { AdminOrder, formatOrderDate } from "./types"
import { OrderFoodMenu } from "./orderFoodMenu"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export const OrderTableRow = ({
    order,
    index,
    selected,
    onSelect,
    onStatusChange,
    onDeleteOrder,
}: {
    order: AdminOrder
    index: number
    selected: boolean
    onSelect: (checked: boolean) => void
    onStatusChange: (status: string) => void
    onDeleteOrder: () => void
}) => {
    const foods = order.foodOrderItems || []
    const customerEmail =
        typeof order.user === "object" && order.user?.email
            ? order.user.email
            : "-"
    const address =
        order.address ||
        (typeof order.user === "object" ? order.user?.address : "") ||
        "-"

    return (
        <TableRow className="border-zinc-100 hover:bg-zinc-50/60">
            <TableCell className="w-12">
                <Checkbox
                    checked={selected}
                    onCheckedChange={(checked) => onSelect(checked === true)}
                />
            </TableCell>
            <TableCell className="text-sm text-zinc-700">{index}</TableCell>
            <TableCell className="max-w-[180px] truncate text-sm text-zinc-700">
                {customerEmail}
            </TableCell>
            <TableCell>
                <OrderFoodMenu foods={foods} orderId={order._id} />
            </TableCell>
            <TableCell className="text-sm text-zinc-700">
                {formatOrderDate(order.createdAt)}
            </TableCell>
            <TableCell className="text-sm font-medium text-zinc-900">
                {order.totalPrice || 0}₮
            </TableCell>
            <TableCell className="max-w-[220px]">
                <p className="line-clamp-2 text-sm leading-5 text-zinc-600">
                    {address}
                </p>
            </TableCell>
            <TableCell>
                <OrderStatus
                    status={order.status || "PENDING"}
                    onChange={onStatusChange}
                />
            </TableCell>
            <TableCell>
                <Button variant="outline" size="icon" onClick={onDeleteOrder}>
                    <X className="size-5 text-red-500" />
                </Button>
            </TableCell>
        </TableRow>
    )
}
