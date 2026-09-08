import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CartFoodCard } from "./cartFoodCard"
import { CartOrder } from "./cartOrder"

export const CartTabs = () => {
    return (
        <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full bg-white">
                <TabsTrigger value="cart" className="data-[state=active]:bg-red-400 data-[state=active]:text-white">Cart</TabsTrigger>
                <TabsTrigger value="orders" className="data-[state=active]:bg-red-400 data-[state=active]:text-white">Orders</TabsTrigger>
            </TabsList>
            <TabsContent value="cart">
                <CartFoodCard />
            </TabsContent>
            <TabsContent value="orders">
                <CartOrder />
            </TabsContent>
        </Tabs>
    )
}