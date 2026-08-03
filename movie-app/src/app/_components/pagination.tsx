"use client"

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

type PaginateProps = {
    page: number
    setPage: React.Dispatch<React.SetStateAction<number>>
    totalPages: number
}

export const Paginate = ({
    page,
    setPage,
    totalPages,
}: PaginateProps) => {

    const handlePrevious = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    const handleNext = () => {
        if (page < totalPages) {
            setPage(page + 1)
        }
    }

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                            handlePrevious()
                        }}
                    />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink
                        href="#"
                        isActive={page === 1}
                        onClick={(e) => {
                            setPage(1)
                        }}
                    >
                        1
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink
                        href="#"
                        isActive={page === 2}
                        onClick={(e) => {
                            setPage(2)
                        }}
                    >
                        2
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink
                        href="#"
                        isActive={page === 3}
                        onClick={(e) => {
                            setPage(3)
                        }}
                    >
                        3
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink
                        href="#"
                        isActive={page === totalPages}
                        onClick={(e) => {
                            setPage(totalPages)
                        }}
                    >
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(e) => {
                            handleNext()
                        }}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}