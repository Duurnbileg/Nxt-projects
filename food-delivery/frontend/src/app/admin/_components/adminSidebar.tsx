"use client"
import { Button } from "@/components/ui/button"
import {
    LayoutDashboardIcon,
    TruckIcon,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const AdminSidebar = () => {
    const pathname = usePathname()
    const isFoodMenu = pathname === "/admin"
    const isOrders = pathname === "/admin/orders"

    return (
        <div className="flex flex-col items-center justify-start p-4 gap-8 bg-white h-screen w-64 shrink-0">
            <div className="flex gap-2">
                <Image
                    src="/Logo.png"
                    alt="NomNom logo"
                    width={48}
                    height={48}
                    loading="eager"
                />
                <div>
                    <p className="text-lg font-bold">NomNom</p>
                    <label className="text-sm text-gray-500">
                        Swift delivery
                    </label>
                </div>
            </div>
            <div className="flex flex-col gap-2 w-full px-4">
                <Link href="/admin">
                    <Button
                        variant="ghost"
                        className={`flex justify-start px-4 gap-2 w-full rounded-2xl ${isFoodMenu
                                ? "bg-black text-white hover:bg-black hover:text-white"
                                : ""
                            }`}
                    >
                        <LayoutDashboardIcon />
                        Food menu
                    </Button>
                </Link>
                <Link href="/admin/orders">
                    <Button
                        variant="ghost"
                        className={`flex justify-start px-4 gap-2 w-full rounded-2xl ${isOrders
                                ? "bg-black text-white hover:bg-black hover:text-white"
                                : ""
                            }`}
                    >
                        <TruckIcon />
                        Orders
                    </Button>
                </Link>
            </div>
        </div>
    )
}