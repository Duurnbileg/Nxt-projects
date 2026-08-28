import { FoodList } from "./_components/foodList";
import { Header } from "./feature/header";
import { Hero } from "./_components/hero";
import { Footer } from "./feature/footer";

const list = [1, 2, 3, 4]

const texts = [
    "Fresh fast delivered",
    "Fresh fast delivered",
    "Fresh fast delivered",
    "Fresh fast delivered",
    "Fresh fast delivered",
];


export default function Home() {
    return (
        <main className="w-full max-w-380 flex flex-col bg-zinc-800">
            <Header />
            <Hero />
            <section className="w-full px-20">
                {list.map((item) => (
                    <FoodList listName={item} />
                ))}
            </section>
            <Footer texts={texts}/>
        </main>
    )
}