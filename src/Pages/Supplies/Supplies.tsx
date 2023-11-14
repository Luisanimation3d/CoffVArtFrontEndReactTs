import {Column} from "../../types/Table";
import {Table} from "../../components/Table/Table.tsx";
import {Titles} from "../../components/Titles/Titles.tsx";
import {Container} from "../../components/Container/Container.tsx";
import {useState} from "react";
import {SearchInput} from "../../components/SearchInput/SearchInput.tsx";

export const Supplys = () => {
    const [search, setSearch] = useState<string>('')
    const columnsSupplys: Column[] = [
        {
            key: 'id',
            header:'ID',
        },
        {
            key: 'name',
            header: 'Nombre',
        },
        {
            key: 'amount',
            header: 'Cantidad',
        },
        {
            key: 'unitPrice',
            header: 'Precio Únitario',
        },
        {
            key: 'supplierId',
            header: 'Proveedor',
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
    
    const dataSupplys =[
        {
            id: 1,
            name: 'Café Pergamino',
            amount: 35,
            unitPrice: 35000,
            supplierId: 'Finca mi abuela',
            description: 'Café en estado pergamino traído de la finca',
            state: 'Activo',
        },
    ]

    let dataSupplysFiltered: any;

    if(search.length > 0){
        dataSupplysFiltered = dataSupplys.filter(supply => supply.name.toLowerCase().includes(search.toLowerCase() )
        || supply.supplierId.toString().includes(search.toLowerCase() )
        || supply.description.toLowerCase().includes(search.toLowerCase() )
        || supply.state.toLowerCase().includes(search.toLowerCase() )
        )
    }else{
        dataSupplysFiltered = dataSupplys
    }

    return (
        <>
            <Container>
                <Titles title={'Insumos'} level={1}/>
                <div className="supplys__table">
                    <SearchInput label={'Buscar Insumo'} onChange={e=> setSearch(e.target.value)} value={search} idSearch={'supplysSearch'} />
                    <Table columns={columnsSupplys} data={dataSupplysFiltered} onRowClick={()=> null} editableAction={{
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
