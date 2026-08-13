"use client"

import { LayoutDashboardIcon, TruckIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { OrderTableItem } from "./components/tableRow";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

type CategoryType = {
    categoryName: string
    _id: string
}

const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
]

export default function Login() {

    const [categories, setCategories] = useState<CategoryType[]>([])

    const getCategory = async () => {
        const response = await fetch("http://localhost:8000/category")
        const data = await response.json()
        setCategories(data)
    }

    useEffect(() => {
        getCategory()
    }, [])
    return (
        <main className="w-full max-w-380 h-full flex gap-10 items-start justify-center bg-accent">
            <div className="flex flex-col items-center justify-start p-4 gap-8 bg-white h-[100vh]">
                <div className="flex gap-2">
                    <Image
                        src="/Navigation/Logo.png"
                        alt="Description"
                        width={48}
                        height={48}
                        loading="eager"
                    />
                    <div>
                        <p className="text-lg font-bold">NomNom</p>
                        <label className="text-sm text-gray-500">Swift delivery</label>
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-full px-4">
                    <Button variant={"ghost"} className="flex justify-start px-4 gap-2 w-full rounded-2xl">
                        <LayoutDashboardIcon />
                        Food menu
                    </Button>
                    <Button className="flex justify-start px-4 gap-2 w-full rounded-2xl">
                        <TruckIcon />
                        Orders
                    </Button>
                </div>
            </div>
            <div className="w-full bg-white rounded-md mt-10 mr-20">
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Invoice</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invoices.slice(0, 6).map((invoice) => (
                            <TableRow key={invoice.invoice}>
                                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                                <TableCell>{invoice.paymentStatus}</TableCell>
                                <TableCell>{invoice.paymentMethod}</TableCell>
                                <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell className="text-right">$2,500.00</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </main>
    )
}