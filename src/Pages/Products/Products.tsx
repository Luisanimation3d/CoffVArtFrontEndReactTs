import {Column} from "../../types/Table";
import {Table} from "../../components/Table/Table.tsx";
import {Titles} from "../../components/Titles/Titles.tsx";
import {Container} from "../../components/Container/Container.tsx";
import {useState} from "react";
import {SearchInput} from "../../components/SearchInput/SearchInput.tsx";

export const Products = () => {
    const [search, setSearch] = useState<string>('')
    const columnsProducts: Column[] = [
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
            key: 'stockMin',
            header: 'Stock Minimo',
        },
        {
            key: 'stockMax',
            header: 'Stock Máximo',
        },
        {
            key: 'unitPrice',
            header: 'Precio Únitario',
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
    
    const dataProducts =[
        {
            id: 1,
            name: 'Café Burdeo 250 gr',
            amount: 25,
            stockMin: 5,
            stockMax: 30,
            unitPrice: 27500,
            description: 'Café Burdeo de alta calidad en presentación de 250 gr',
            state: 'Activo',
        },
    ]

    let dataProductsFiltered: any;

    if(search.length > 0){
        dataProductsFiltered = dataProducts.filter(product => product.name.toLowerCase().includes(search.toLowerCase() )
        || product.description.toLowerCase().includes(search.toLowerCase() )
        || product.state.toLowerCase().includes(search.toLowerCase() )
        )
    }else{
        dataProductsFiltered = dataProducts
    }

    return (
        <>
            <Container>
                <Titles title={'Productos'} level={1}/>
                <div className="products__table">
                    <SearchInput label={'Buscar Products'} onChange={e=> setSearch(e.target.value)} value={search} idSearch={'productsSearch'} />
                    <Table columns={columnsProducts} data={dataProductsFiltered} onRowClick={()=> null} editableAction={{
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
