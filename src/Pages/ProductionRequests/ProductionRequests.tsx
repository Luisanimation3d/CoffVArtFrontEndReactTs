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

export const ProductionRequests = () => {
    const [search, setSearch] = useState<string>('');
    const { data, loading, error, get, del } = useFetch(API_URL);
    const [dataProductionRequestsModify, setDataProductionRequestsModify] = useState<any>([])
    const navigate = useNavigate()
    useEffect(() => {
        get(`productionRequests?apikey=${API_KEY}`);
    }, []);

    const columnsProductionRequest: Column[] = [
        {
            key:'requestNumber',
            header:'Número de Solicitud',
        },
        {
            key: 'supplie',
            header: 'Insumo',
        },
        {
            key: 'quantity',
            header: 'Cantidad',
        },
        {
            key: 'company',
            header: 'Compañia',
        },
        {
            key: 'dateOfDispatch',
            header: 'Fecha de Envio',
        },
        
        {
            key: 'process',
            header: 'Proceso',
        },    
    ]
    useEffect(() => {
        if(data?.ProductionRequests?.rows){
            console.log('Entra')
            const newProductionRequestsData = data?.ProductionRequests?.rows.map((productionRequest: any) => {
                return {
                    ...productionRequest,
                    process: productionRequest?.process?.name,
                    supplie: productionRequest?.supply?.name,
                    company: productionRequest?.company?.name
                }
            })

            setDataProductionRequestsModify(newProductionRequestsData)
        }
    }, [data]);

    const dataProductionRequests = dataProductionRequestsModify || []

    //const dataProductionRequests= data?.ProductionRequests?.rows|| [];
    let dataProductionRequestsFiltered: any;

    if(search.length > 0){
        dataProductionRequestsFiltered = dataProductionRequestsModify?.productionRequests?.rows.filter((productionRequest:any )=>  
           productionRequest.requestNumber.toLowerCase().includes(search.toLowerCase()) 
        || productionRequest.dateOfDispatch.toLowerCase().includes(search.toLowerCase())
        || productionRequest.quantity
        || productionRequest.process.toLowerCase().includes(search.toLowerCase())
        )
    }else{
        dataProductionRequestsFiltered = dataProductionRequests
    }
    const handleDelete = (row: any) => {
        del(`productionRequests/${row.id}?apikey=${API_KEY}`);
        setTimeout(() => {
            get(`productionRequests?apikey=${API_KEY}`);
        }, 500);
    };

    
    return(
        <>
        <Container align={'CENTER'} justify={'TOP'}>
            <Titles title={'Solicitudes de Producción'} level={1}/>
            <div className="productionRequest__table" style={
                    {
                        width: '100%',
                    }
                }>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem',

                    }}><SearchInput label={'Buscar Solicitudes'} onChange={e=> setSearch(e.target.value)} value={search} idSearch={'productionRequestSearch'} />
                    <Button text={'Crear Solicitud'} onClick={() => navigate('/admin/ProductionRequests/create')} fill={false}/>
                    </div>
                    {
                        loading && <p>Cargando...</p>
                    }
                    {
                        error && <p>Ha ocurrido un error</p>
                    }
                    {
                        !loading && !error && dataProductionRequestsFiltered.length === 0 && <p>No hay datos</p>
                    }
                    {
                
                    !loading && !error && dataProductionRequestsFiltered.length > 0 && (
                        <Table
                        columns={columnsProductionRequest}
                        data={dataProductionRequestsFiltered}
                        onRowClick={() => null}
                        editableAction={{ onClick: (row) => navigate(`/admin/productionRequest/edit/${row.id}`) }}
                        deleteAction={{ onClick: handleDelete }}
                    />)
                    }
            </div>
        </Container>
    </>
    )
}