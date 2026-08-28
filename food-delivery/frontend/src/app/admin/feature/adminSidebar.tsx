"use client"
import { Button } from "@/components/ui/button"
import { LayoutDashboardIcon, TruckIcon } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export const AdminSidebar = () => {

    const [page, setPage] = useState<any>(1)

    const handleStepUp = () => {
        setPage(page + 1)
    }

    return (
        <div className="flex flex-col items-center justify-start p-4 gap-8 bg-white h-screen">
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
        </div>)
}