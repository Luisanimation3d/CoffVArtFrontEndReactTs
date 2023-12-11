import {Column} from "../../types/Table";
import {Table} from "../../components/Table/Table.tsx";
import {Titles} from "../../components/Titles/Titles.tsx";
import {Container} from "../../components/Container/Container.tsx";
import {useEffect, useState} from "react";
import {SearchInput} from "../../components/SearchInput/SearchInput.tsx";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button.tsx";
import { useFetch } from "../../hooks/useFetch.tsx";
import { API_KEY, API_URL } from "../../constantes.ts";
import { Modal, ModalContainer } from "../../components/Modal/Modal.tsx";
import { createPortal } from "react-dom";
import { EditProcessOModal } from "../../Modales/EditProcessModal/EditProcessOModal.tsx";
import { ProductionOrderCreateModal } from "../../Modales/CreateProductionOderModal/CreateProductionOrderModal.tsx";

export const ProductionOrders = () => {
    const [search, setSearch] = useState<string>('');
    const [orderToCreate, setOrderToCreate] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const { data, loading, error, get, del } = useFetch(API_URL);
    const [dataProductionOrdersModify, setDataProductionOrdersModify] = useState<any>([])
    const navigate = useNavigate()
    useEffect(() => {
        get(`productionOrders?apikey=${API_KEY}`);
    }, []);

    const openEditModal = (id: number) => {
        setidEdit(id);
        setIsModalOpenEdit(true);
    };
    const columnsProductionOrders: Column[] = [
        {
            key:'orderNumber',
            header:'Número de Orden',
        },
        {
            key: 'quantity',
            header: 'Cantidad',
        },
        {
            key: 'processId',
            header: 'Proceso',
        },
        {
            key: 'supplieId',
            header: 'Insumo'
        }
    ];

    useEffect(() => {
        if(data?.ProductionOrders?.rows){
            console.log('Entra')
            const newProductionOrdersData = data?.ProductionOrders?.rows.map((productionOrder: any) => {
                return {
                    ...productionOrder,
                    process: productionOrder?.process?.name,
                    supplie: productionOrder?.supply?.name,
                }
            })

            setDataProductionOrdersModify(newProductionOrdersData)
        }
    }, [data]);
    const [idEdit, setidEdit]= useState(0)

    const dataProductionOrders= dataProductionOrdersModify|| [];
    let dataProductionOrdersFiltered: any;

    if(search.length > 0){
        dataProductionOrdersFiltered = dataProductionOrders.filter((productionOrder:any )=> 
        productionOrder.orderNumber.toLowerCase().includes(search.toLowerCase()) 
        || productionOrder.quantity
        || productionOrder.process.toLowerCase().includes(search.toLowerCase())
        )
    }else{
        dataProductionOrdersFiltered = dataProductionOrders
    }
    const handleDelete = (row: any) => {
        del(`productionOrders/${row.id}?apikey=${API_KEY}`);
        setTimeout(() => {
            get(`productionOrders?apikey=${API_KEY}`);
        }, 500);
    };

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
            <Titles title={'Ordenes de Producción'} level={1}/>
            
            <div className="productionOrders__table" style={
                    {
                        width: '100%',
                    }
                }>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem',

                    }}><SearchInput 
                label={'Buscar Ordenes'} 
                onChange={e=> setSearch(e.target.value)} 
                value={search} 
                idSearch={'productionOrderSearch'} />
                <Button text={'Crear Orden'} onClick={() => setOrderToCreate(true)} fill={false}/></div>
                {
                        loading && <p>Cargando...</p>
                    }
                    {
                        error && <p>Ha ocurrido un error</p>
                    }
                    {
                        !loading && !error && dataProductionOrdersFiltered.length === 0 && <p>No hay datos</p>
                    }
                    {
                        !loading && !error && dataProductionOrdersFiltered.length > 0 && (
                    <Table
                        columns={columnsProductionOrders}
                        data={dataProductionOrdersFiltered}
                        onRowClick={getProductionOrdersDetails}
                        editableAction={{ onClick: (e) => {
                            setidEdit(e.id)
                            setIsModalOpenEdit(true)
                        }  }}
                        deleteAction={{ onClick: handleDelete }}
                    />)
                    }
            </div>
            {
                    isModalOpen && createPortal(
                        <><ProductionOrderCreateModal orderToCreate={setOrderToCreate} title="Crear Orden" />
                               
                               <EditProcessOModal
                            id= {idEdit}
                            setIsModalOpen={setIsModalOpenEdit}
                            title="Cambiar proceso"/>
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