"use client"

import { Checkbox } from "@/components/ui/checkbox"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ChevronsUpDown } from "lucide-react"
import { OrderTableRow } from "./orderTableRow"
import { AdminOrder, PAGE_SIZE } from "./types"

type OrdersTableProps = {
    loading: boolean
    orders: AdminOrder[]
    selectedIds: string[]
    currentPage: number
    allPageSelected: boolean
    deleting: boolean
    onToggleSort: () => void
    onToggleSelectAll: (checked: boolean) => void
    onToggleSelect: (orderId: string, checked: boolean) => void
    onStatusChange: (orderId: string, status: string) => void
    onDeleteOrder: (orderId: string) => void
}

export const OrdersTable = ({
    loading,
    orders,
    selectedIds,
    currentPage,
    allPageSelected,
    onToggleSort,
    onToggleSelectAll,
    onToggleSelect,
    onStatusChange,
    onDeleteOrder,
}: OrdersTableProps) => {
    return (
        <div className="overflow-x-auto rounded-xl border border-zinc-100">
            <Table>
                <TableHeader>
                    <TableRow className="border-zinc-100 hover:bg-transparent">
                        <TableHead className="w-12">
                            <Checkbox
                                checked={allPageSelected}
                                onCheckedChange={(checked) =>
                                    onToggleSelectAll(checked === true)
                                }
                            />
                        </TableHead>
                        <TableHead>№</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Food</TableHead>
                        <TableHead>
                            <button
                                type="button"
                                className="inline-flex items-center gap-1"
                                onClick={onToggleSort}
                            >
                                Date
                                <ChevronsUpDown className="size-3.5 text-zinc-400" />
                            </button>
                        </TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Delivery Address</TableHead>
                        <TableHead>
                            <span className="inline-flex items-center gap-1">
                                Delivery state
                                <ChevronsUpDown className="size-3.5 text-zinc-400" />
                            </span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell
                                colSpan={8}
                                className="h-24 text-center text-sm text-zinc-500"
                            >
                                Loading orders...
                            </TableCell>
                        </TableRow>
                    ) : orders.length ? (
                        orders.map((order, index) => (
                            <OrderTableRow
                                key={order._id}
                                order={order}
                                index={(currentPage - 1) * PAGE_SIZE + index + 1}
                                selected={selectedIds.includes(order._id)}
                                onSelect={(checked) => onToggleSelect(order._id, checked)}
                                onStatusChange={(status) =>
                                    onStatusChange(order._id, status)
                                }
                                onDeleteOrder={() => onDeleteOrder(order._id)}
                            />
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={8}
                                className="h-24 text-center text-sm text-zinc-500"
                            >
                                No orders found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
