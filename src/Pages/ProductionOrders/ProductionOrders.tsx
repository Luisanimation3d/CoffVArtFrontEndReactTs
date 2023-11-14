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
            key:'orderNumber',
            header:'Número de Orden',
        },
        {
            key: 'quantity',
            header: 'Cantidad',
        },
        {
            key: 'process',
            header: 'Proceso',
        },
    ]

    const dataProductionOrders= [
        {
            id: 1,
            orderNumber: '1',
            quantity: 200,
            process: 'Desgacificacion',
        },
        {
            id: 2,
            orderNumber: '2',
            quantity: 200,
            process: 'Desgacificacion',
        },
        {
            id: 3,
            orderNumber: '3',
            quantity: 200,
            process: 'Finalizado',
        },
    ]
    let dataProductionOrdersFiltered: any;

    if(search.length > 0){
        dataProductionOrdersFiltered = dataProductionOrders.filter(productionOrder=> productionOrder.orderNumber.toLowerCase().includes(search.toLowerCase()) 
        || productionOrder.quantity
        || productionOrder.process.toLowerCase().includes(search.toLowerCase())
        )
    }else{
        dataProductionOrdersFiltered = dataProductionOrders
    }

    return(
        <>
        <Container>
            <Titles title={'Ordenes de Producción'} level={1}/>
            <div className="productionOrders__table">
                <SearchInput 
                label={'Buscar Ordenes'} 
                onChange={e=> setSearch(e.target.value)} 
                value={search} 
                idSearch={'productionOrderSearch'} />
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