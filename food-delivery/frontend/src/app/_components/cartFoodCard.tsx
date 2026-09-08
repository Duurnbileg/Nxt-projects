import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"

import Image from "next/image"

export const CartFoodCard = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Cart Food Card</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex w-full flex-col overflow-hidden rounded-2xl bg-white p-4">
                    <div className="relative w-full">
                        <Image
                            src="/food-image.png"
                            alt="Description"
                            width={360}
                            height={210}
                            loading="eager"
                            className="object-fill w-full"
                        />
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <div className="w-full flex flex-col gap-2 p-4">
                    <div className="flex justify-between">
                        <p className="text-2xl font-semibold text-red-400">Finger Food</p>
                        <p className="text-lg font-semibold">12.99$</p>
                    </div>
                    <p className="text-sm">Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.</p>
                </div>
            </CardFooter>
        </Card>
    )
}