"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";

export const OrderStatus = ({ status, }: { status: string; }) => {
    const statusStyle = {
        Pending: "border-red-300",
        Delivered: "border-green-300",
        Cancelled: "border-gray-300",
    };

    return (
        <Select defaultValue={status}>
            <SelectTrigger
                className={`h-8w-[110px]rounded-fulltext-xs${statusStyle[status as keyof typeof statusStyle]}`}
            >
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Pending">
                    Pending
                </SelectItem>
                <SelectItem value="Delivered">
                    Delivered
                </SelectItem>
                <SelectItem value="Cancelled">
                    Cancelled
                </SelectItem>
            </SelectContent>
        </Select>
    );
};