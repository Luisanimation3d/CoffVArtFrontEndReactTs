import {useEffect, useState} from "react";
import {Column} from "../../types/Table";
import {Table} from "../../components/Table/Table";
import {Titles} from "../../components/Titles/Titles";
import {Container} from "../../components/Container/Container";
import {SearchInput} from "../../components/SearchInput/SearchInput";
import {Modal, ModalContainer} from "../../components/Modal/Modal.tsx";
import {useFetch} from "../../hooks/useFetch";
import {createPortal} from "react-dom";
import {API_KEY} from "../../constantes";
import {Button} from "../../components/Button/Button.tsx";
import {useNavigate} from "react-router-dom";

export const Roles = () => {
    const [search, setSearch] = useState<string>('')
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [dataModal, setDataModal] = useState<any>({})
    const [nameRol, setNameRol] = useState<string>('')
    const {data, loading, error, get, del} = useFetch('https://coffvart-backend.onrender.com/api/')
    const navigate = useNavigate()
    useEffect(() => {
        get(`roles?apikey=${API_KEY}`)
    }, []);
    const columnsRoles: Column[] = [
        {
            key: 'id',
            header: 'ID',
        },
        {
            key: 'name',
            header: 'Nombre',
        },
        {
            key: 'description',
            header: 'Descripción',
        }
    ]
    const dataRoles = data?.roles?.rows || []
    let dataRolesFiltered: any[];

    if (search.length > 0) {
        dataRolesFiltered = dataRoles.filter((role: any) => role.name.toLowerCase().includes(search.toLowerCase()) || role.description.toLowerCase().includes(search.toLowerCase()))
    } else {
        dataRolesFiltered = dataRoles
    }

    const handleDelete = (row: any) => {
        del(`roles/${row.id}?apikey=${API_KEY}`)
        setTimeout(() => {
            get(`roles?apikey=${API_KEY}`)
        }, 500)
    }

    const handleRowClick = (row: any) => {
        const dataRole = dataRoles.find((role: any) => role.id === row.id)
        setNameRol(dataRole.name)
        const dataModalRol = dataRole?.rol_details?.map((rol: any) => {
            const nameRol = rol.permission.name.split(' ')
            return {
                id: rol.id,
                permission: nameRol[1],
                privilege: nameRol[0],
            }
        })
        setDataModal(dataModalRol)
        setIsModalOpen(true)
    }

    return (
        <>
            <Container align={'CENTER'} justify={'TOP'}>
                <Titles title={'Roles'} level={1}/>
                <div className="roles__table" style={
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
                        <SearchInput label={'Buscar Roles'} onChange={e => setSearch(e.target.value)} value={search}
                                     idSearch={'roleSearch'}/>
                        <Button text={'Crear Rol'} onClick={() => navigate('/admin/roles/create')} fill={false}/>
                    </div>
                    {
                        loading && <p>Cargando...</p>
                    }
                    {
                        error && <p>Ha ocurrido un error</p>
                    }
                    {
                        !loading && !error && dataRolesFiltered.length === 0 && <p>No hay resultados</p>
                    }
                    {
                        !loading && !error && dataRolesFiltered.length > 0 && (
                            <Table columns={columnsRoles} data={dataRolesFiltered} onRowClick={handleRowClick}
                                   editableAction={{
                                       onClick: (row) => navigate(`/admin/roles/edit/${row.id}`),
                                   }}
                                   deleteAction={{
                                       label: 'Cambiar estado',
                                       onClick: handleDelete,
                                   }}
                            />)
                    }
                </div>
            </Container>
            {
                isModalOpen && createPortal(
                    <>
                        <ModalContainer ShowModal={setIsModalOpen}>
                            <Modal showModal={setIsModalOpen} title={`Rol ${nameRol}`}>
                                <div className="modal__content" style={{
                                    padding: '1rem',
                                }}>
                                    <Table columns={[
                                        {
                                            key: 'id',
                                            header: 'ID',
                                        },
                                        {
                                            key: 'permission',
                                            header: 'Permiso',
                                        },
                                        {
                                            key: 'privilege',
                                            header: 'Privilegio',
                                        }
                                    ]} data={dataModal} onRowClick={() => null}/>
                                </div>
                            </Modal>
                        </ModalContainer>
                    </>,
                    document.getElementById('modal') as HTMLElement
                )
            }
        </>
    )
}