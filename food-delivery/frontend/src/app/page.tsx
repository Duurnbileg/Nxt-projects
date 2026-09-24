"use client"
import { CategoryType, FoodList } from "./_components/foods/foodList";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { Footer } from "./_components/footer";
import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";
import { toast } from "sonner";

const texts = [
    "Fresh fast delivered",
    "Fresh fast delivered",
    "Fresh fast delivered",
    "Fresh fast delivered",
    "Fresh fast delivered",
];

export default function Home() {
    const [categories, setCategories] = useState<CategoryType[]>([]);

    const getCategories = async () => {
        try {
            const res = await fetch(`${API_URL}/category`);
            const data = await res.json();
            setCategories(data.categories);
        } catch {
            toast.error("Failed to load categories");
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    if (!categories.length) return null;

    return (
        <main className="w-full max-w-380 flex flex-col bg-zinc-800">
            <Header />
            <Hero />
            <section className="w-full px-20">
                {categories.map((category) => (
                    <FoodList key={category._id} category={category} />
                ))}
            </section>
            <Footer texts={texts} />
        </main>
    )
}