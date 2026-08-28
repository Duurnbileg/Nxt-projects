"use client"

import { useEffect, useState } from "react"

type CategoryType = {
    categoryName: String,
    _id: string
}


export const AdminFoodMenu = () => {

    const [categories, setCategories] = useState<CategoryType>()

    const getCategory = async () => {
        const response = await fetch("http://localhost:8000/category")
        const data = await response.json()
        console.log(data);

        setCategories(data)
    }

    useEffect(() => {
        getCategory()
    }, [])
    return (
        <main>

        </main>
    )
}