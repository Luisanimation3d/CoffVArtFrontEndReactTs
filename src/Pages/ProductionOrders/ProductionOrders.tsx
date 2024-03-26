import {Column} from "../../types/Table";
import {Table} from "../../components/Table/Table.tsx";
//import {Titles} from "../../components/Titles/Titles.tsx";
import {Container} from "../../components/Container/Container.tsx";
import {useEffect, useState} from "react";
//import {SearchInput} from "../../components/SearchInput/SearchInput.tsx";
import { useNavigate } from "react-router-dom";
//import { Button } from "../../components/Button/Button.tsx";
import { useFetch } from "../../hooks/useFetch.tsx";
import { API_KEY, API_URL } from "../../utils/constantes.ts";
import { Modal, ModalContainer } from "../../components/Modal/Modal.tsx";
import { createPortal } from "react-dom";
import { EditProcessOModal } from "../../Modales/EditProcessModal/EditProcessOModal.tsx";
import { ProductionOrderCreateModal } from "../../Modales/CreateProductionOderModal/CreateProductionOrderModal.tsx";
import {TableRedisign} from "../../components/TableRedisign/TableRedisign.tsx";
import {FiShuffle} from "react-icons/fi";

export const ProductionOrders = () => {
    const [search, setSearch] = useState<string>('');
    const [orderToCreate, setOrderToCreate] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const [page, setPage] = useState<number>(1)
    const { data, loading, get } = useFetch(API_URL);
    const [dataProductionOrdersModify, setDataProductionOrdersModify] = useState<any>([])
    const navigate = useNavigate()
    useEffect(() => {

        get(`productionOrders?apikey=${API_KEY}&page=${page}`);
    }, [page]);
    const columnsProductionOrders: Column[] = [
        {
            key:'id',
            header:'Número de Orden',
        },
        {
            key: 'supplie',
            header: 'Insumo'
        },
        {
            key: 'quantity',
            header: 'Cantidad',
            render: (cell: string | number) => {
                if (cell !== null) {
                    return cell.toLocaleString('es-CO', {
                        minimumFractionDigits: 0,
                    }) + ` gr`;
                } else {
                    return '0';
                }
            }
        },
        {
            key: 'state',
            header: 'Proceso',
        },
    ];

    useEffect(() => {
        if(data?.productionOrders?.rows){
            console.log('Entra')
            const newProductionOrdersData = data?.productionOrders?.rows.map((productionOrder: any) => {
                return {
                    ...productionOrder,
                    id: productionOrder.id,
                    state: productionOrder?.process?.name,
                    supplie: productionOrder?.supply?.name,
                    quantity: productionOrder?.quantity,
                    productionRId: productionOrder?.productionRequest?.requestNumber
                }
            })

            setDataProductionOrdersModify(newProductionOrdersData)
        }
    }, [data]);
    const [idEdit, setidEdit]= useState(0)

    const dataProductionOrders= dataProductionOrdersModify|| [];
    let dataProductionOrdersFiltered: any[];

    if(search.length > 0){
        dataProductionOrdersFiltered = dataProductionOrders.filter((productionOrder:any )=> 
         productionOrder.supplie.toLowerCase().includes(search.toLowerCase())
        || productionOrder.quantity.toString().includes(search.toLowerCase())
        || productionOrder.state.toLowerCase().includes(search.toLowerCase())
        )
    }else{
        dataProductionOrdersFiltered = dataProductionOrders
    }
    useEffect(() => {
        if (!isModalOpenEdit) {
          get(`productionOrders?apikey=${API_KEY}`);
        }
      }, [isModalOpenEdit]);
    const handleCallback = (row: {[key : string] : string | number}, type: string | number) => {
        
        if(type === 'Cambiar proceso'){
            setidEdit(row.id as number)
            setIsModalOpenEdit(true)
        }
    }
    const options = [
        /*{
            label: 'Cambiar estado',
            icon: <FiShuffle/>
        },*/
        {
            label: 'Cambiar proceso',
            icon: <FiShuffle/>
        }
    ]

    const [productionOrdersDetails, setProductionOrdersDetails] = useState<any[]>([]);

    const getProductionOrdersDetails = (productionOrder: any) => {
        console.log(productionOrder, "esta es la compra");
        const productionOrdersDetails= productionOrder?.productionOrdersDetails?.map((productionOrdersDetail: any) => ({
            id: productionOrdersDetail.id,
            productionOrderId: productionOrdersDetail.productionOrderId,
            supplie: productionOrdersDetail.supplie.name,
            quantity: productionOrdersDetail.quantity,
            value: productionOrdersDetail.value,
            total: productionOrdersDetail.quantity*productionOrdersDetail.value,
        }));
        setProductionOrdersDetails(productionOrdersDetails);
        setIsModalOpen(true);
    };

    return(
        <>
        <Container align={'CENTER'} justify={'TOP'}>
        <TableRedisign
                    columns={columnsProductionOrders}
                    data={dataProductionOrdersFiltered}
                    search={search}
                    setSearch={setSearch}
                    title={'Ordenes de Producción'}
                    page={page || 1}
                    setPage={setPage}
                    totalPages={Math.ceil(data?.productionOrders?.count / data?.options?.limit) || 1}
                    pagination={true}
                    createAction={() => navigate('/admin/ProductionOrders/create')}
                    loading={loading}
                    callback={handleCallback}
                    dropDownOptions={options}
                />
            {
                    isModalOpenEdit && createPortal(
                        <>
                            
                                <EditProcessOModal
                            id= {idEdit}
                            setIsModalOpen={setIsModalOpenEdit}
                            title="Cambiar proceso"/>
                        </>,
                        document.getElementById('modal') as HTMLElement
                    )
                }
                {
                    orderToCreate  && createPortal(
                        <> 
                            <ProductionOrderCreateModal 
                            setIsModalOpen={setOrderToCreate}
                             title="Crear Orden" />
                        </>,
                        document.getElementById('modal') as HTMLElement
                    )
                }
        </Container>
        {
                isModalOpen && createPortal(
                    <ModalContainer ShowModal={setIsModalOpen}>
                        <Modal
                            title="Detalle de la Orden"
                            showModal={setIsModalOpen}
                        >
                            <Table
                                columns={[
                                    {
                                        key: "suppie",
                                        header: "Insumo",
                                    },
                                    {
                                        key: "quantity",
                                        header: "Cantidad",
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
                                data={productionOrdersDetails}
                                onRowClick={() => null}
                            />
                        </Modal>
                    </ModalContainer>,
                    document.getElementById("modal") as HTMLElement)
            }
    </>
    )
}

export default ProductionOrders;