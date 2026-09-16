"use client";
import { Table, TableBody, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

export default function AdminOrderTable() {
    return (
        <section className="w-full max-w-380">
            <div className="flex mb-4">
                <div className="w-8 h-8 bg-red-400 rounded-full"></div>
            </div>
            <Table className="bg-white">
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
        </section>
    );
};