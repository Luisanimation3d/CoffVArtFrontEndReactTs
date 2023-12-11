import {useEffect, useState} from "react";
import {useFetch} from "../../hooks/useFetch.tsx";
import {useNavigate} from "react-router-dom";
import {API_KEY, API_URL} from "../../constantes.ts";
import {Column} from "../../types/Table";
import {Container} from "../../components/Container/Container.tsx";
import {Titles} from "../../components/Titles/Titles.tsx";
import {SearchInput} from "../../components/SearchInput/SearchInput.tsx";
import {Button} from "../../components/Button/Button.tsx";
import styles from './Users.module.css';
import {Table} from "../../components/Table/Table.tsx";
import {createPortal} from "react-dom";
import {CreateUserModal} from "../../Modales/CreateUserModal/CreateUserModal.tsx";
import {EditUsersModal} from "../../Modales/EditUsersModal/EditUsersModal.tsx";

export default function User() {
    const [search, setSearch] = useState<string>('')
    const [userToEdit, setUserToEdit] = useState<number | null>(null)
    // const {data, loading, error, get} = useFetch(API_URL)
    // const {data: dataRoles, loading: loadingRoles, error: errorRoles, get: getRoles} = useFetch(API_URL)
    const {data, loading, error, get, del} = useFetch(API_URL)
    const [dataUsersModify, setDataUsersModify] = useState<any>([])
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    useEffect(() => {
        get(`users?apikey=${API_KEY}`)
    }, []);

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
    ]

    const handleDelete = (row: any) => {
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

    if (search.length > 0) {
        dataUsersFiltered = dataUsersModify?.users?.rows.filter((user: any) => user.name.toLowerCase().includes(search.toLowerCase()) || user.lastname.toLowerCase().includes(search.toLowerCase()) || user.address.toLowerCase().includes(search.toLowerCase()) || user.phone.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()) || user.rol.toLowerCase().includes(search.toLowerCase()))
    } else {
        dataUsersFiltered = dataUsers
    }

    useEffect(() => {
        if (userToEdit == null) {
            get(`users?apikey=${API_KEY}`)
        }
    }, [userToEdit]);

    return (
        <>
            <Container align={'center'} justify={'TOP'}>
                <Titles title={'Usuarios'}/>
                <div className={styles.usersTable} style={{
                    width: '100%',
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem',

                    }}>
                        <SearchInput label={'Buscar Usuarios'} onChange={e => setSearch(e.target.value)} value={search}
                                     idSearch={'userSearch'}/>
                        <Button text={'Crear Usuario'} onClick={() => setIsModalOpen(true)} fill={false}/>
                    </div>
                    {
                        loading && <p>Cargando...</p>
                    }
                    {
                        error && <p>Ha ocurrido un error</p>
                    }
                    {
                        !loading && !error && dataUsersFiltered.length === 0 && <p>No hay datos</p>
                    }
                    {
                        !loading && !error && dataUsersFiltered.length > 0 && (
                            <Table columns={columnsUsers} data={dataUsersFiltered} onRowClick={() => {
                            }}
                                   nombreArchivo={'Usuarios Reporte'}
                                   tituloDocumento={'Usuarios'}
                                   deleteAction={{
                                       label: 'Cambiar estado',
                                       onClick: (row) => handleDelete(row.id),
                                   }}
                                   editableAction={{
                                       label: 'Editar Usuario',
                                       onClick: (row: any) => {
                                           setUserToEdit(row.id)
                                           setIsModalOpen(true)
                                       },
                                   }}
                            />
                        )
                    }
                </div>
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