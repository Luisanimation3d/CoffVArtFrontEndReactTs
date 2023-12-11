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
import { CreateUserModal } from "../../Modales/CreateUserModal/CreateUserModal";
import { createPortal } from "react-dom";
import {EditUsersModal} from "../../Modales/EditUsersModal/EditUsersModal.tsx";

export const Coustomers = () => {
    const [search, setSearch] = useState<string>('');
    const [userToEdit, setUserToEdit] = useState<number|null>(null)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
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
        { key: 'phone', header: 'Teléfono' },
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

    useEffect(() => {
        if(userToEdit == null){
            get(`coustumers?apikey=${API_KEY}`)
        }
    }, [userToEdit]);

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
                    <Button text={'Crear Cliente'} onClick={() => setIsModalOpen(true)} fill={false}/>
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
                        deleteAction={{ onClick: handleDelete }}
                        editableAction={{
                            label: 'Editar Cliente',
                            onClick: (row: any) => {
                                setUserToEdit(row.id)
                                setIsModalOpen(true)
                            },
                        }}
                    />)
                    }
                </div>
                {
                    isModalOpen && createPortal(
                        <>
                            {
                                userToEdit ? (
                                    <EditUsersModal setIsModalOpen={setIsModalOpen} idUser={userToEdit} setIdEdit={setUserToEdit} title={'Editar Cliente'}/>
                                ):(
                                    <CreateUserModal setIsModalOpen={setIsModalOpen} title={'Crear Cliente'}/>
                                )
                            }
                        </>,
                        document.getElementById('modal') as HTMLElement
                    )
                }
            </Container>
        </>
    );
};

export default Coustomers;