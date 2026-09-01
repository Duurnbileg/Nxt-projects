import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CartFoodCart } from "./cartFoodCard"
import { CartOrder } from "./cartOrder"

export const CartTabs = () => {
    return (
        <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full">
                <TabsTrigger value="cart">Cart</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
            </TabsList>
            <TabsContent value="cart">
                <CartFoodCart />
            </TabsContent>
            <TabsContent value="orders">
                <CartOrder />
            </TabsContent>
        </Tabs>
    )
}