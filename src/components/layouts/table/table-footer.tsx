

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';


interface TableFooterProps {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    prevPage: () => void;
    nextPage: () => void;
}

const TableFooter = ({ currentPage, itemsPerPage, totalItems, prevPage, nextPage }: TableFooterProps) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <div className="flex items-center w-full justify-between mt-4">
            <div className="text-xs text-muted-foreground">
                Showing {' '}
                <strong>
                    {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, totalItems)}
                </strong>{' '}
                of <strong>{totalItems}</strong> items
            </div>
            <div className="flex">
                <Button
                    onClick={prevPage}
                    variant="ghost"
                    size="sm"
                    disabled={currentPage === 1}
                >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Prev
                </Button>
                <Button
                    onClick={nextPage}
                    variant="ghost"
                    size="sm"
                    disabled={currentPage === totalPages}
                >
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};

export default TableFooter;