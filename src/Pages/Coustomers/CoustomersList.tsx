import {Column} from "../../types/Table";
import {Table} from "../../components/Table/Table.tsx";
import {Titles} from "../../components/Titles/Titles.tsx";
import {Container} from "../../components/Container/Container.tsx";
import {useState} from "react";
import {SearchInput} from "../../components/SearchInput/SearchInput.tsx";
import { Button } from "../../components/Button/Button.tsx";
import {useNavigate} from "react-router-dom";

export const Coustomers = () => {
    const [search, setSearch] = useState<string>('')
    const navigate = useNavigate()
    const columnsCoustumers: Column[] = [
        {
            key: 'id',
            header: 'ID',
        },
        {
            key: 'nombre',
            header: 'Nombre',
        },
        {
            key: 'Tipodedocumento',
            header: 'Tipo de documento',
        },
        {
            key: 'documento',
            header: 'Documento', 
        },
        {
            key: 'telefono',
            header: 'Telefono',
        },
        {
            key: 'email',
            header: 'Email', 
        },
        {
            key: 'direccion',
            header: 'Dirección', 
        },
        {
            key: 'estado',
            header: 'Estado', 
        }
    ]

    const dataCoustomers = [
        {
            id: 1, nombre: 'John Doe', Tipodedocumento: "CC", documento: 30,  telefono: 30, email: 30, direccion: "calle20", estado: "true"
        },
        {
            id: 2, nombre: 'Mateo Doe', Tipodedocumento: "CC", documento: 30,  telefono: 30, email: 30, direccion: "calle20", estado: "false"
        },
    ]

    let dataCoustomersFiltered: any;

    if(search.length > 0){
        dataCoustomersFiltered = dataCoustomers.filter(coustomer => coustomer.nombre.toLowerCase().includes(search.toLowerCase()) || coustomer.estado.toLowerCase().includes(search.toLowerCase()))
    }else{
        dataCoustomersFiltered = dataCoustomers
    }

    return (
        <>
            <Container>
                <Titles title={'Clientes'} level={1}/>
                <div className="roles__table">
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem',
                    }}>
                    <Button text={'Crear cliente'} onClick={()=> navigate('/admin/Coustomer/create')} fill= {false} />
                    </div>                    
                    <SearchInput label={'Buscar clientes'} onChange={e=> setSearch(e.target.value)} value={search} idSearch={'CoustomerSearch'} />
                    <Table columns={columnsCoustumers} data={dataCoustomersFiltered} onRowClick={()=> null} editableAction={{
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