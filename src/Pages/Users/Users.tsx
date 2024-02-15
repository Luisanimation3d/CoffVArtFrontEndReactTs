import {useEffect, useState} from "react";
import {useFetch} from "../../hooks/useFetch.tsx";
import {API_KEY, API_URL} from "../../constantes.ts";
import {Column} from "../../types/Table";
import {Container} from "../../components/Container/Container.tsx";
import {createPortal} from "react-dom";
import {CreateUserModal} from "../../Modales/CreateUserModal/CreateUserModal.tsx";
import {EditUsersModal} from "../../Modales/EditUsersModal/EditUsersModal.tsx";
import {TableRedisign} from "../../components/TableRedisign/TableRedisign.tsx";
import {FiShuffle} from "react-icons/fi";
import {useNavigate} from "react-router-dom";

export default function User() {
    const [search, setSearch] = useState<string>('')
    const [userToEdit, setUserToEdit] = useState<number | null>(null)
    // const {data, loading, error, get} = useFetch(API_URL)
    // const {data: dataRoles, loading: loadingRoles, error: errorRoles, get: getRoles} = useFetch(API_URL)
    const {data, loading, get, del} = useFetch(API_URL)
    const [dataUsersModify, setDataUsersModify] = useState<{[key: string]: string | number}[]>([])
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)

    const navigate = useNavigate()

    useEffect(() => {
        get(`users?apikey=${API_KEY}&page=${page}`)
    }, [page]);

    const columnsUsers: Column[] = [
        {
            key: 'id',
            header: 'ID',
        },
        {
            key: 'name',
            header: 'Nombre',
        },
        {
            key: 'lastname',
            header: 'Apellido',
        },
        {
            key: 'phone',
            header: 'Teléfono',
        },
        {
            key: 'email',
            header: 'Email',
        },
        {
            key: 'rol',
            header: 'Rol',
        },
        {
            key: 'state',
            header: 'Estado',
        }
    ]

    const handleDelete = (row: unknown) => {
        del(`users/${row}?apikey=${API_KEY}`)
        setTimeout(() => {
            get(`users?apikey=${API_KEY}`)
        }, 500)
    }

    useEffect(() => {
        if (data?.users?.rows) {
            const newUsersData = data?.users?.rows.map((user: any) => {
                return {
                    ...user,
                    rol: user?.role?.name
                }
            })

            setDataUsersModify(newUsersData)
        }
    }, [data]);

    const dataUsers = dataUsersModify || []

    let dataUsersFiltered: any[];


    if (search !== '') {
        dataUsersFiltered = dataUsersModify?.filter((user: any) => user.name?.toLowerCase().includes(search.toLowerCase()) || user.lastname?.toLowerCase().includes(search.toLowerCase()) || user.address?.toLowerCase().includes(search.toLowerCase()) || user.phone?.toLowerCase().includes(search.toLowerCase()) || user.email?.toLowerCase().includes(search.toLowerCase()) || user.rol?.toLowerCase().includes(search.toLowerCase()))
    } else {
        dataUsersFiltered = dataUsers
    }

    const handleCallback = (user: {[key: string]: string | number}, type: string) => {
        if (type === 'Cambiar estado') {
            handleDelete(user?.id)
        }
    }

    const options = [
        {
            label: 'Cambiar estado',
            icon: <FiShuffle/>
        }
    ]

    console.log(data, 'data')

    useEffect(() => {
        if (userToEdit == null) {
            get(`users?apikey=${API_KEY}`)
        }
    }, [userToEdit]);

    return (
        <>
            <Container align={'center'} justify={'TOP'}>
               <TableRedisign
                   columns={columnsUsers}
                   data={dataUsersFiltered}
                   search={search}
                   setSearch={setSearch}
                   title={'Usuarios'}
                   page={page || 1}
                   setPage={setPage}
                   totalPages={Math.ceil(data?.users?.count / data?.options?.limit) || 1}
                   pagination={true}
                   dropDownOptions={options}
                   callback={handleCallback}
                   loading={loading}
                   onRowClick={row => alert(row.name)}
                   createAction={() => navigate('/admin/users/create')}
               />
                {
                    isModalOpen && createPortal(
                        <>
                            {
                                userToEdit ? (
                                    <EditUsersModal setIsModalOpen={setIsModalOpen} idUser={userToEdit}
                                                    setIdEdit={setUserToEdit}/>
                                ) : (
                                    <CreateUserModal setIsModalOpen={setIsModalOpen}/>
                                )
                            }
                        </>,
                        document.getElementById('modal') as HTMLElement
                    )
                }
            </Container>
        </>
    )
}