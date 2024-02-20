import { Column } from "../../types/Table";
import { Container } from "../../components/Container/Container";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { API_KEY, API_URL } from "../../constantes";
import { CreateUserModal } from "../../Modales/CreateUserModal/CreateUserModal";
import { createPortal } from "react-dom";
import {EditUsersModal} from "../../Modales/EditUsersModal/EditUsersModal.tsx";
import {TableRedisign} from "../../components/TableRedisign/TableRedisign.tsx";
import {FiShuffle} from "react-icons/fi";

export const Coustomers = () => {
    const [search, setSearch] = useState<string>('');
    const [userToEdit, setUserToEdit] = useState<number|null>(null)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const { data, loading, error, get, del } = useFetch(API_URL);
    const navigate = useNavigate();

    const [page, setPage] = useState<number>(1)
    useEffect(() => {
        get(`coustumers?apikey=${API_KEY}&page=${page}`)
    }, [page]);


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

    const handleCallback = (row: {[key : string] : string | number}, type: string | number) => {
        console.log(type)
        if(type === 'Cambiar estado'){
            del(`coustumers/${row.id}?apikey=${API_KEY}`);
            setTimeout(() => {
                get(`coustumers?apikey=${API_KEY}`);
            }, 500);
        }else if(type === 'Editar'){
            navigate(`/admin/Coustomer/edit/${row.id}`)
        }
    }

    const options = [
        {
            label: 'Cambiar estado',
            icon: <FiShuffle/>
        },
        {
            label: 'Editar',
            icon: <FiShuffle/>
        }
    ]

    useEffect(() => {
        if(userToEdit == null){
            get(`coustumers?apikey=${API_KEY}`)
        }
    }, [userToEdit]);

    return (
        <>
            <Container align={'CENTER'} justify={'TOP'}>
                <TableRedisign
                    columns={columnsCoustumers}
                    data={dataCoustumersFiltered}
                    search={search}
                    setSearch={setSearch}
                    title={'Clientes'}
                    createAction={() => navigate('/admin/coustomers/create')}
                    page={page || 1}
                    setPage={setPage}
                    totalPages={Math.ceil(data?.coustumers?.count / data?.options?.limit) || 1}
                    pagination={true}
                    loading={loading}
                    callback={handleCallback}
                    dropDownOptions={options}
                    
                />
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