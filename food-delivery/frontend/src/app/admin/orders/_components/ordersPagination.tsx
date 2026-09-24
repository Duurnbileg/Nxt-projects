"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { getPageNumbers } from "./types"

type OrdersPaginationProps = {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export const OrdersPagination = ({
    currentPage,
    totalPages,
    onPageChange,
}: OrdersPaginationProps) => {
    const pageNumbers = getPageNumbers(currentPage, totalPages)

    return (
        <div className="mt-6 flex items-center justify-end gap-1">
            <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                className="flex size-8 items-center justify-center rounded-full text-zinc-500 disabled:opacity-40"
                aria-label="Previous page"
            >
                <ChevronLeft className="size-4" />
            </button>

            {pageNumbers.map((item, index) =>
                item === "..." ? (
                    <span
                        key={`ellipsis-${index}`}
                        className="flex size-8 items-center justify-center text-sm text-zinc-500"
                    >
                        ...
                    </span>
                ) : (
                    <button
                        key={item}
                        type="button"
                        onClick={() => onPageChange(item)}
                        className={`flex size-8 items-center justify-center rounded-full text-sm ${
                            item === currentPage
                                ? "bg-zinc-800 text-white"
                                : "text-zinc-700 hover:bg-zinc-100"
                        }`}
                    >
                        {item}
                    </button>
                ),
            )}

            <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                className="flex size-8 items-center justify-center rounded-full text-zinc-500 disabled:opacity-40"
                aria-label="Next page"
            >
                <ChevronRight className="size-4" />
            </button>
        </div>
    )
}
