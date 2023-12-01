import {Column} from "../../types/Table";
import {Table} from "../../components/Table/Table.tsx";
import {Titles} from "../../components/Titles/Titles.tsx";
import {Container} from "../../components/Container/Container.tsx";
import {useEffect, useState} from "react";
import {SearchInput} from "../../components/SearchInput/SearchInput.tsx";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button.tsx";
import { useFetch } from "../../hooks/useFetch.tsx";
import { API_KEY } from "../../constantes.ts";

export const ProductionRequest = () => {
    const [search, setSearch] = useState<string>('');
    const { data, loading, error, get, del } = useFetch('https://coffvart-backend.onrender.com/api/');
    const navigate = useNavigate()
    useEffect(() => {
        get(`productionRequests?apikey=${API_KEY}`);
    }, []);
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

    const dataProductionRequest= data?.productionRequests?.rows|| [];
    let dataProductionRequestFiltered: any;

    if(search.length > 0){
        dataProductionRequestFiltered = dataProductionRequest.filter((productionRequest:any )=>  
           productionRequest.orderNumber.toLowerCase().includes(search.toLowerCase()) 
        || productionRequest.dateOfDispatch.toLowerCase().includes(search.toLowerCase())
        || productionRequest.quantity
        || productionRequest.process.toLowerCase().includes(search.toLowerCase())
        )
    }else{
        dataProductionRequestFiltered = dataProductionRequest
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

                    }}><SearchInput label={'Buscar Solicitudes'} onChange={e=> setSearch(e.target.value)} value={search} idSearch={'productionRequestearch'} />
                    <Button text={'Crear Solicitud'} onClick={() => navigate('/admin/ProductionRequest/create')} fill={false}/>
                    </div>
                    {
                        loading && <p>Cargando...</p>
                    }
                    {
                        error && <p>Ha ocurrido un error</p>
                    }
                    {
                        !loading && !error && dataProductionRequestFiltered.length === 0 && <p>No hay datos</p>
                    }
                    {
                
                    !loading && !error && dataProductionRequestFiltered.length > 0 && (
                        <Table
                        columns={columnsProductionRequest}
                        data={dataProductionRequestFiltered}
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