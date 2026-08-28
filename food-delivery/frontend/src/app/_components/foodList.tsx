import { Button } from "@/components/ui/button"
import { FoodCard } from "./foodCard"
import { ChevronRight } from "lucide-react"

const food = [1, 2, 3, 4]

export const FoodList = ({ listName }: { listName: number }) => {
    return (
        <main className="w-full my-20">
            <div className="flex w-full justify-between">
                <p className="text-3xl text-white mb-6 font-semibold">
                    {listName}
                </p>
                <Button variant="link" className="text-lg text-white">
                    See more
                    <ChevronRight />
                </Button>
            </div>
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {food.map((item, index) => (
                    <FoodCard key={index} />
                ))}
            </div>
        </main>
    )
}