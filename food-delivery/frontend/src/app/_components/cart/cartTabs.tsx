"use client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { CartFoodCard } from "./cartFoodCard"
import { CartOrder } from "./cartOrder"
import { useEffect, useState } from "react"
import { API_URL } from "@/lib/api"
import { toast } from "sonner"
import { UserType } from "../header"
import Image from "next/image"

export type CartItem = {
    foodId: string
    foodName: string
    price: number
    imageSrc: string
    ingredients: string
    quantity: number
}

const shipping = 1000

export const CartTabs = ({ user }: { user: UserType | null }) => {
    const [items, setItems] = useState<CartItem[]>([])
    const [address, setAddress] = useState("")
    const [loading, setLoading] = useState(false)
    const [tab, setTab] = useState("cart")
    const [ordersKey, setOrdersKey] = useState(0)

    const loadCart = () => {
        const raw = JSON.parse(localStorage.getItem("cart") || "[]") as Array<
            CartItem & { image?: string }
        >
        setItems(
            raw.map((item) => ({
                ...item,
                imageSrc: item.imageSrc || item.image || "",
            })),
        )
    }

    useEffect(() => {
        loadCart()
        window.addEventListener("cart-updated", loadCart)
        return () => window.removeEventListener("cart-updated", loadCart)
    }, [])

    useEffect(() => {
        if (user?.address) {
            setAddress(user.address)
        }
    }, [user?.address])

    const itemsTotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    )

    const total = items.length ? itemsTotal + shipping : 0
    const deliveryAddress = address.trim() || user?.address?.trim() || ""

    const saveCart = (next: CartItem[]) => {
        localStorage.setItem("cart", JSON.stringify(next))
        localStorage.setItem("cart-count", JSON.stringify(next.length))
        window.dispatchEvent(new Event("cart-updated"))
    }

    const setQuantity = (foodId: string, quantity: number) => {
        let next = [...items]
        if (quantity <= 0) {
            next = next.filter((item) => item.foodId !== foodId)
        } else {
            next = next.map((item) =>
                item.foodId === foodId ? { ...item, quantity } : item,
            )
        }
        setItems(next)
        saveCart(next)
    }

    const removeItem = (foodId: string, name: string) => {
        const next = items.filter((item) => item.foodId !== foodId)
        setItems(next)
        saveCart(next)
        toast.success(`${name} removed from cart`)
    }

    const checkout = async () => {
        if (!items.length) {
            toast.error("Your cart is empty")
            return
        }
        if (!deliveryAddress) {
            toast.error("Please enter your delivery address")
            return
        }

        const storedUser = localStorage.getItem("user")
        const currentUser = storedUser ? JSON.parse(storedUser) : null
        if (!currentUser?._id) {
            toast.error("Энэ үйлчилгээг ашиглахын тулд нэвтэрнэ үү")
            return
        }

        setLoading(true)
        try {
            const res = await fetch(`${API_URL}/order`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user: currentUser._id,
                    totalPrice: total,
                    foodOrderItems: items.map((item) => ({
                        food: item.foodId,
                        quantity: item.quantity,
                    })),
                    address: deliveryAddress,
                    status: "PENDING",
                }),
            })

            const data = await res.json().catch(() => ({}))
            if (!res.ok) {
                throw new Error(data.message || "Could not place order")
            }

            setItems([])
            saveCart([])
            setOrdersKey((key) => key + 1)
            setTab("order")
            toast.success("Order placed successfully")
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Could not place order. Try again.",
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <Tabs value={tab} onValueChange={setTab} className="w-full gap-6">
            <TabsList className="h-12 w-full rounded-full bg-white p-1">
                <TabsTrigger
                    value="cart"
                    className="h-full flex-1 rounded-full text-sm font-medium data-active:bg-red-500 data-active:text-white data-active:shadow-none"
                >
                    Cart
                </TabsTrigger>
                <TabsTrigger
                    value="order"
                    className="h-full flex-1 rounded-full text-sm font-medium data-active:bg-red-500 data-active:text-white data-active:shadow-none"
                >
                    Order
                </TabsTrigger>
            </TabsList>
            <TabsContent value="cart" className="flex flex-col gap-6">
                <section className="h-full flex flex-col justify-between gap-8 rounded-2xl bg-white p-4">
                    <div className="flex flex-col gap-2">
                        {items.length > 0 ? (
                            <div className="divide-y divide-dashed divide-zinc-200">
                                {items.map((item, index) => (
                                    <CartFoodCard
                                        key={`${item.foodId}-${index}`}
                                        foodName={item.foodName}
                                        description={item.ingredients}
                                        price={item.price}
                                        imageSrc={item.imageSrc}
                                        quantity={item.quantity}
                                        onRemove={() => removeItem(item.foodId, item.foodName)}
                                        onClickMinus={() =>
                                            setQuantity(item.foodId, item.quantity - 1)
                                        }
                                        onClickPlus={() =>
                                            setQuantity(item.foodId, item.quantity + 1)
                                        }
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center gap-2">
                                <Image
                                    src="/Logo.png"
                                    alt="Empty cart"
                                    width={100}
                                    height={100}
                                    className="size-15 shrink-0 rounded-xl object-cover"
                                />
                                <p className="text-base font-semibold">
                                    Your cart is empty
                                </p>
                                <p className="text-sm text-zinc-500 text-center">
                                    Hungry? 🍔 Add some delicious dishes to your cart and satisfy your cravings!
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-sm">Delivery location</p>
                        {user?.address ? (
                            <p className="text-base font-semibold">{user.address}</p>
                        ) : (
                            <Textarea
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Please share your complete address"
                                className="w-full min-h-20 resize-none rounded-md border-zinc-200 bg-white text-sm text-zinc-900 shadow-none placeholder:text-zinc-400"
                            />
                        )}
                    </div>
                </section>
                <section className="flex flex-col gap-4 rounded-2xl bg-white p-4">
                    <h3 className="text-xl font-semibold text-zinc-900">Payment info</h3>
                    <div className="flex flex-col gap-2 text-base text-zinc-500">
                        <div className="flex items-center justify-between">
                            <span>Items</span>
                            <span>{itemsTotal}₮</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>Shipping</span>
                            <span>{items.length ? shipping : 0}₮</span>
                        </div>
                    </div>
                    <div className="border-t border-dashed border-zinc-200" />
                    <div className="flex items-center justify-between text-lg font-medium text-zinc-900">
                        <span>Total</span>
                        <span>{total}₮</span>
                    </div>
                    <Button
                        type="button"
                        disabled={loading || !items.length}
                        onClick={checkout}
                        className="h-11 w-full rounded-full bg-red-500 text-base font-medium text-white hover:bg-red-600"
                    >
                        {loading ? "Placing order..." : "Checkout"}
                    </Button>
                </section>
            </TabsContent>
            <TabsContent value="order">
                <CartOrder user={user} refreshKey={ordersKey} />
            </TabsContent>
        </Tabs >
    )
}
