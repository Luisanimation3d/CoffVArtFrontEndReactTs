import {useState} from "react";
import {createPortal} from "react-dom";
import {Column} from "../../types/Table";
import {Table} from "../../components/Table/Table.tsx";
import {Titles} from "../../components/Titles/Titles.tsx";
import {Container} from "../../components/Container/Container.tsx";
import {SearchInput} from "../../components/SearchInput/SearchInput.tsx";
import {Modal, ModalContainer} from "../../components/Modal/Modal.tsx";
import { Button } from "../../components/Button/Button.tsx";
import { useNavigate } from "react-router-dom";

export const Orders = () => {
    const [search, setSearch] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate()


    const columnsOrders: Column[] = [
        {
            key: "id",
            header: "ID",
        },
        {
            key: "code",
            header: "Código",
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

    const dataOrders = [
        {
            id: 1,
            code: "45-Doe",
            idCliente: 1,
            total: 30,
            estado: "true",
        },
        {
            id: 2,
            code: "48-Doe",
            idCliente: 1,
            total: 30,
            estado: "true",
        },
    ];

    let dataOrdersFiltered: any;

    if (search.length > 0) {
        dataOrdersFiltered = dataOrders.filter(
            (order) =>
                order.code.toLowerCase().includes(search.toLowerCase()) ||
                order.estado.toLowerCase().includes(search.toLowerCase())
        );
    } else {
        dataOrdersFiltered = dataOrders;
    }

    return (
        <>
            <Container>
                <Titles title={"Pedidos"} level={1}/>
                <div className="roles__table">
                <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem',
                    }}>
                    <Button text={'Crear Pedido'} onClick={()=> navigate('/admin/')} fill= {false} />
                    </div>
                    <SearchInput
                        label={"Buscar Pedido"}
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        idSearch={"SalesSearch"}
                    />
                    <Table
                        columns={columnsOrders}
                        data={dataOrdersFiltered}
                        onRowClick={() => setIsModalOpen(true)}
                        editableAction={{
                            onClick: () => null,
                        }}
                        deleteAction={{
                            onClick: () => null,
                        }}
                    />
                </div>
            </Container>
            {
                isModalOpen && createPortal(
                    <ModalContainer ShowModal={setIsModalOpen}>
                        <Modal
                            title="Detalle de Pedido"
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
                    </ModalContainer>,
                    document.getElementById("modal") as HTMLElement)
            }
        </>
    );
};
