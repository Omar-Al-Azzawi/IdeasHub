'use client'

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useSearchParams } from 'next/navigation';

type Props = {
    total: number,
    currentPage: number,
    ideasPerPage: number
}

const PaginationIdeas = ({ total, currentPage, ideasPerPage }: Props) => {
    const searchParams = useSearchParams();
    const totalPages = Math.ceil(total / ideasPerPage);

    const setPage = (page: number) => {
        const params = new URLSearchParams(searchParams || '');
        params.set('page', page.toString());
        window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
        window.location.reload();
    };

    return (
        <div>
            <Pagination className="mt-8">
                <PaginationContent>
                    <PaginationPrevious
                        onClick={() => currentPage > 1 && setPage(currentPage - 1)}
                        className="cursor-pointer hover:text-teal-500 duration-500">
                        <PaginationLink onClick={() => setPage(currentPage - 1)}>
                            <span className={currentPage === 1 ? 'text-gray-500' : ''}>Previous</span>
                        </PaginationLink>
                    </PaginationPrevious>
                    {currentPage > 1 && (
                        <PaginationItem>
                            <PaginationLink onClick={() => setPage(1)}>1</PaginationLink>
                        </PaginationItem>
                    )}
                    {currentPage > 2 && <PaginationEllipsis />}
                    <PaginationItem>
                        <PaginationLink className="bg-teal-500 cursor-pointer text-white" isActive>{currentPage}</PaginationLink>
                    </PaginationItem>
                    {currentPage < totalPages && (
                        <PaginationItem>
                            <PaginationLink onClick={() => setPage(currentPage + 1)}>{currentPage + 1}</PaginationLink>
                        </PaginationItem>
                    )}
                    {currentPage < totalPages - 1 && <PaginationEllipsis />}
                    <PaginationNext
                        onClick={() => currentPage < totalPages && setPage(currentPage + 1)}
                        className="cursor-pointer hover:text-teal-500 duration-500">
                        <PaginationLink onClick={() => setPage(currentPage + 1)}>
                            <span>Next</span>
                        </PaginationLink>
                    </PaginationNext>
                </PaginationContent>
            </Pagination>
        </div>
    );
}

export default PaginationIdeas;
