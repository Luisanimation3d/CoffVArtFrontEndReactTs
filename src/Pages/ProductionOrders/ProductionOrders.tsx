import {Column} from "../../types/Table";
import {Table} from "../../components/Table/Table.tsx";
import {Titles} from "../../components/Titles/Titles.tsx";
import {Container} from "../../components/Container/Container.tsx";
import {useState} from "react";
import {SearchInput} from "../../components/SearchInput/SearchInput.tsx";

export const ProductionOrders = () => {
    const [search, setSearch] = useState<string>('')
    const columnsProductionOrders: Column[] = [
        {
            key:'id',
            header: 'ID',
        },
        {
            key:'orderNumber',
            header:'Número de Orden',
        },
        {
            key: 'expirationDate',
            header: 'Fecha de Vencimiento',
        },
        {
            key: 'initialWeight',
            header: 'Peso Inicial',
        },
        {
            key: 'process',
            header: 'Proceso',
        },
        {
            key: 'orderState',
            header: 'Estado de la Orden',
        },
    ]

    const dataProductionOrders= [
        {
            id: 1,
            orderNumber: '1',
            expirationDate: '10-12-2023',
            initialWeight: '200 KG',
            process: 'Quitado de Carcara',
            orderState: 'En Proceso',
        },
        {
            id: 2,
            orderNumber: '2',
            expirationDate: '01-01-2024',
            initialWeight: '300 KG',
            process: 'Quitado de Carcara',
            orderState: 'Pendiente',
        },
        {
            id: 3,
            orderNumber: '3',
            expirationDate: '01-09-2023',
            initialWeight: '150 KG',
            process: 'Envio',
            orderState: 'Cancelada',
        },
    ]
    let dataProductionOrdersFiltered: any;

    if(search.length > 0){
        dataProductionOrdersFiltered = dataProductionOrders.filter(productionOrder=> productionOrder.orderNumber.toLowerCase().includes(search.toLowerCase()) 
        || productionOrder.expirationDate.toLowerCase().includes(search.toLowerCase())
        || productionOrder.initialWeight.toLowerCase().includes(search.toLowerCase())
        || productionOrder.process.toLowerCase().includes(search.toLowerCase())
        || productionOrder.orderState.toLowerCase().includes(search.toLowerCase())
        )
    }else{
        dataProductionOrdersFiltered = dataProductionOrders
    }

    return(
        <>
        <Container>
            <Titles title={'Ordenes de Producción'} level={1}/>
            <div className="productionOrders__table">
                <SearchInput label={'Buscar Ordenes'} onChange={e=> setSearch(e.target.value)} value={search} idSearch={'productionOrderSearch'} />
                <Table columns={columnsProductionOrders} data={dataProductionOrdersFiltered} onRowClick={()=> null} editableAction={{
                    onClick: () => null,
                }}
                deleteAction={{
                    onClick: () => null,
                }}
                />
            </div>
        </Container>
    </>
    )
}