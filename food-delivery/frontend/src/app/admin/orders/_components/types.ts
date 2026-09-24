export type AdminOrderFood = {
    _id?: string
    foodName?: string
    price?: number
    image?: string
}

export type AdminOrderItem = {
    food?: AdminOrderFood | string
    quantity?: number
}

export type AdminOrder = {
    _id: string
    user?: {
        _id?: string
        email?: string
        address?: string
    } | string
    totalPrice?: number
    status?: string
    address?: string
    createdAt?: string
    foodOrderItems?: AdminOrderItem[]
}

export const PAGE_SIZE = 10

export const formatOrderDate = (value?: string) => {
    if (!value) return "-"
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return "-"
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}/${month}/${day}`
}

export const getPageNumbers = (currentPage: number, totalPages: number) => {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const pages: Array<number | "..."> = [1]
    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)

    if (start > 2) pages.push("...")
    for (let i = start; i <= end; i += 1) pages.push(i)
    if (end < totalPages - 1) pages.push("...")
    pages.push(totalPages)
    return pages
}
