import styles from './TableRedisign.module.css';
import {FiDownload, FiMoreVertical, FiPlus, FiSearch} from "react-icons/fi";
import React, {useEffect, useId, useRef, useState} from "react";
import {Pagination} from "../Pagination/Pagination.tsx";
import {useDarkMode} from "../../context/DarkMode.tsx";
import {handleDownloadExcel} from '../../helpers/downloadExcel.ts';
import {statesTable} from "../../utils/statesTable.ts";
import {Column} from "../../types/Table";


interface TableProps {
    columns: Column[];
    data: { [key: string]: string | number }[];
    onRowClick?: (row: { [key: string]: string | number }) => void;
    callback?: (row: { [key: string]: string | number }, type: string) => void;
    title?: string;
    search: string;
    setSearch: (search: string) => void;
    dropDownOptions?: {
        icon: React.ReactNode;
        label: string;
    }[];
    pagination?: boolean;
    page?: number;
    setPage?: (page: number) => void;
    totalPages?: number;
    loading?: boolean;
    createAction?: () => void;
    itemsPerPage?: number;
}

export const TableRedisign = ({
                                  columns,
                                  data,
                                  onRowClick,
                                  callback,
                                  title,
                                  search,
                                  setSearch,
                                  dropDownOptions,
                                  page,
                                  setPage,
                                  // totalPages,
                                  pagination,
                                  loading,
                                  createAction,
                                  itemsPerPage = 10
                              }: TableProps) => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const {darkMode} = useDarkMode();

    const [expandedRow, setExpandedRow] = useState<{
        [key: string]: string | number
    }>({})

    const dropdownRef: React.MutableRefObject<HTMLDivElement> | React.MutableRefObject<any> = useRef(null);

    const handleDocumentClick = (e: any) => {
        if (expandedRow?.id !== undefined || e.target !== dropdownRef?.current) {
            setExpandedRow({})
        }
    };

    const handleStateRow = (state: unknown) => {
        return typeof state === 'boolean';
    }

    const idKey = useId();

    const dataToDownload = (datos: any) => {
        const dataToDownload = datos?.map((row: any, index: number) => {
            const newRow = {
                ...row,
                id: index + 1,
                state: typeof row.state === 'boolean' ? row.state ? 'Activo' : 'Inactivo' : row.state
            };
            return newRow;
        });

        const dataToDownloadWithHeaders = dataToDownload.map((row: any) => {
            const newRow: {[key:string]:any} = {};
            for (const key in row) {
                columns.map(column => {
                    if (column.key === key) {
                        if (column.key === 'id') {
                            // colocar el nombre # en vez de id
                            newRow['#'] = row[key];
                        } else {
                            newRow[column.header] = row[key];
                        }
                    }
                })
            }
            return newRow;
        });

        return dataToDownloadWithHeaders;
    }

    const dataPaginate = data.reduce((acc: { [key: number]: { [key: string]: string | number }[] }, _, index) => {
        if (index % itemsPerPage === 0) {
            acc[index / itemsPerPage + 1] = data.slice(index, index + itemsPerPage);
        }
        return acc;
    }, []);

    const totalPaginationPages = Math.ceil(data.length / itemsPerPage);

    console.log(data.length, 'Total')

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowWidth(window.innerWidth);
        });
    }, []);

    return (
        <>
            <div
                className={`${styles.table__container} ${darkMode ? styles.table__container__darkMode : styles.table__container__lightMode}`}>
                <div className={`${styles.table__header__container}`}>
                    <div className={`${styles.table__header__action__container}`}>
                        {
                            createAction && (
                                <>
                                    <button
                                        className={`${styles.table__header__action__button} ${styles.table__header__action__button__create}`}
                                        onClick={createAction}
                                    >
                                        <FiPlus/>
                                        <span className={`${styles.create__tooltip}`}>Crear nuevo</span>
                                    </button>
                                </>
                            )
                        }
                        <button
                            className={`${styles.table__header__action__button}`}
                            onClick={() => handleDownloadExcel(dataToDownload(data), title || 'data', title || 'data')}
                        >
                            <FiDownload/>
                            <span className={`${styles.create__tooltip}`}>Descargar informe</span>
                        </button>
                    </div>
                    <h3 className={`${styles.table__header__title}`}>
                        {title}
                    </h3>
                    {
                        windowWidth > 768 && (
                            <div className={`${styles.table__header__search__container}`}>
                                <label htmlFor="search__input__table"
                                       className={`${styles.table__header__search__label}`}><FiSearch/></label>
                                <input type="text" placeholder="Search" id={`search__input__table`}
                                       className={`${styles.table__header__search__input}`} value={search}
                                       onChange={e => setSearch(e.target.value)}/>
                            </div>
                        )
                    }
                    {
                        windowWidth <= 768 && (
                            <button
                                className={`${styles.table__header__action__button}`}
                                onClick={() => handleDownloadExcel(dataToDownload(data), title || 'data', title || 'data')}
                            >
                                <FiSearch/>
                                <span className={`${styles.create__tooltip}`}>Descargar informe</span>
                            </button>
                        )
                    }
                </div>
                <div className={`${styles.table__content__container}`}>
                    <table className={`${styles.table__content__table}`}>
                        <thead className={`${styles.table__content__thead}`}>
                        <tr className={`${styles.table__content__thead__row}`}>
                            {
                                columns.map((column, index) => (
                                    column.key === 'id' ? (
                                        <th key={index} className={`${styles.table__content__thead__item}`}></th>) : (
                                        <th key={index}
                                            className={`${styles.table__content__thead__item}`}>{column.header}</th>)
                                ))
                            }
                            {
                                (callback && dropDownOptions) && (
                                    <th key={idKey} className={`${styles.table__content__thead__item}`}></th>
                                )
                            }
                            {/*<th className={`${styles.table__content__thead__item}`}></th>*/}
                            {/*<th className={`${styles.table__content__thead__item}`}> Employee</th>*/}
                            {/*<th className={`${styles.table__content__thead__item}`}>Leave Type</th>*/}
                            {/*<th className={`${styles.table__content__thead__item}`}>Dates Requested</th>*/}
                            {/*<th className={`${styles.table__content__thead__item}`}>Duration</th>*/}
                            {/*<th className={`${styles.table__content__thead__item}`}>Status</th>*/}
                            {/*<th className={`${styles.table__content__thead__item}`}></th>*/}
                        </tr>
                        </thead>
                        <tbody className={`${styles.table__content__tbody}`}>
                        {
                            loading ? (
                                    <>
                                        <tr className={`${styles.table__content__tbody__row}`}>
                                            <td colSpan={7} className={`${styles.table__content__tbody__noData}`}>
                                                Obteniendo datos...
                                            </td>
                                        </tr>
                                    </>
                                ) :
                                !dataPaginate[page as number] || dataPaginate[page as number].length === 0 ? (
                                    <>
                                        <tr className={`${styles.table__content__tbody__row}`}>
                                            <td colSpan={7} className={`${styles.table__content__tbody__noData}`}>
                                                No se encontraron datos
                                            </td>
                                        </tr>
                                    </>
                                ) : (
                                    <>
                                        {
                                            dataPaginate[page as number]?.map((row, globalIndex) => (
                                                <>
                                                    <tr
                                                        key={globalIndex}
                                                        onClick={() => onRowClick && onRowClick(row)}
                                                        className={`${styles.table__content__tbody__row} ${onRowClick ? styles.table__content__tbody__row__click : ''}`}
                                                        data-key={row.id}>
                                                        {
                                                            columns.map((column, index) => (
                                                                <>
                                                                    {
                                                                        column.key === 'id' ? (
                                                                                <td className={`${styles.table__content__tbody__item}`}
                                                                                    key={index}>{globalIndex + 1}</td>
                                                                            ) :
                                                                            column.key === 'state' ? (
                                                                                <td className={`${styles.table__content__tbody__item}`}
                                                                                    key={index}>
                                                                            <span
                                                                                // className={`${handleStateRow(row[column.key]) ? row[column.key] ? styles.table__content__status__approved : styles.table__content__status__declined : row[column.key] == 'Pending' || row[column.key].toLocaleString().toUpperCase() == 'PENDIENTE' || row[column.key].toLocaleString().toUpperCase() == 'TOSTANDO' || row[column.key].toLocaleString().toUpperCase() == 'EMPAQUETADO' ? styles.table__content__status__pending : row[column.key] == 'Approved' || row[column.key].toLocaleString().toUpperCase() == 'FINALIZADO' || row[column.key].toLocaleString().toUpperCase() == 'RECIBIDO' ? styles.table__content__status__approved : row[column.key] == 'Declined' || row[column.key].toLocaleString().toUpperCase() == 'CANCELADO' ? styles.table__content__status__declined : row[column.key].toLocaleString().toUpperCase() == 'ENVIADO' || row[column.key].toLocaleString().toUpperCase() == 'DESGASIFICASION' ? styles.table__content__status__onHold : ''}`} key={index}>
                                                                                className={`${handleStateRow(row[column.key]) ? row[column.key] ? styles.table__content__status__approved : styles.table__content__status__declined : statesTable.blue.includes(row[column.key].toLocaleString().toUpperCase()) ? styles.table__content__status__onHold : statesTable.green.includes(row[column.key].toLocaleString().toUpperCase()) ? styles.table__content__status__approved : statesTable.red.includes(row[column.key].toLocaleString().toUpperCase()) ? styles.table__content__status__declined : statesTable.orange.includes(row[column.key].toLocaleString().toUpperCase()) ? styles.table__content__status__pending : ''}`}
                                                                                key={index}>
                                                                                {
                                                                                    handleStateRow(row[column.key]) ? row[column.key] ? 'Activo' : 'Inactivo' : row[column.key].toLocaleString().toUpperCase() == 'PENDIENTE' ? 'Pendiente' : row[column.key].toLocaleString().toUpperCase() == 'APROBADO' ? 'Aprobado' : row[column.key].toLocaleString().toUpperCase() == 'RECHAZADO' ? 'Rechazado' : row[column.key]
                                                                                }
                                                                            </span>
                                                                                </td>
                                                                            ) : (
                                                                                <td className={`${styles.table__content__tbody__item}`}
                                                                                    key={index}>
                                                                                    {column.render ? column.render(row[column.key]) : row[column.key]}
                                                                                </td>
                                                                            )
                                                                    }
                                                                </>
                                                            ))

                                                        }
                                                        {
                                                            callback && dropDownOptions && (
                                                                <>
                                                                    <td className={`${styles.table__content__tbody__item}`}>
                                                                        <button
                                                                            className={`${styles.table__content__tbody__button}`}
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                setExpandedRow(prev => prev.id === row.id ? {} : row)
                                                                            }}>
                                                                            <FiMoreVertical/></button>
                                                                        {
                                                                            expandedRow.id === row.id && (
                                                                                <div
                                                                                    className={`${styles.table__content__tbody__dropdown__container}`}
                                                                                    ref={dropdownRef}
                                                                                    onClick={e => {
                                                                                        e.stopPropagation()
                                                                                    }}
                                                                                >
                                                                                    <ul className={`${styles.table__content__tbody__dropdown}`}>
                                                                                        {
                                                                                            dropDownOptions.map((option, index) => (
                                                                                                <li key={index}
                                                                                                    className={`${styles.table__content__tbody__dropdown__item}`}
                                                                                                    onClick={() => callback(row, option.label)}>
                                                                                                    {option.icon}{option.label}
                                                                                                </li>
                                                                                            ))
                                                                                        }
                                                                                    </ul>
                                                                                </div>
                                                                            )
                                                                        }
                                                                    </td>
                                                                </>
                                                            )
                                                        }
                                                    </tr>
                                                </>
                                            ))
                                        }
                                    </>
                                )
                        }
                        </tbody>
                    </table>
                </div>
            </div>

            {
                pagination && (
                    <Pagination page={page as number} setPage={setPage as (page: number) => void}
                                totalPages={totalPaginationPages}/>
                )
            }
            {
                createAction && (
                    <button className={styles.button__create__mobile} onClick={createAction}>
                        <FiPlus/>
                    </button>
                )
            }

        </>
    )
}