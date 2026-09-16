"use client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { CartFoodCard } from "./cartFoodCard"
import { CartOrder } from "./cartOrder"

const cartItems = [
    {
        name: "Sunshine Stackers",
        description: "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
        price: 12.99,
    },
    {
        name: "Sunshine Stackers",
        description: "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
        price: 12.99,
    },
]

export const CartTabs = () => {
    const itemsTotal = 25.98
    const shipping = 0.99
    const total = itemsTotal + shipping

    return (
        <Tabs defaultValue="cart" className="w-full gap-6">
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
                <section className="rounded-2xl bg-white p-4">
                    <h3 className="mb-2 text-xl font-semibold text-zinc-900">My cart</h3>
                    <div className="divide-y divide-dashed divide-zinc-200">
                        {cartItems.map((item, index) => (
                            <CartFoodCard
                                key={`${item.name}-${index}`}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                            />
                        ))}
                    </div>
                    <div className="flex flex-col gap-2 rounded-2xl p-4 w-full">
                        <h3 className="text-base font-semibold text-zinc-900">Delivery location</h3>
                        <Textarea
                            placeholder="Please share your complete address"
                            className="w-full min-h-20 resize-none rounded-md border-zinc-200 bg-white text-sm text-zinc-900 shadow-none placeholder:text-zinc-400"
                        />
                    </div>
                </section>
                <section className="flex flex-col gap-4 rounded-2xl bg-white p-4">
                    <h3 className="text-xl font-semibold text-zinc-900">Payment info</h3>
                    <div className="flex flex-col gap-2 text-base text-zinc-500">
                        <div className="flex items-center justify-between">
                            <span>Items</span>
                            <span>${itemsTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>Shipping</span>
                            <span>${shipping.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="border-t border-dashed border-zinc-200" />
                    <div className="flex items-center justify-between text-lg font-medium text-zinc-900">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <Button className="h-11 w-full rounded-full bg-red-500 text-base font-medium text-white hover:bg-red-600">
                        Checkout
                    </Button>
                </section>
            </TabsContent>
            <TabsContent value="order">
                <CartOrder />
            </TabsContent>
        </Tabs>
    )
}
