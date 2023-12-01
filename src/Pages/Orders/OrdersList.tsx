import {useState, useEffect} from "react";
import {createPortal} from "react-dom";
import {Column} from "../../types/Table";
import {Table} from "../../components/Table/Table.tsx";
import {Titles} from "../../components/Titles/Titles.tsx";
import {Container} from "../../components/Container/Container.tsx";
import {SearchInput} from "../../components/SearchInput/SearchInput.tsx";
import {Modal, ModalContainer} from "../../components/Modal/Modal.tsx";
import { Button } from "../../components/Button/Button.tsx";
import { useNavigate } from "react-router-dom";
import { API_KEY } from "../../constantes.ts";
import { useFetch } from "../../hooks/useFetch.tsx";

export const Orders = () => {
    const [search, setSearch] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data, loading, error, get, del } = useFetch('https://coffvart-backend.onrender.com/api/')
    const navigate = useNavigate()

    useEffect(() => {
        get(`orders?apikey=${API_KEY}`);
    }, []);


    const columnsOrders: Column[] = [
        { key: 'id', header: 'ID' },
        { key: 'code', header: 'Codigo' },
        { key: 'total', header: 'Total' },
        { key: 'customerId', header: 'Cliente' },
        { key: 'state', header: 'Estado' },
    ];
    
    const dataOrders = data?.orders?.rows || [];
    let dataOrdersFiltered: any[];

    /* const dataOrders = [
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
    ];*/


    if (search.length > 0) {
        dataOrdersFiltered = dataOrders.filter((order:any) =>
                order.code.toLowerCase().includes(search) ||
                order.state.toLowerCase().includes(search.toLowerCase())
        );
    } else {
        dataOrdersFiltered = dataOrders;
    }

    const handleDelete = (row: any) => {
        del(`orders/${row.id}?apikey=${API_KEY}`);
        setTimeout(() => {
            get(`orders?apikey=${API_KEY}`);
        }, 500);
    }; 

    const [orderDetails, setOrderDetails] = useState<any[]>([]);

    const getOrderDetails =  (order: any) => {
        console.log(order, "Esta es la orden")
        const orderDetails= order?.ordersderails?.map((orderDetail: any) => ({
            id: orderDetail.id,
            orderId: orderDetail.orderId,
            product: orderDetail.product.name,
            quantity: orderDetail.quantity,
            value: orderDetail.value,
            total: orderDetail.quantity*orderDetail.value,
        }));
        setOrderDetails(orderDetails);
        setIsModalOpen(true);
        }
    
    
console.log(data)
    return (
        <>
            <Container align={'CENTER'} justify={'TOP'}>
                <Titles title={"Pedidos"} level={1}/>
                <div className="roles__table" style={
                    {
                        width: '100%',
                    }
                }>
                <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem',
                    }}>
                        <SearchInput
                        label={"Buscar Pedido"}
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        idSearch={"SalesSearch"}
                    />
                    <Button text={'Crear Pedido'} onClick={()=> navigate('/admin/')} fill= {false} />
                    </div>
                    {
                        loading && <p>Cargando...</p>
                    }
                    {
                        error && <p>Ha ocurrido un error</p>
                    }
                    {
                        !loading && !error && dataOrdersFiltered.length === 0 && <p>No hay datos</p>
                    }
                    {
                        !loading && !error && dataOrdersFiltered.length > 0 && (
                            <Table
                                columns={columnsOrders}
                                data={dataOrdersFiltered}
                                onRowClick={getOrderDetails}
                                editableAction={{
                                    onClick: (row) => navigate(`/admin/Orders/edit/${row.id}`),
                                }}
                                deleteAction={{
                                    onClick: handleDelete,
                                }}
                            />
                        )
                    }
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
                                        key: "product",
                                        header: "Producto",
                                        // render: (row) => row.product ? row.product.name : 'N/A',
                                    },
                                    {
                                        key: "quantity",
                                        header: "Cantidad",
                                        // render: (row) => row.quantity !== undefined ? row.quantity : 'N/A',
                                    },
                                    {
                                        key: "value",
                                        header: "Valor Unitario",
                                        // render: (row) => row.value !== undefined ? row.value : 'N/A',
                                    },
                                    {
                                        key: "total",
                                        header: "Total",
                                        // render: (row) => (row.quantity !== undefined && row.value !== undefined) ? row.quantity * row.value : 'N/A',
                                    },
                                    // You can add more columns as needed
                                ]}
                                data={orderDetails}
                                onRowClick={() => null}
                            />
                        </Modal>
                    </ModalContainer>,
                    document.getElementById("modal") as HTMLElement)
            }
        </>
    );
};
