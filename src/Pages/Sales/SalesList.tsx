import React, { useState } from "react";
import { Column } from "../../types/Table";
import { Table } from "../../components/Table/Table.tsx";
import { Titles } from "../../components/Titles/Titles.tsx";
import { Container } from "../../components/Container/Container.tsx";
import { SearchInput } from "../../components/SearchInput/SearchInput.tsx";
import { Modal, ModalContainer } from "../../components/Modal/Modal.tsx";

export const Sales = () => {
  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columnsSales: Column[] = [
    {
      key: "id",
      header: "ID",
    },
    {
      key: "factura",
      header: "Factura",
    },
    {
      key: "idCliente",
      header: "Cliente",
    },
    {
      key: "total",
      header: "Total",
    },
    {
      key: "estado",
      header: "Estado",
    },
  ];

  const dataSales = [
    {
      id: 1,
      factura: "45-Doe",
      idCliente: 1,
      total: 30,
      estado: "true",
    },
    {
      id: 2,
      factura: "45-Doe",
      idCliente: 1,
      total: 30,
      estado: "true",
    },
  ];

  let dataSalesFiltered: any;

  if (search.length > 0) {
    dataSalesFiltered = dataSales.filter(
      (sales) =>
        sales.factura.toLowerCase().includes(search.toLowerCase()) ||
        sales.estado.toLowerCase().includes(search.toLowerCase())
    );
  } else {
    dataSalesFiltered = dataSales;
  }

  return (
    <>
      <Container>
        <Titles title={"Sales"} level={1} />
        <div className="roles__table">
          <SearchInput
            label={"Buscar Ventas"}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            idSearch={"SalesSearch"}
          />
          <Table
            columns={columnsSales}
            data={dataSalesFiltered}
            onRowClick={() => setIsModalOpen(true)}
            editableAction={{
              onClick: () => null,
            }}
            deleteAction={{
              onClick: () => null,
            }}
          />
        <ModalContainer ShowModal={setIsModalOpen}>
            <Modal
                title="Detalle de Ventas"
                showModal={setIsModalOpen} 
            >
              <Table
                columns={[
                  {
                    key: "producto",
                    header: "Producto",
                  },
                  {
                    key: "cantidad",
                    header: "Cantidad",
                  },
                  {
                    key: "valorUnitario",
                    header: "Valor Unitario",
                  },
                  {
                    key: "total",
                    header: "Total",
                  },
                ]}
                data={[
                  {
                    producto: "Producto 1",
                    cantidad: 5,
                    valorUnitario: 10,
                    total: 50,
                  },
                  {
                    producto: "Producto 2",
                    cantidad: 3,
                    valorUnitario: 15,
                    total: 45,
                  },
                ]}
                onRowClick={() => null}
              />
            </Modal>
          </ModalContainer>
        </div>
      </Container>
    </>
  );
};
