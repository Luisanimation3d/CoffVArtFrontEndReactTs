import React, { FC, useState } from 'react';
import { TableProps } from '../../types/Table';
import { FiEdit2, FiMoreVertical, FiTrash2 } from 'react-icons/fi';
import './Table.css';
import { ExcelButton } from '../ExcelButton/ExcelButton.tsx';
import { Pagination } from '../Pagination/Pagination.tsx';
import { useDarkMode } from '../../context/DarkMode.tsx';

export const Table: FC<TableProps> = ({
  columns,
  data,
  onRowClick,
  optionButtons,
  editableAction,
  deleteAction,
  tituloDocumento,
  nombreArchivo,
  pagination = false,
  page,
  setPage,
  totalPages,
}: TableProps) => {
  const [expandedRow, setExpandedRow] = useState<any>([]);
  const { darkMode } = useDarkMode(); // Obtener el estado del modo oscuro desde el contexto

  const handleExpandRow = (row: any) => {
    setExpandedRow(row.id === expandedRow.id ? {} : row);
  };

  const handleEditRow = (row: any) => {
    handleExpandRow(row);
    editableAction?.onClick(row);
  };

  const handleDeleteRow = (row: any) => {
    handleExpandRow(row);
    deleteAction?.onClick(row);
  };

  return (
    <>
      {tituloDocumento && nombreArchivo && (
        <ExcelButton dataDownload={data} tituloDocumento={tituloDocumento} nombreArchivo={nombreArchivo} />
      )}
      <table className={`table__container ${darkMode ? 'table__container__darkMode' : 'table__container__lightMode'}`}>
        <thead className={`table__header`}>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className={`table__cell`}>
                {column.header}
              </th>
            ))}
            {(editableAction || deleteAction || optionButtons) && <th className={`table__cell`}>Acciones</th>}
          </tr>
        </thead>
        <tbody className={`table__body`}>
          {data.map((row, globalIndex) => (
            <tr
              key={globalIndex}
              onClick={() => onRowClick(row)}
              className={`table__row ${typeof row['state'] == 'boolean' ? !row['state'] ? 'table__row--disabled' : '' : ''}`}
              data-key={row.id}
            >
              {columns.map((column, index) => (
                <td key={index} className={`table__cell--row`}>
                  {column.key === 'id' ? globalIndex + 1 : row[column.key]}
                </td>
              ))}
              {(editableAction || deleteAction || optionButtons) && (
                <>
                  <td className={`table__cell--row`}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExpandRow(row);
                      }}
                      className={`table__optionsButton`}
                    >
                      <FiMoreVertical />
                    </button>
                    {expandedRow.id === row.id && (
                      <div
                        className={`table__dropdown`}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        {optionButtons?.map((button, index) => (
                          <button
                            key={index}
                            className={`table__dropdown--item`}
                            onClick={() => button.onClick(row)}
                          >
                            {button.icon && button.icon} {button.label}
                          </button>
                        ))}
                        {editableAction && (
                          <button
                            className={`table__dropdown--item`}
                            onClick={() => handleEditRow(row)}
                          >
                            {editableAction.icon ? editableAction.icon : <FiEdit2 />}{' '}
                            {editableAction.label ? editableAction.label : 'Editar'}
                          </button>
                        )}
                        {deleteAction && (
                          <button
                            className={`table__dropdown--item`}
                            onClick={() => handleDeleteRow(row)}
                          >
                            {deleteAction.icon ? deleteAction.icon : <FiTrash2 />}{' '}
                            {deleteAction.label ? deleteAction.label : 'Eliminar'}
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {pagination && <Pagination page={page} setPage={setPage} totalPages={totalPages} />}
    </>
  );
};
