import {FiChevronLeft, FiChevronRight} from "react-icons/fi";

import styles from './Pagination.module.css'

export const Pagination = ({page, setPage, totalPages}: {page: number, setPage: (value: number) => void, totalPages: number}) => {
    const pages = Array.from(Array(totalPages).keys()).map((page) => page + 1)
    const handlePage = (page: number) => {
        setPage(page)
    }
    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }
    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1)
        }
    }

    return (
        <>
            <div className={styles['pagination__container']}>
                <button className={`${styles['pagination__button']} ${page == 1 ? styles['pagination__button--disabled'] : ''}`} onClick={handlePreviousPage}><FiChevronLeft/></button>
                {
                    pages.map((pageItem, index) => (
                        <button key={index} className={`${styles['pagination__button']} ${pageItem === page ? styles['pagination__button--active'] : ''}`} onClick={() => handlePage(pageItem)}>{pageItem}</button>
                    ))
                }
                <button className={`${styles['pagination__button']} ${page == totalPages ? styles['pagination__button--disabled'] : ''}`} onClick={handleNextPage}><FiChevronRight /></button>
            </div>
        </>
    )
}