"use client"

import { OrdersHeader } from "./_components/ordersHeader"
import { OrdersTable } from "./_components/ordersTable"
import { OrdersPagination } from "./_components/ordersPagination"
import { useAdminOrders } from "./_components/useAdminOrders"

export default function AdminOrdersPage() {
    const {
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
    } = useAdminOrders()

    return (
        <section className="w-full">
            <div className="mb-4 flex justify-end">
                <div className="flex size-8 items-center justify-center overflow-hidden rounded-full bg-red-400 text-xs font-semibold text-white">
                    A
                </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
                <OrdersHeader
                    count={filteredOrders.length}
                    dateFrom={dateFrom}
                    dateTo={dateTo}
                    selectedCount={selectedIds.length}
                    updating={updating}
                    onDateFromChange={setDateFrom}
                    onDateToChange={setDateTo}
                    onBulkUpdate={handleBulkStatusChange}
                />

                <OrdersTable
                    loading={loading}
                    orders={pageOrders}
                    selectedIds={selectedIds}
                    currentPage={currentPage}
                    allPageSelected={allPageSelected}
                    onToggleSort={toggleSort}
                    onToggleSelectAll={toggleSelectAll}
                    onToggleSelect={toggleSelect}
                    onStatusChange={handleStatusChange}
                    onDeleteOrder={handleDeleteOrder}
                    deleting={deleting}
                />

                <OrdersPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />
            </div>
        </section>
    )
}
