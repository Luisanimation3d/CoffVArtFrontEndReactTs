import {FC, useState} from 'react'
import {TableProps} from '../../types/Table'
import { FiMoreVertical, FiEdit2, FiTrash2 } from 'react-icons/fi'
import './Table.css'


export const Table: FC<TableProps> = ({
    columns,
    data,
    onRowClick,
    optionButtons,
    editableAction,
    deleteAction
} : TableProps) => {

    const [expandedRow, setExpandedRow] = useState<any>([])
    const handleExpandRow = (row: any) => {
        setExpandedRow(row.id === expandedRow.id ? {} : row);
    }

    const handleEditRow = (row: any) => {
        handleExpandRow(row)
        editableAction.onClick(row)
    }

    const handleDeleteRow = (row: any) => {
        handleExpandRow(row)
        deleteAction.onClick(row)
    }

    return(
    <table className={`table__container`}>
        <thead className={`table__header`}>
            <tr>
                {columns.map((column, index) => (
                    <th key={index} className={`table__cell`}>{column.header}</th>
                ))}
                <th className={`table__cell`}>Acciones</th>
            </tr>
        </thead>
        <tbody className={`table__body`}>
            {data.map((row, index) => (
                <tr key={index} onClick={() => onRowClick(row)} className={`table__row`}>
                    {columns.map((column, index) => (
                        <td key={index} className={`table__cell--row`}>{row[column.key]}</td>
                    ))}
                    <td className={`table__cell--row`}>
                        <button onClick={(e)=> {
                            e.stopPropagation()
                            handleExpandRow(row)
                        }}
                        className={`table__optionsButton`}
                        ><FiMoreVertical/></button>
                        {
                            expandedRow.id === row.id &&
                            <div className={`table__dropdown`}>
                                {
                                    optionButtons?.map((button, index) => (
                                        <button key={index} className={`table__dropdown--item`} onClick={() => button.onClick(row)}>{button.icon && button.icon} {button.label}</button>
                                    ))
                                }
                                <button className={`table__dropdown--item`} onClick={() => handleEditRow(row)}>{editableAction.icon ? editableAction.icon : (<FiEdit2/>)} { editableAction.label ? editableAction.label : 'Editar' }</button>
                                <button className={`table__dropdown--item`} onClick={() => handleDeleteRow(row)}>{ deleteAction.icon ? deleteAction.icon : (<FiTrash2/>) } { deleteAction.label ? deleteAction.label : 'Eliminar' }</button>
                            </div>
                        }
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
)}