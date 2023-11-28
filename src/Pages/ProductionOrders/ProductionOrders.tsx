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

export const ProductionOrders = () => {
    const [search, setSearch] = useState<string>('');
    const { data, loading, error, get, del } = useFetch('https://coffvart-backend.onrender.com/api/');
    const navigate = useNavigate()
    useEffect(() => {
        get(`productionOrders?apikey=${API_KEY}`);
    }, []);
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

    const dataProductionOrders= data?.productionOrders?.rows|| [];
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
                <Button text={'Crear Orden'} onClick={() => navigate('/admin/ProductionOrders/create')} fill={false}/></div>
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
                        onRowClick={() => null}
                        editableAction={{ onClick: (row) => navigate(`/admin/productionOrder/edit/${row.id}`) }}
                        deleteAction={{ onClick: handleDelete }}
                    />)
                    }
            </div>
        </Container>
    </>
    )
}