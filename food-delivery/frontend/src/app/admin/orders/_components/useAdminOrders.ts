"use client"

import { useEffect, useMemo, useState } from "react"
import { API_URL } from "@/lib/api"
import { toast } from "sonner"
import { AdminOrder, PAGE_SIZE } from "./types"

export const useAdminOrders = () => {
    const [orders, setOrders] = useState<AdminOrder[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedIds, setSelectedIds] = useState<string[]>([])
    const [page, setPage] = useState(1)
    const [dateFrom, setDateFrom] = useState("")
    const [dateTo, setDateTo] = useState("")
    const [updating, setUpdating] = useState(false)
    const [sortDir, setSortDir] = useState<"asc" | "desc">("desc")
    const [deleting, setDeleting] = useState(false)

    useEffect(() => {
        const loadOrders = async () => {
            setLoading(true)
            try {
                const res = await fetch(`${API_URL}/order`)
                const data = await res.json()
                if (!res.ok) throw new Error(data.message || "Failed to load orders")
                setOrders(Array.isArray(data) ? data : [])
            } catch (error) {
                toast.error(
                    error instanceof Error ? error.message : "Failed to load orders",
                )
                setOrders([])
            } finally {
                setLoading(false)
            }
        }

        loadOrders()
    }, [])

    useEffect(() => {
        setPage(1)
        setSelectedIds([])
    }, [dateFrom, dateTo])

    const filteredOrders = useMemo(() => {
        const fromTime = dateFrom ? new Date(dateFrom).setHours(0, 0, 0, 0) : null
        const toTime = dateTo ? new Date(dateTo).setHours(23, 59, 59, 999) : null

        return [...orders]
            .filter((order) => {
                const created = order.createdAt
                    ? new Date(order.createdAt).getTime()
                    : null
                if (created == null) return !fromTime && !toTime
                if (fromTime != null && created < fromTime) return false
                if (toTime != null && created > toTime) return false
                return true
            })
            .sort((a, b) => {
                const aTime = new Date(a.createdAt || 0).getTime()
                const bTime = new Date(b.createdAt || 0).getTime()
                return sortDir === "asc" ? aTime - bTime : bTime - aTime
            })
    }, [orders, dateFrom, dateTo, sortDir])

    const totalPages = Math.max(1, Math.ceil(filteredOrders.length / PAGE_SIZE))
    const currentPage = Math.min(page, totalPages)
    const pageOrders = filteredOrders.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE,
    )

    const allPageSelected =
        pageOrders.length > 0 &&
        pageOrders.every((order) => selectedIds.includes(order._id))

    const toggleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedIds([
                ...new Set([...selectedIds, ...pageOrders.map((order) => order._id)]),
            ])
            return
        }
        const pageIds = new Set(pageOrders.map((order) => order._id))
        setSelectedIds(selectedIds.filter((id) => !pageIds.has(id)))
    }

    const toggleSelect = (orderId: string, checked: boolean) => {
        setSelectedIds((prev) =>
            checked ? [...prev, orderId] : prev.filter((id) => id !== orderId),
        )
    }

    const updateStatus = async (orderId: string, status: string) => {
        const res = await fetch(`${API_URL}/order`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: orderId, status }),
        })
        const data = await res.json().catch(() => ({}))
        if (!res.ok) throw new Error(data.message || "Failed to update status")
        return data.order as AdminOrder
    }

    const handleStatusChange = async (orderId: string, status: string) => {
        try {
            const updated = await updateStatus(orderId, status)
            setOrders((prev) =>
                prev.map((order) =>
                    order._id === orderId ? { ...order, ...updated, status } : order,
                ),
            )
            toast.success("Delivery state updated")
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Failed to update status",
            )
        }
    }

    const deleteOrder = async (orderId: string) => {
        const res = await fetch(`${API_URL}/order`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: orderId }),
        })
        const data = await res.json().catch(() => ({}))
        if (!res.ok) throw new Error(data.message || "Failed to delete order")
    }

    const handleDeleteOrder = async (orderId: string) => {
        try {
            await deleteOrder(orderId)
            setOrders((prev) => prev.filter((order) => order._id !== orderId))
            toast.success("Order deleted")
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to delete order")
        }

        finally {
            setDeleting(false)
        }
    }

    const handleBulkStatusChange = async (status: string) => {
        if (!selectedIds.length || !status) return

        setUpdating(true)
        try {
            await Promise.all(selectedIds.map((id) => updateStatus(id, status)))
            setOrders((prev) =>
                prev.map((order) =>
                    selectedIds.includes(order._id) ? { ...order, status } : order,
                ),
            )
            setSelectedIds([])
            toast.success("Delivery state updated")
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Failed to update status",
            )
            throw error
        } finally {
            setUpdating(false)
        }
    }

    const toggleSort = () => {
        setSortDir((prev) => (prev === "asc" ? "desc" : "asc"))
    }

    return {
        loading,
        filteredOrders,
        pageOrders,
        selectedIds,
        currentPage,
        totalPages,
        dateFrom,
        dateTo,
        updating,
        deleting,
        allPageSelected,
        setDateFrom,
        setDateTo,
        setPage,
        toggleSort,
        toggleSelectAll,
        toggleSelect,
        handleStatusChange,
        handleBulkStatusChange,
        handleDeleteOrder,
    }
}
