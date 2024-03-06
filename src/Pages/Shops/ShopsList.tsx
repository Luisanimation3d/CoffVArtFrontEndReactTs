import {useState, useEffect} from "react";
import {createPortal} from "react-dom";
import {Column} from "../../types/Table";
import {Table} from "../../components/Table/Table.tsx";
import {Titles} from "../../components/Titles/Titles.tsx";
import {Container} from "../../components/Container/Container.tsx";
import {SearchInput} from "../../components/SearchInput/SearchInput.tsx";
import {Modal, ModalContainer} from "../../components/Modal/Modal.tsx";
import {API_KEY, API_URL} from "../../constantes.ts";
import { Button } from "../../components/Button/Button.tsx";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch.tsx";
import {TableRedisign} from "../../components/TableRedisign/TableRedisign.tsx";
import {FiShuffle} from "react-icons/fi";
import './ShopsCss.css'
import burdeoFullLogo from '../../assets/BurdeoFullLogo.png';
import { Shop } from "@mui/icons-material";


export const Shops = () => {
    const [search, setSearch] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataShopsModify, setDataShopsModify] = useState<any>([])
    const [dataToShow, setDataToShow] = useState<any[]>([])
    const { data, loading, error, get, del } = useFetch('https://coffvart-backend.onrender.com/api/')
    const navigate = useNavigate();
    const [page, setPage] = useState<number>(1)

    useEffect(() => {
        get(`shops?apikey=${API_KEY}`);
    }, []);

    const columnsShops: Column[] = [
        {
            key: "id",
            header: "ID",
        },
        {
            key: "invoice",
            header: "Factura",
        },
        {
            key: "supplierId",
            header: "Proveedor",
        },
        {
            key: "total",
            header: "Total",
        },
        {
            key: "date",
            header: "Fecha de Compra",
        },
        {
            key: "state",
            header: "Estado",   
        }
    ];

    
    useEffect(() => {
        if(data?.shops?.rows){
            const newSupplierData = data?.shops?.rows.map((shop: any) => {
                return {
                    ...shop,
                    supplierId: shop?.supplier?.name
                }
            })

            setDataShopsModify(newSupplierData)
        }
    }, [data]);

    console.log(data)

    const dataShops = dataShopsModify || [];
    let dataShopsFiltered: any;

    if (search.length > 0) {
        dataShopsFiltered = dataShopsModify.filter((shops: any) =>
                shops.invoice.toLowerCase().includes(search.toLowerCase()) ||
                shops.estado.toLowerCase().includes(search.toLowerCase())
        );
    } else {
        dataShopsFiltered = dataShops;
    }

    const handleDelete = (row: any) => {
        del(`shops/${row}?apikey=${API_KEY}`);
        setTimeout(() => {
            get(`shops?apikey=${API_KEY}`);
        }, 500);
    };
    const handleCallback = (row: {[key : string] : string | number}, type: string | number) => {
        if(type === 'Cambiar estado'){
            del(`shops/${row.id}?apikey=${API_KEY}`);
            setTimeout(() => {
                get(`shops?apikey=${API_KEY}`);
            }, 500);
        }
    }
    const options = [
        {
            label: 'Cambiar estado',
            icon: <FiShuffle/>
        }
    ]
    const [shopsDetails, setShopsDetails] = useState<any[]>([]);

    const getShopsDetails = (shop: any) => {
        console.log(shop, "esta es la compra");
        const shopsDetails= shop?.shopdetails?.map((shopsDetail: any) => ({
            id: shopsDetail.id,
            invoice: shop.invoice,
            shopId: shopsDetail.shopId,
            supply: shopsDetail.supply.name,
            quantity: shopsDetail.quantity,
            value: shopsDetail.value,
            total: shopsDetail.quantity*shopsDetail.value,
        }));
        setShopsDetails(shopsDetails);
        setIsModalOpen(true);
    };

    useEffect(()=>{
        if(data?.shops?.rows){
            const newData = data?.shops?.rows?.map((item: any)=>({
                ...item,
                State: <Button text={item.state ? 'Activo' : 'Anulada'} autosize={false} type={'BUTTON'} onClick={(e: any) => {
                    e.stopPropagation()
                    handleDelete(e.target?.parentNode.parentNode.dataset.key)
                }}/>
            }))

            setDataToShow(newData)
        }
    }, [data])

    return (
        <>
            <Container align={'CENTER'} justify={'TOP'}>
            <TableRedisign
                    columns={columnsShops}
                    data={dataShopsFiltered}
                    onRowClick={getShopsDetails}
                    search={search}
                    setSearch={setSearch}
                    title={'Compras'}
                    createAction={() => navigate('/admin/shops/create')}
                    page={page || 1}
                    setPage={setPage}
                    totalPages={Math.ceil(data?.shops?.count / data?.options?.limit) || 1}
                    pagination={true}
                    loading={loading}
                    callback={handleCallback}
                    dropDownOptions={options}
                />  
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
                    <h1>Factura {shopsDetails[0]?.invoice}</h1>
                    <p></p>
                </div>
                <div className="client-info">
                    <h2>Información de la compra</h2>
                    <p>Factura: {shopsDetails[0]?.invoice}</p>
                    <p>Insumo: {shopsDetails[0]?.supply}</p>
                </div>
                <div className="order-details">
                    <h2>Detalles de la compra</h2>
                    <table>
                        <thead>
                            <tr>
                                <th className="invoice-table-header">Insumo</th>
                                <th className="invoice-table-header">Cantidad</th>
                                <th className="invoice-table-header">Precio unitario</th>
                                <th className="invoice-table-header">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {shopsDetails.map((item, index) => (
                                <tr key={index}>
                                    <td className="invoice-table-cell">{item.supply}</td>
                                    <td className="invoice-table-cell">{item.quantity}</td>
                                    <td className="invoice-table-cell">{item.value}</td>
                                    <td className="invoice-table-cell">{item.total}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="total-td" colSpan={3}>Total</td>
                                <td className="total-tv">{shopsDetails.reduce((acc, item) => acc + item.total, 0)}</td>
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

export default Shops;