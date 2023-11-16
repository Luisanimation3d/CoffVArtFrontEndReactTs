import {Column} from "../../types/Table";
import {Table} from "../../components/Table/Table.tsx";
import {Titles} from "../../components/Titles/Titles.tsx";
import {Container} from "../../components/Container/Container.tsx";
import {useState} from "react";
import {SearchInput} from "../../components/SearchInput/SearchInput.tsx";
import { Button } from "../../components/Button/Button.tsx";
import {useNavigate} from "react-router-dom";

export const Companys = () => {
    const [search, setSearch] = useState<string>('')
    const navigate = useNavigate()
    const columnsCompanys: Column[] = [
        {
            key:'id',
            header: 'ID',
        },
        {
            key:'name',
            header:'Nombre',
        },
        {
            key: 'nit',
            header: 'NIT',
        },
        {
            key: 'email',
            header: 'Correo',
        },
        {
            key: 'address',
            header: 'Dirección',
        },
        {
            key: 'phone',
            header: 'Contacto',
        }
    ]

    const dataCompanys = [
        {
            id: 1,
            name: 'Moledora S.A',
            nit: '2131042',
            email: 'Moledora@molino.com',
            address: 'Cra 25 # 33 - 31',
            phone: '3004447631',
        }
    ]

    let dataCompanysFiltered: any;

    if(search.length > 0){
        dataCompanysFiltered = dataCompanys.filter(company=> company.name.toLowerCase().includes(search.toLowerCase()) 
        || company.address.toLowerCase().includes(search.toLowerCase())
        || company.nit.toLowerCase().includes(search.toLowerCase())
        || company.phone.toLowerCase().includes(search.toLowerCase())
        || company.email.toLowerCase().includes(search.toLowerCase())
        )
    }else{
        dataCompanysFiltered = dataCompanys
    }

    return(
        <>
        <Container>
            <Titles title={'Compañias'} level={1}/>
            <div className="companys__table">
            <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem',

                    }}>
                        <Button text={'Crear Compañia'} onClick={() => navigate('/admin/Companys/create')} fill={false}/>
                    </div>
                <SearchInput label={'Buscar Compañias'} onChange={e=> setSearch(e.target.value)} value={search} idSearch={'companySearch'} />
                <Table columns={columnsCompanys} data={dataCompanysFiltered} onRowClick={()=> null} editableAction={{
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