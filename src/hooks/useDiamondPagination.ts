import { useState, useMemo, useEffect, useCallback } from 'react';
import { calculatePaginationInfo } from '@/utils/helpers';

interface UseDiamondPaginationProps<T = unknown> {
  data: T[];
  initialPageSize?: number;
  serverSidePagination?: boolean;
  totalRecords?: number;
  totalPages?: number;
}

export const useDiamondPagination = <T = unknown>({
  data,
  initialPageSize = 20,
  serverSidePagination = false,
  totalRecords: externalTotalRecords,
  totalPages: externalTotalPages
}: UseDiamondPaginationProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(initialPageSize);

  const totalRecords = serverSidePagination 
    ? (externalTotalRecords || 0) 
    : data.length;

  const totalPages = serverSidePagination 
    ? (externalTotalPages || 1)
    : Math.ceil(data.length / rowsPerPage);

  const paginatedData = useMemo(() => {
    if (serverSidePagination) {
      return data;
    }
    const startIdx = (currentPage - 1) * rowsPerPage;
    const endIdx = startIdx + rowsPerPage;
    return data.slice(startIdx, endIdx);
  }, [data, currentPage, rowsPerPage, serverSidePagination]);

  const paginationInfo = useMemo(() => {
    return calculatePaginationInfo(currentPage, rowsPerPage, totalRecords);
  }, [currentPage, rowsPerPage, totalRecords]);

  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage, totalPages]);

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  }, [currentPage]);

  const changeRowsPerPage = useCallback((newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return {
    currentPage,
    rowsPerPage,
    totalPages,
    totalRecords,
    paginatedData,
    paginationInfo,
    goToPage,
    nextPage,
    prevPage,
    changeRowsPerPage,
    setCurrentPage
  };
};


