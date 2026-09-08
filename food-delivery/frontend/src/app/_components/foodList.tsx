import { FoodCard } from "./foodCard"

const food = [1, 2, 3, 4]

export const FoodList = ({ listName }: { listName: number }) => {
    return (
        <main className="w-full my-20">
            <div className="flex w-full justify-between">
                <p className="text-3xl text-white mb-6 font-semibold">
                    {listName}
                </p>
            </div>
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {food.map((item, index) => (
                    <FoodCard key={index} />
                ))}
            </div>
        </main>
    )
}