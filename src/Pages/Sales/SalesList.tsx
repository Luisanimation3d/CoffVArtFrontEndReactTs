import {useState, useEffect} from "react";
import {createPortal} from "react-dom";
import {Column} from "../../types/Table";
import {Table} from "../../components/Table/Table.tsx";
import {Container} from "../../components/Container/Container.tsx";
import {Modal, ModalContainer} from "../../components/Modal/Modal.tsx";
import { API_KEY, API_URL } from "../../constantes.ts";
import { EditSale } from "../../Modales/EditOrderModal/EditSaleModal.tsx";
import { useFetch } from "../../hooks/useFetch.tsx";
import { TableRedisign } from "../../components/TableRedisign/TableRedisign.tsx";
import { FiShuffle } from "react-icons/fi";
import './SalesCss.css'
import burdeoFullLogo from '../../assets/BurdeoFullLogo.png';
export const Sales = () => {
    const [search, setSearch] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const [idEdit, setidEdit] = useState(0);
    const { data, loading, error, get, del } = useFetch(API_URL);
    const [dataSalesModify, setDataSalesModify] = useState<any>([])
    const [page, setPage] = useState<number>(1)
    useEffect(() => {
        get(`sales?apikey=${API_KEY}&page=${page}`)
    }, [page]);

    useEffect(() => {
        get(`sales?apikey=${API_KEY}`);
    }, []);

    

    const columnsSales: Column[] = [
        {
            key: "id",
            header: "ID",
        },
        {
            key: "invoice",
            header: "Factura",
        },
        {
            key: "coustumerId",
            header: "Cliente",
        },
        {
            key: "total",
            header: "Total",
        },
        {
        key:'state',
        header: 'Estado'
        }
    ];
    useEffect(() => {
        if(data?.sales?.rows){
            const newSaleData = data?.sales?.rows.map((sale: any) => {
                return {
                    ...sale,
                    coustumerId: sale?.coustumer?.name
                }
            })

            setDataSalesModify(newSaleData)
        }
    }, [data]);

    const dataSales = dataSalesModify || [];
    let dataSalesFiltered: any;

    if (search.length > 0) {
        dataSalesFiltered = dataSalesModify.filter((sales: any) =>
                sales.invoice.toLowerCase().includes(search.toLowerCase()) ||
                sales.coustumerId.toLowerCase().includes(search.toLowerCase()) 
        );
    } else {
        dataSalesFiltered = dataSales;
    }


    const handleCallback= (row: {[key : string] : string | number}, type: string | number) => {	
        if(type === 'Eliminar'){
            del(`sales/${row.id}?apikey=${API_KEY}`);
            console.log(del)
            setTimeout(() => {
                get(`sales?apikey=${API_KEY}`);
            }, 500);
        }
        if (type === 'Cambiar proceso') {
            setidEdit(row.id as number);
            setIsModalOpenEdit(true);
            console.log(typeof row.id)
        }
    }; 

    const options = [
        /*{
            label: 'Eliminar',
            icon: <FiShuffle/>
        },*/
        {
            label: 'Cambiar proceso',
            icon: <FiShuffle/>
        }
    ]
    const [salesDetails, setSalesDetails] = useState<any[]>([]);

    const getSalesDetails = (sale: any) => {
        console.log(sale, "esta es la venta");
        const salesDetails= sale?.salesdetails?.map((salesDetail: any) => ({
            id: salesDetail.id,
            invoice: sale.invoice,
            name: sale.coustumer.name,
            address: sale.coustumer.address,
            phone: sale.coustumer.phone,
            document: sale.coustumer.document,
            documentType: sale.coustumer.documentType,
            saleId: salesDetail.saleId,
            product: salesDetail.product.name,
            quantity: salesDetail.quantity,
            value: salesDetail.value,
            total: salesDetail.quantity*salesDetail.value,
        }));
        setSalesDetails(salesDetails);
        setIsModalOpen(true);
    };
    

    return (
        <>
            <Container align={'CENTER'} justify={'TOP'}>
                <TableRedisign
                    columns={columnsSales}
                    data={dataSalesFiltered}
                    search={search}
                    setSearch={setSearch}
                    onRowClick={getSalesDetails}
                    title={'Ventas'}
                    loading={loading}
                    callback={handleCallback}
                    dropDownOptions={options}
                    totalPages={Math.ceil(data?.coustumers?.count / data?.options?.limit) || 1}
                    pagination={true}
                />
                {
                    isModalOpenEdit && createPortal(
                        <>
                        <EditSale id={idEdit} setIsModalOpen={setIsModalOpenEdit} title='Cambiar proceso'/>
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
                    <h1>Factura {salesDetails[0]?.invoice}</h1>
                    <p></p>
                </div>
                <div className="client-info">
                    <h2>Información del cliente</h2>
                    <p>Nombre: {salesDetails[0]?.name}</p>
                    <p>Dirección: {salesDetails[0]?.address}</p>
                    <p>Teléfono: {salesDetails[0]?.phone}</p>
                    <p>Documento: {salesDetails[0]?.documentType} {salesDetails[0]?.document}</p>
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
                            {salesDetails.map((item, index) => (
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
                                <td className="total-tv">{salesDetails.reduce((acc, item) => acc + item.total, 0)}</td>
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

export default Sales;