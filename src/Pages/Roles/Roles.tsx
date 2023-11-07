import {useState} from "react";
import {Column} from "../../types/Table";
import {Table} from "../../components/Table/Table";
import {Titles} from "../../components/Titles/Titles";
import {Container} from "../../components/Container/Container";
import {SearchInput} from "../../components/SearchInput/SearchInput";
import {Modal, ModalContainer} from "../../components/Modal/Modal.tsx";
import {createPortal} from "react-dom";

export const Roles = () => {
    const [search, setSearch] = useState<string>('')
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [dataModal, setDataModal] = useState<any>({})
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

    const dataRoles = [
        {
            id: 1,
            name: 'Admin',
            description: 'this is the admin role',
        },
        {
            id: 2,
            name: 'Usuario',
            description: 'this is the user role',
        },
    ]

    let dataRolesFiltered: any;

    if (search.length > 0) {
        dataRolesFiltered = dataRoles.filter(role => role.name.toLowerCase().includes(search.toLowerCase()) || role.description.toLowerCase().includes(search.toLowerCase()))
    } else {
        dataRolesFiltered = dataRoles
    }

    const handleRowClick = (row: any) => {
        const detailRole = {
            name: row.name,
            details: [
                {
                    id: 1,
                    permission: 'usuarios',
                    privilege: 'lectura',
                },
                {
                    id: 2,
                    permission: 'usuarios',
                    privilege: 'escritura',
                },
                {
                    id: 3,
                    permission: 'roles',
                    privilege: 'lectura',
                }
            ]
        }

        setDataModal(detailRole)
        setIsModalOpen(true)
    }

    return (
        <>
            <Container>
                <Titles title={'Roles'} level={1}/>
                <div className="roles__table">
                    <SearchInput label={'Buscar Roles'} onChange={e => setSearch(e.target.value)} value={search}
                                 idSearch={'roleSearch'}/>
                    <Table columns={columnsRoles} data={dataRolesFiltered} onRowClick={handleRowClick} editableAction={{
                        onClick: () => null,
                    }}
                           deleteAction={{
                               onClick: () => null,
                           }}
                    />
                </div>
            </Container>
            {
                isModalOpen && createPortal(
                    <>
                        <ModalContainer ShowModal={setIsModalOpen}>
                            <Modal showModal={setIsModalOpen} title={`Rol ${dataModal.name}`}>
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
                                    ]} data={dataModal.details} onRowClick={() => null}/>
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