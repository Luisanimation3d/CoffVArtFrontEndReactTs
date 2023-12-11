import { Column } from "../../types/Table";
import { Table } from "../../components/Table/Table";
import { Titles } from "../../components/Titles/Titles";
import { Container } from "../../components/Container/Container";
import { useState, useEffect } from "react";
import { SearchInput } from "../../components/SearchInput/SearchInput";
import { Button } from "../../components/Button/Button";
import { CreateSupplyModal } from "../../Modales/CreateSupplyModal/CreateSupplyModal";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { API_KEY } from "../../constantes";

export const Supplies = () => {
    const [search, setSearch] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const { data, loading, error, get, del } = useFetch('https://coffvart-backend.onrender.com/api/');
    const navigate = useNavigate();

    useEffect(() => {
        get(`supplies?apikey=${API_KEY}`);
    }, []);

    const columnsSupplies: Column[] = [
        { key: 'id', header: 'ID' },
        { key: 'name', header: 'Nombre' },
        { key: 'amount', header: 'Cantidad' },
        { key: 'unitPrice', header: 'Precio Únitario' },
        { key: 'description', header: 'Descripción' },
        { key: 'state', header: 'Estado' }
    ];
    
    const dataSupplies = data?.supplies?.rows || [];
    let dataSuppliesFiltered: any[];
    

    if (search.length > 0) {
        dataSuppliesFiltered = dataSupplies.filter((supply: any) =>
            supply.name.toLowerCase().includes(search.toLowerCase()) ||
            supply.unitPrice.toString().includes(search)
        );
    } else {
        dataSuppliesFiltered = dataSupplies;
    }


    const handleDelete = (row: any) => {
        del(`supplies/${row.id}?apikey=${API_KEY}`);
        setTimeout(() => {
            get(`supplies?apikey=${API_KEY}`);
        }, 500);
    };

    return (
        <>
            <Container align={'CENTER'} justify={'TOP'}>
                <Titles title={'Insumos'} level={1} />
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
                    <SearchInput label={'Buscar Insumo'} onChange={(e) => setSearch(e.target.value)} value={search} idSearch={'SuppliesSearch'} />

                    <Button text={'Crear Insumo'} onClick={() => setIsModalOpen(true)} fill={false}/>
                    </div>
                    
                    {
                        loading && <p>Cargando...</p>
                    }
                    {
                        error && <p>Ha ocurrido un error</p>
                    }
                    {
                        !loading && !error && dataSuppliesFiltered.length === 0 && <p>No hay datos</p>
                    }
                    {
                        !loading && !error && dataSuppliesFiltered.length > 0 && (
                    <Table
                        columns={columnsSupplies}
                        data={dataSuppliesFiltered}
                        onRowClick={() => null}
                        editableAction={{ onClick: () => null }}
                        deleteAction={{ onClick: handleDelete }}
                        nombreArchivo={'Insumos Reporte'}
                        tituloDocumento={'Insumos Reporte'}
                    />)
                    }
                </div>
                {
                    isModalOpen && createPortal(
                        <>
                            <CreateSupplyModal setIsModalOpen={setIsModalOpen} title="Crear Insumo"/>
                        </>,
                        document.getElementById('modal') as HTMLElement
                    )
                }
            </Container>
        </>
    );
};

export default Supplies;