"use client"

import { useEffect, useState } from "react"
import { API_URL } from "@/lib/api"
import { UserType } from "../header"
import { Clock, Map, Soup } from "lucide-react"
import Image from "next/image"

type OrderFood = {
    _id?: string
    foodName?: string
    price?: number
    image?: string
    ingredients?: string
}

type OrderItem = {
    food?: OrderFood | string
    quantity?: number
}

type OrderType = {
    _id: string
    user?: { _id?: string; address?: string } | string
    totalPrice?: number
    status?: string
    address?: string
    createdAt?: string
    foodOrderItems?: OrderItem[]
}

const statusLabel: Record<string, string> = {
    PENDING: "Pending",
    CANCELED: "Canceled",
    DELIVERED: "Delivered",
}

const statusClass: Record<string, string> = {
    PENDING: "border border-red-500 bg-white text-red-500",
    CANCELED: "border border-transparent bg-zinc-100 text-zinc-600",
    DELIVERED: "border border-transparent bg-zinc-100 text-zinc-900",
}

const formatDate = (value?: string) => {
    if (!value) return ""
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return ""
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}/${month}/${day}`
}

export const CartOrder = ({
    user,
    refreshKey = 0,
}: {
    user: UserType | null
    refreshKey?: number
}) => {
    const [orders, setOrders] = useState<OrderType[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadOrders = async () => {
            const userId = user?._id
            if (!userId) {
                setOrders([])
                setLoading(false)
                return
            }

            setLoading(true)
            try {
                const res = await fetch(`${API_URL}/order`)
                const data = await res.json()
                if (!res.ok) throw new Error()

                const list = Array.isArray(data) ? data : []
                const mine = list
                    .filter((order: OrderType) => {
                        const orderUserId =
                            typeof order.user === "string"
                                ? order.user
                                : order.user?._id
                        return orderUserId === userId
                    })
                    .sort(
                        (a: OrderType, b: OrderType) =>
                            new Date(b.createdAt || 0).getTime() -
                            new Date(a.createdAt || 0).getTime(),
                    )

                setOrders(mine)
            } catch {
                setOrders([])
            } finally {
                setLoading(false)
            }
        }

        loadOrders()
    }, [user?._id, refreshKey])

    if (!user?._id) {
        return (
            <section className="rounded-2xl bg-white p-4">
                <h3 className="text-xl font-semibold text-zinc-900">Order history</h3>
                <p className="mt-4 text-sm text-zinc-500">Login to see your orders.</p>
            </section>
        )
    }

    if (loading) {
        return (
            <section className="rounded-2xl bg-white p-4">
                <h3 className="text-xl font-semibold text-zinc-900">Order history</h3>
                <p className="mt-4 text-sm text-zinc-500">Loading orders...</p>
            </section>
        )
    }

    if (!orders.length) {
        return (
            <section className="rounded-2xl bg-white p-4">
                <h3 className="text-xl font-semibold text-zinc-900">Order history</h3>
                <div className="flex flex-col items-center justify-center gap-2 p-4">
                    <Image
                        src="/Logo.png"
                        alt="Empty order"
                        width={100}
                        height={100}
                        className="size-15 shrink-0 rounded-xl object-cover"
                    />
                    <p className="text-base font-semibold">
                        No orders yet?
                    </p>
                    <p className="text-sm text-zinc-500 text-center">
                        🍕 "You haven't placed any orders yet. Start exploring our menu and satisfy your cravings!"
                    </p>
                </div>
            </section>
        )
    }

    return (
        <section className="rounded-2xl bg-white p-4">
            <h3 className="text-xl font-semibold text-zinc-900">Order history</h3>

            <div className="mt-4 divide-y divide-dashed divide-zinc-200">
                {orders.map((order) => {
                    const status = order.status || "PENDING"
                    const orderAddress =
                        order.address ||
                        (typeof order.user === "object" ? order.user?.address : "") ||
                        user.address ||
                        ""

                    return (
                        <article key={order._id} className="flex flex-col gap-3 py-5 first:pt-0 last:pb-0">
                            <div className="flex items-center justify-between gap-3">
                                <p className="text-base font-bold text-zinc-900">
                                    {order.totalPrice || 0}₮
                                    <span className="ml-1">
                                        (#{order._id.slice(-5)})
                                    </span>
                                </p>
                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-medium ${statusClass[status] || statusClass.PENDING}`}
                                >
                                    {statusLabel[status] || status}
                                </span>
                            </div>

                            <div className="flex flex-col gap-2">
                                {(order.foodOrderItems || []).map((item, index) => {
                                    const food =
                                        typeof item.food === "object" && item.food
                                            ? item.food
                                            : null

                                    return (
                                        <div
                                            key={`${order._id}-${index}`}
                                            className="flex items-center gap-2 text-sm text-zinc-500"
                                        >
                                            <Soup className="size-4 shrink-0" strokeWidth={1.75} />
                                            <span className="min-w-0 flex-1 truncate">
                                                {food?.foodName || "Food item"}
                                            </span>
                                            <span className="shrink-0">x {item.quantity || 0}</span>
                                        </div>
                                    )
                                })}

                                {order.createdAt && (
                                    <div className="flex items-center gap-2 text-sm text-zinc-500">
                                        <Clock className="size-4 shrink-0" strokeWidth={1.75} />
                                        <span>{formatDate(order.createdAt)}</span>
                                    </div>
                                )}

                                {orderAddress && (
                                    <div className="flex items-center gap-2 text-sm text-zinc-500">
                                        <Map className="size-4 shrink-0" strokeWidth={1.75} />
                                        <span className="truncate">{orderAddress}</span>
                                    </div>
                                )}
                            </div>
                        </article>
                    )
                })}
            </div>
        </section>
    )
}
