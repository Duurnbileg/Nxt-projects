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

    const handlePage = (newPage: number) => {
        setPage(newPage)
    }

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                            e.preventDefault()
                            handlePrevious()
                        }}
                    />
                </PaginationItem>
                {page <= 4 && (
                    <>
                        {[1, 2, 3, 4, 5]
                            .filter((item) => item <= totalPages)
                            .map((item) => (
                                <PaginationItem key={item}>
                                    <PaginationLink
                                        href="#"
                                        isActive={page === item}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            handlePage(item)
                                        }}
                                    >
                                        {item}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                        {totalPages > 5 && (
                            <>
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>

                                <PaginationItem>
                                    <PaginationLink
                                        href="#"
                                        isActive={page === totalPages}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            handlePage(totalPages)
                                        }}
                                    >
                                        {totalPages}
                                    </PaginationLink>
                                </PaginationItem>
                            </>
                        )}
                    </>
                )}
                {page > 4 && page < totalPages - 3 && (
                    <>
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    handlePage(1)
                                }}
                            >
                                1
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    handlePage(page - 1)
                                }}
                            >
                                {page - 1}
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                isActive
                                onClick={(e) => {
                                    e.preventDefault()
                                }}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    handlePage(page + 1)
                                }}
                            >
                                {page + 1}
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    handlePage(totalPages)
                                }}
                            >
                                {totalPages}
                            </PaginationLink>
                        </PaginationItem>
                    </>
                )}
                {page >= totalPages - 3 && totalPages > 5 && (
                    <>
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    handlePage(1)
                                }}
                            >
                                1
                            </PaginationLink>
                        </PaginationItem>

                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>

                        {[
                            totalPages - 4,
                            totalPages - 3,
                            totalPages - 2,
                            totalPages - 1,
                            totalPages,
                        ].map((item) => (
                            <PaginationItem key={item}>
                                <PaginationLink
                                    href="#"
                                    isActive={page === item}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handlePage(item)
                                    }}
                                >
                                    {item}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                    </>
                )}
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(e) => {
                            e.preventDefault()
                            handleNext()
                        }}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}