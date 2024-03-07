import {useEffect, useState} from "react";
import {Column} from "../../types/Table";
import {Table} from "../../components/Table/Table";
import {Container} from "../../components/Container/Container";
import {Modal, ModalContainer} from "../../components/Modal/Modal.tsx";
import {useFetch} from "../../hooks/useFetch";
import {createPortal} from "react-dom";
import {API_KEY} from "../../utils/constantes.ts";
import {Button} from "../../components/Button/Button.tsx";
import {useNavigate} from "react-router-dom";
import {TableRedisign} from "../../components/TableRedisign/TableRedisign.tsx";
import styles from './Roles.module.css';

export const Roles = () => {
    const [search, setSearch] = useState<string>('')
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [dataModal, setDataModal] = useState<any>({})
    const [nameRol, setNameRol] = useState<string>('')
    const {data, loading, error, get, del} = useFetch('https://coffvart-backend.onrender.com/api/')
    const navigate = useNavigate()
    const [page, setPage] = useState<number>(1)
    const [dataToShow, setDataToShow] = useState<any[]>([])
    const [idRolToModify, setIdRolToModify] = useState<number | null>(null)
    useEffect(() => {
        get(`roles?apikey=${API_KEY}&page=${page}`)
    }, [page]);
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
        },
        {
            key: 'state',
            header: 'Estado',
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
        del(`roles/${row}?apikey=${API_KEY}`)
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

        const reduceData = dataModalRol?.reduce((acc: any, item: any) => {
            const index = acc.findIndex((accItem: any) => accItem.permission === item.permission)

            if (index !== -1) {
                return acc;
            }

            return [
                ...acc, {
                    id: item.id,
                    permission: item.permission,
                    privilege: dataModalRol.map(privilege => privilege.permission === item.permission ? (<span className={styles.itemPrivilegeItemList}>{privilege.privilege}</span>) : null).filter((item: any) => item !== null),
                }
            ]

        }, [])
        console.log(reduceData, 'ReduceData')

        setDataModal(reduceData)
        setIsModalOpen(true)
    }

    useEffect(() => {
        if (data?.roles?.rows) {
            const newData = data?.roles?.rows?.map((item: any) => ({
                ...item,
                State: <Button text={item.state ? 'Activo' : 'Inactivo'} autosize={false} type={'BUTTON'}
                               onClick={(e: any) => {
                                   e.stopPropagation()
                                   handleDelete(e.target?.parentNode.parentNode.dataset.key)
                               }}/>
            }))

            setDataToShow(newData)
        }
    }, [data])

    return (
        <>
            <Container align={'CENTER'} justify={'TOP'}>
                <TableRedisign
                    columns={columnsRoles}
                    data={dataRolesFiltered}
                    search={search}
                    setSearch={setSearch}
                    title={'Roles'}
                    loading={loading}
                    createAction={() => navigate('/admin/roles/create')}
                    onRowClick={handleRowClick}
                    page={page}
                    setPage={setPage}
                    pagination={true}
                    totalPages={Math.ceil(data?.roles?.count / data?.options?.limit) || 1}
                />
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

export default Roles