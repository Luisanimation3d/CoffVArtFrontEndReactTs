import { Column } from "../../types/Table";
import { Table } from "../../components/Table/Table";
import { Titles } from "../../components/Titles/Titles";
import { Container } from "../../components/Container/Container";
import { useState, useEffect } from "react";
import { SearchInput } from "../../components/SearchInput/SearchInput";
import { Button } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { API_KEY } from "../../constantes";

export const Coustomers = () => {
    const [search, setSearch] = useState<string>('');
    const { data, loading, error, get, del } = useFetch('https://coffvart-backend.onrender.com/api/');
    const navigate = useNavigate();

    useEffect(() => {
        get(`coustumers?apikey=${API_KEY}`);
    }, []);

    const columnsCoustumers: Column[] = [
        { key: 'id', header: 'ID' },
        { key: 'name', header: 'Nombre' },
        { key: 'documentType', header: 'Tipo de documento' },
        { key: 'document', header: 'Documento' },
        { key: 'phone', header: 'Telefono' },
        { key: 'email', header: 'Email' },
        { key: 'address', header: 'Dirección' },
        { key: 'state', header: 'Estado' }
    ];
    
    const dataCoustumers = data?.coustumers?.rows || [];
    let dataCoustumersFiltered: any[];
    

    if (search.length > 0) {
        dataCoustumersFiltered = dataCoustumers.filter((coustumer: any) =>
            coustumer.name.toLowerCase().includes(search.toLowerCase()) ||
            coustumer.document.toString().includes(search)
        );
    } else {
        dataCoustumersFiltered = dataCoustumers;
    }

    const handleDelete = (row: any) => {
        del(`coustumers/${row.id}?apikey=${API_KEY}`);
        setTimeout(() => {
            get(`coustumers?apikey=${API_KEY}`);
        }, 500);
    };

    return (
        <>
            <Container align={'CENTER'} justify={'TOP'}>
                <Titles title={'Clientes'} level={1} />
                <div className="roles__table" style={
                    {
                        width: '100%',
                    }
                }>
                        <div style={{
                            display: 'flex',
                            justifyContent:'space-between',
                            alignItems: 'center',
                            marginBottom: '1rem',
                        }}>
                    <SearchInput label={'Buscar clientes'} onChange={(e) => setSearch(e.target.value)} value={search} idSearch={'CoustomerSearch'} />

                    <Button text={'Crear cliente'} onClick={() => navigate('/admin/Coustomer/create')} fill={false} />
                    </div>
                    
                    {
                        loading && <p>Cargando...</p>
                    }
                    {
                        error && <p>Ha ocurrido un error</p>
                    }
                    {
                        !loading && !error && dataCoustumersFiltered.length === 0 && <p>No hay datos</p>
                    }
                    {
                        !loading && !error && dataCoustumersFiltered.length > 0 && (
                    <Table
                        columns={columnsCoustumers}
                        data={dataCoustumersFiltered}
                        onRowClick={() => null}
                        editableAction={{ onClick: () => null }}
                        deleteAction={{ onClick: handleDelete }}
                    />)
                    }
                </div>
            </Container>
        </>
    );
};
