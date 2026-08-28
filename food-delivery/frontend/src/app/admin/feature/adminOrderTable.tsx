"use client";
import { Table, TableBody, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { OrderTableRow } from "../_components/orderTableRow";

export const AdminOrderTable = () => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-12.5">
                        <Checkbox />
                    </TableHead>
                    <TableHead>№</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Food</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Delivery Address</TableHead>
                    <TableHead>Delivery state</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {/* {orders.map((order) => (
                    <OrderTableRow
                        key={order.id}
                        order={order}
                    />
                ))} */}
            </TableBody>
        </Table>
    );
};