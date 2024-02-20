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


export const Shops = () => {
    const [search, setSearch] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    



    const dataShops = data?.shops?.rows || [];
    let dataShopsFiltered: any;

    if (search.length > 0) {
        dataShopsFiltered = dataShops.filter((shops: any) =>
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
                    search={search}
                    setSearch={setSearch}
                    title={'Compras'}
                    createAction={() => navigate('/admin/shops/create')}
                    page={page || 1}
                    setPage={setPage}
                    totalPages={Math.ceil(data?.coustumers?.count / data?.options?.limit) || 1}
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
                            title={`Detalle de Compra # ${shopsDetails[0]?.invoice}`}
                            showModal={setIsModalOpen}
                        >
                            <Table
                                columns={[
                                    {
                                        key: "invoice",
                                        header: "Factura",
                                    },
                                    {
                                        key: "supply",
                                        header: "Insumo",
                                    },
                                    {
                                        key: "quantity",
                                        header: "Cantidad (Kg)",
                                    },
                                    {
                                        key: "value",
                                        header: "Valor Unitario",
                                    },
                                    {
                                        key: "total",
                                        header: "Total",
                                    },
                                ]}
                                data={shopsDetails}
                                onRowClick={() => null}
                            />
                        </Modal>
                    </ModalContainer>,
                    document.getElementById("modal") as HTMLElement)
            }
        </>
    );
};

export default Shops;