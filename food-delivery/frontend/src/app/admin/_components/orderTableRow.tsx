"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow, } from "@/components/ui/table";
import { ChevronDown, ChevronUp, } from "lucide-react";
import { useState } from "react";
import { OrderFoodRow } from "./orderFoodRow";
import { OrderStatus } from "./orderStatus";

export const OrderTableRow = ({ order }: { order: any }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <TableRow>
                <TableCell>
                    <Checkbox />
                </TableCell>
                <TableCell>
                    {order.id}
                </TableCell>
                <TableCell>
                    {order.customer}
                </TableCell>
                <TableCell>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex w-full items-center justify-between"
                    >
                        <span>
                            {order.foods.length} foods
                        </span>

                        {isOpen ? (
                            <ChevronUp size={16} />
                        ) : (
                            <ChevronDown size={16} />
                        )}
                    </button>
                </TableCell>
                <TableCell>
                    {order.date}
                </TableCell>
                <TableCell>
                    ${order.total}
                </TableCell>
                <TableCell className="max-w-[250px] truncate">
                    {order.address}
                </TableCell>
                <TableCell>
                    <OrderStatus status={order.status} />
                </TableCell>
            </TableRow>
            {isOpen &&
                order.foods.map((food: any, index: number) => (
                    <OrderFoodRow
                        key={`${order.id}-${index}`}
                        food={food}
                    />
                ))}
        </>
    );
};