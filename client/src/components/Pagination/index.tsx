import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./style.module.scss";

type PaginationProps = {
    currentPage: number,
    onChangePage: (page: number) => void,
    totalPages: number
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, onChangePage, totalPages }) =>
    <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={(e) => onChangePage(e.selected + 1)}
        pageRangeDisplayed={8}
        pageCount={totalPages}
        forcePage={currentPage - 1}
    />
    ;

export default Pagination;
