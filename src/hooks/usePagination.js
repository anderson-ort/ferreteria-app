import { useState, useMemo } from "react";


export default function usePagination(items, itemsPerPage = 8) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(items.length / itemsPerPage);

    const currentItems = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return items.slice(start, start + itemsPerPage);
    }, [items, currentPage, itemsPerPage]);

    const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
    const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

    return {
        currentItems,
        currentPage,
        totalPages,
        handlePrev,
        handleNext,
    };
}