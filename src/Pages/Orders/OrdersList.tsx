import {useState, useEffect} from "react";
import {createPortal} from "react-dom";
import {Column} from "../../types/Table";
import {Table} from "../../components/Table/Table.tsx";
import {Container} from "../../components/Container/Container.tsx";
import {Modal, ModalContainer} from "../../components/Modal/Modal.tsx";
import { useNavigate } from "react-router-dom";
import { API_KEY, API_URL } from "../../utils/constantes.ts";
import { useFetch } from "../../hooks/useFetch.tsx";
import { EditOrder } from "../../Modales/EditOrderModal/EditOrderModal.tsx";
import { TableRedisign } from "../../components/TableRedisign/TableRedisign.tsx";
import { FiShuffle } from "react-icons/fi";
import burdeoFullLogo from '../../assets/BurdeoFullLogo.png';
import './../Sales/SalesCss.css'


export const Orders = () => {
    const [search, setSearch] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const [idEdit, setidEdit] = useState(0);
    const [dataOrdersModify, setDataOrdersModify] = useState<any>([])


    const { data, loading, error, get, del } = useFetch(API_URL)
    const navigate = useNavigate()
    const [page, setPage] = useState<number>(1);
    useEffect(() => {
        get(`orders?apikey=${API_KEY}&page=${page}`)
    }, [page]);



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

    useEffect(() => {
        if(data?.orders?.rows){
            const newCostumerData = data?.orders?.rows.map((order: any) => {
                return {
                    ...order,
                    customerId: order?.coustumer?.name
                }
            })

            setDataOrdersModify(newCostumerData)
        }
    }, [data]);
    
    const dataOrders = dataOrdersModify || [];
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
        dataOrdersFiltered = dataOrdersModify.filter((order:any) =>
                order.code.toLowerCase().includes(search) ||
                order.state.toLowerCase().includes(search.toLowerCase())
        );
    } else {
        dataOrdersFiltered = dataOrders;
    }
    useEffect(() => {
        if(!isModalOpenEdit){
            get(`orders?apikey=${API_KEY}`);
        }
    }, [isModalOpenEdit]);

    const handleDelete = (row: {[key: string] : string | number}, type: string | number) => {
        if(type === 'Eliminar'){
            del(`orders/${row.id}?apikey=${API_KEY}`);
            setTimeout(() => {
                get(`orders?apikey=${API_KEY}`);
            }, 500);
            console.log(row, 'row');
        }
        if(type === 'Cambiar proceso'){
            setidEdit(row.id as number);
            setIsModalOpenEdit(true);
        }
    }; 

    const options = [
        {
            label: 'Eliminar',
            icon: <FiShuffle/>
        },
        {
            label: 'Cambiar proceso',
            icon: <FiShuffle/>
        }
    ];


    const [orderDetails, setOrderDetails] = useState<any[]>([]);

    const getOrderDetails =  (order: any) => {
        console.log(order, "Esta es la orden")
        const orderDetails= order?.ordersderails?.map((orderDetail: any) => ({
            id: orderDetail.id,
            code: order.code,
            name: order.coustumer.name,
            address: order.coustumer.address,
            phone: order.coustumer.phone,
            document: order.coustumer.document,
            documentType: order.coustumer.documentType,
            orderId: orderDetail.orderId,
            product: orderDetail.product.name,
            quantity: orderDetail.quantity,
            value: orderDetail.value,
            total: orderDetail.quantity*orderDetail.value,
        }));
        console.log(orderDetails, "Estos son los detalles de la orden")
        console.log(order.total, "Este es el total de la orden")
        setOrderDetails(orderDetails);
        setIsModalOpen(true);
        }
    
console.log(data)
    return (
        <>
            <Container align={'CENTER'} justify={'TOP'}>
                <TableRedisign
                    columns={columnsOrders}
                    data={dataOrdersFiltered}
                    onRowClick={getOrderDetails}
                    dropDownOptions={options}
                    search={search}
                    setSearch={setSearch}
                    createAction={() => navigate('/admin/Orders/create')}
                    title="Ordenes"
                    page={page}
                    setPage={setPage}
                    callback={handleDelete}
                />
                {
                    isModalOpenEdit && createPortal(
                        <>
                            <EditOrder  id={idEdit} setIsModalOpen={setIsModalOpenEdit} title="Cambiar proceso"/>
                        </>,
                        document.getElementById('modal') as HTMLElement
                    )
                }

            </Container>
            {
                isModalOpen && createPortal(
                    <ModalContainer ShowModal={setIsModalOpen}>
                        <Modal
                            showModal={setIsModalOpen}
                        >
                            <div className="invoice-container">
                <div className="header">
                    <img src={burdeoFullLogo} alt="Logo" style={{ maxWidth: '10%', height: 'auto' }} />
                    <h1>Factura {orderDetails[0]?.code}</h1>
                    <p></p>
                </div>
                <div className="client-info">
                    <h2>Información del cliente</h2>
                    <p>Nombre: {orderDetails[0]?.name}</p>
                    <br />
                    <p>Dirección: {orderDetails[0]?.address}</p>
                    <br />
                    <p>Telefono: {orderDetails[0]?.phone}</p>
                    <br />
                    <p>Documento: {orderDetails[0]?.documentType} {orderDetails[0]?.document}</p>
                </div>
                <div className="order-details">
                    <h2>Detalles del pedido</h2>
                    <table>
                        <thead>
                            <tr>
                                <th className="invoice-table-header">Producto</th>
                                <th className="invoice-table-header">Cantidad</th>
                                <th className="invoice-table-header">Precio unitario</th>
                                <th className="invoice-table-header">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderDetails.map((item, index) => (
                                <tr key={index}>
                                    <td className="invoice-table-cell">{item.product}</td>
                                    <td className="invoice-table-cell">{item.quantity}</td>
                                    <td className="invoice-table-cell">{item.value}</td>
                                    <td className="invoice-table-cell">{item.total}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="total-td" colSpan={3}>Total</td>
                                <td className="total-tv">{orderDetails.reduce((acc, item) => acc + item.total, 0)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
                        </Modal>
                    </ModalContainer>,
                    document.getElementById("modal") as HTMLElement)
            }
        </>
    );
};

export default Orders;