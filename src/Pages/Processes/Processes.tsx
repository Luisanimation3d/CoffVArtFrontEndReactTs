import {Column} from "../../types/Table";
import {Table} from "../../components/Table/Table.tsx";
import {Titles} from "../../components/Titles/Titles.tsx";
import {Container} from "../../components/Container/Container.tsx";
import {useEffect, useState} from "react";
import {SearchInput} from "../../components/SearchInput/SearchInput.tsx";
//import {useNavigate} from "react-router-dom";
import { API_KEY } from "../../utils/constantes.ts";
import { useFetch } from "../../hooks/useFetch.tsx";

export const Processes = () => {
    const [search, setSearch] = useState<string>('');
    const {data,loading,error,get,del} = useFetch('https://coffvart-backend.onrender.com/api/')

//    const navigate = useNavigate();

    useEffect(()=>{
        get(`processes?apikey=${API_KEY}`);
    },[]);
    
    const columnsProcesses: Column[] = [
        {
            key:'id',
            header: 'ID',
        },
        {
            key:'name',
            header:'Nombre',
        },
        {
            key: 'description',
            header: 'Descripción',
        }
    ]

    const dataProcesses = data?.processes?.rows || [];
    let dataProcessesFiltered: any[];

    if(search.length > 0){
        dataProcessesFiltered = dataProcesses.filter((process:any) =>
           process.name.toLowerCase().includes(search.toLowerCase()) 
        || process.description.toLowerCase().includes(search.toLowerCase())
        );
    }else{
        dataProcessesFiltered = dataProcesses
    }
    
    const handleDelete = (row: any) => {
        del(`processes/${row.id}?apikey=${API_KEY}`);
        setTimeout(() => {
            get(`processes?apikey=${API_KEY}`);
        }, 500);
    };
    return(
        <>
        <Container align={'CENTER'} justify={'TOP'}>
            <Titles title={'Procesos'} level={1}/>
            <div className="processes__table" style={
                    {
                        width: '100%',
                    }
                }>
            <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem',

                    }}>
                        <SearchInput label={'Buscar Procesos'} onChange={e=> setSearch(e.target.value)} value={search} idSearch={'processSearch'} />
                    </div>
                    
                    {
                        loading && <p>Cargando...</p>
                    }
                    {
                        error && <p>Ha ocurrido un error</p>
                    }
                    {
                        !loading && !error && dataProcessesFiltered.length === 0 && <p>No hay datos</p>
                    }
                    {
                        !loading && !error && dataProcessesFiltered.length > 0 && (
                
                <Table columns={columnsProcesses}
                    data={dataProcessesFiltered}
                    onRowClick={()=> null}
                    
                deleteAction={{
                    onClick: () => handleDelete,
                }}
                />)
                 }
            </div>
        </Container>
    </>
    )
}

export default Processes;