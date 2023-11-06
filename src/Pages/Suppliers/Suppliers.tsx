import {Column} from "../../types/Table";
import {Table} from "../../components/Table/Table.tsx";
import {Titles} from "../../components/Titles/Titles.tsx";
import {Container} from "../../components/Container/Container.tsx";
import {useState} from "react";
import {SearchInput} from "../../components/SearchInput/SearchInput.tsx";

export const Suppliers = () => {
    const [search, setSearch] = useState<string>('')
    const columnsSuppliers: Column[] = [
        {
            key: 'id',
            header:'ID',
        },
        {
            key: 'name',
            header: 'Nombre',
        },
        {
            key: 'nit',
            header: 'NIT',
        },
        {
            key: 'coffeType',
            header: 'Tipo de Café',
        },
        {
            key: 'address',
            header: 'Dirección',
        },
        {
            key: 'phone',
            header: 'Contacto',
        },
        {
            key: 'quality',
            header: 'Calidad',
        },
        {
            key: 'unitCost',
            header: 'Costo Unitario',
        }
    ]
    
    const dataSuppliers =[
        {
            id: 1,
            name: 'Finca mi abuela',
            nit: '2130412',
            coffeType: 'pergamino',
            address: 'Calle 30 # 100-20',
            phone: '3005664123',
            quality: 'Premiun',
            unitCost: 50000,
        },
    ]

    let dataSuppliersFiltered: any;

    if(search.length > 0){
        dataSuppliersFiltered = dataSuppliers.filter(supplier => supplier.name.toLowerCase().includes(search.toLowerCase() )
        || supplier.nit.toLowerCase().includes(search.toLowerCase() )
        || supplier.coffeType.toLowerCase().includes(search.toLowerCase() )
        || supplier.address.toLowerCase().includes(search.toLowerCase() )
        || supplier.phone.toLowerCase().includes(search.toLowerCase() )
        || supplier.quality.toLowerCase().includes(search.toLowerCase() )
        )
    }else{
        dataSuppliersFiltered = dataSuppliers
    }

    return (
        <>
            <Container>
                <Titles title={'Proveedores'} level={1}/>
                <div className="supplier__table">
                    <SearchInput label={'Buscar Proveedores'} onChange={e=> setSearch(e.target.value)} value={search} idSearch={'supplierSearch'} />
                    <Table columns={columnsSuppliers} data={dataSuppliersFiltered} onRowClick={()=> null} editableAction={{
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
