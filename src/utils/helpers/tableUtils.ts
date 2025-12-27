export const getPageNumbers = (
  currentPage: number,
  totalPages: number,
  maxVisiblePages: number = 5
): (number | string)[] => {
  if (totalPages <= maxVisiblePages + 2) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | string)[] = [1];

  let startPage = Math.max(2, currentPage - 1);
  let endPage = Math.min(totalPages - 1, currentPage + 1);

  if (currentPage <= 3) {
    startPage = 2;
    endPage = maxVisiblePages;
  }

  if (currentPage >= totalPages - 2) {
    startPage = totalPages - maxVisiblePages + 1;
    endPage = totalPages - 1;
  }

  if (startPage > 2) {
    pages.push("start-ellipsis");
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (endPage < totalPages - 1) {
    pages.push("end-ellipsis");
  }

  pages.push(totalPages);

  return pages;
};

export const calculatePaginationInfo = (
  currentPage: number,
  rowsPerPage: number,
  totalRecords: number
) => {
  const start = totalRecords === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const end = Math.min(currentPage * rowsPerPage, totalRecords);
  
  return { start, end, total: totalRecords };
};


