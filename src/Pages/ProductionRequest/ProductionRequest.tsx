import {Column} from "../../types/Table";
import {Table} from "../../components/Table/Table.tsx";
import {Titles} from "../../components/Titles/Titles.tsx";
import {Container} from "../../components/Container/Container.tsx";
import {useState} from "react";
import {SearchInput} from "../../components/SearchInput/SearchInput.tsx";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button.tsx";

export const ProductionRequest = () => {
    const [search, setSearch] = useState<string>('')
    const navigate = useNavigate()
    const columnsProductionRequest: Column[] = [
        {
            key:'orderNumber',
            header:'Número de Orden',
        },
        {
            key: 'dateOfDispatch',
            header: 'Fecha de Envio',
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

    const dataProductionRequest= [
        {
            id: 1,
            orderNumber: '1',
            dateOfDispatch: '10-12-2023',
            quantity: 200,
            process: 'Enviado',
        },
        {
            id: 2,
            orderNumber: '2',
            dateOfDispatch: '10-02-2023',
            quantity: 100,
            process: 'En proceso',
        },
        {
            id: 3,
            orderNumber: '3',
            dateOfDispatch: '10-12-2023',
            quantity: 200,
            process: 'Tostado',
        },
    ]
    let dataProductionRequestFiltered: any;

    if(search.length > 0){
        dataProductionRequestFiltered = dataProductionRequest.filter(productionOrder=> productionOrder.orderNumber.toLowerCase().includes(search.toLowerCase()) 
        || productionOrder.dateOfDispatch.toLowerCase().includes(search.toLowerCase())
        || productionOrder.quantity
        || productionOrder.process.toLowerCase().includes(search.toLowerCase())
        )
    }else{
        dataProductionRequestFiltered = dataProductionRequest
    }

    return(
        <>
        <Container>
            <Titles title={'Solicitudes de Producción'} level={1}/>
            <div className="productionRequest__table">
            <Button text={'Crear Solicitud'} onClick={() => navigate('/admin/ProductionRequest/create')} fill={false}/>
                <SearchInput label={'Buscar Solicitudes'} onChange={e=> setSearch(e.target.value)} value={search} idSearch={'productionRequestearch'} />
                <Table columns={columnsProductionRequest} data={dataProductionRequestFiltered} onRowClick={()=> null} editableAction={{
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