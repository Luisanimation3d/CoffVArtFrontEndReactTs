import {Column} from "../../types/Table";
import {Table} from "../../components/Table/Table.tsx";
import {Titles} from "../../components/Titles/Titles.tsx";
import {Container} from "../../components/Container/Container.tsx";
import {useState} from "react";
import {SearchInput} from "../../components/SearchInput/SearchInput.tsx";

export const Roles = () => {
    const [search, setSearch] = useState<string>('')
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
            name: 'User',
            description: 'this is the user role',
        },
    ]

    let dataRolesFiltered: any;

    if(search.length > 0){
        dataRolesFiltered = dataRoles.filter(role => role.name.toLowerCase().includes(search.toLowerCase()) || role.description.toLowerCase().includes(search.toLowerCase()))
    }else{
        dataRolesFiltered = dataRoles
    }

    return (
        <>
            <Container>
                <Titles title={'Roles'} level={1}/>
                <div className="roles__table">
                    <SearchInput label={'Buscar Roles'} onChange={e=> setSearch(e.target.value)} value={search} idSearch={'roleSearch'} />
                    <Table columns={columnsRoles} data={dataRolesFiltered} onRowClick={()=> null} editableAction={{
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