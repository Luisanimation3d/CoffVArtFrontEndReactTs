import { Column } from "../../types/Table";
import { Table } from "../../components/Table/Table";
import { Titles } from "../../components/Titles/Titles";
import { Container } from "../../components/Container/Container";
import { useState, useEffect } from "react";
import { SearchInput } from "../../components/SearchInput/SearchInput";
import { Button } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { API_KEY } from "../../constantes";
import { CreateProductModal } from "../../Modales/CreateProductModal/CreateProductModal";
import { createPortal } from "react-dom";

export const Products = () => {
    const [search, setSearch] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const { data, loading, error, get, del } = useFetch('https://coffvart-backend.onrender.com/api/');
    const [dataToShow, setDataToShow] = useState<any[]>([])
    const navigate = useNavigate();

    useEffect(() => {
        get(`products?apikey=${API_KEY}`);
    }, []);

    const columnsProducts: Column[] = [
        { key: 'id', header: 'ID' },
        { key: 'name', header: 'Nombre' },
        { key: 'amount', header: 'Cantidad' },
        { key: 'stockMin', header: 'Stock Minimo' },
        { key: 'stockMax', header: 'Stock Máximo' },
        { key: 'unitPrice', header: 'Precio Únitario' },
        { key: 'description', header: 'Descripción' },
        { key: 'state', header: 'Estado' }
    ];
    
    // const dataProducts = data?.products?.rows || [];
    const dataProducts = dataToShow || [];
    let dataProductsFiltered: any[];
    

    if (search.length > 0) {
        dataProductsFiltered = dataProducts.filter((product: any) =>
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.unitPrice.toString().includes(search)
        );
    } else {
        dataProductsFiltered = dataProducts;
    }

    const handleDelete = (row: any) => {
        del(`products/${row.id}?apikey=${API_KEY}`);
        setTimeout(() => {
            get(`products?apikey=${API_KEY}`);
        }, 500);
    };

    useEffect(()=>{
        if(data?.products?.rows){
            const newData = data?.products?.rows?.map((item: any)=>({
                ...item,
                state: <Button text={item.state ? 'Activo' : 'Inactivo'} autosize={false} type={'BUTTON'} onClick={(value: any) => console.log(value.target?.parentNode.parentNode.dataset.key, 'Aqui andamos imprimiendo')}/>
            }))

            setDataToShow(newData)
        }
    }, [data])

    return (
        <>
            <Container align={'CENTER'} justify={'TOP'}>
                <Titles title={'Productos'} level={1} />
                <div className="roles__table" style={
                    {
                        width: '100%',
                    }
                }>
                        <div style={{
                            display: 'flex',
                            justifyContent:'space-between',
                            alignItems: 'center',
                            marginBottom: '1rem',
                        }}>
                    <SearchInput label={'Buscar Producto'} onChange={(e) => setSearch(e.target.value)} value={search} idSearch={'ProductsSearch'} />

                    <Button text={'Crear Producto'} onClick={() => setIsModalOpen(true)} fill={false}/>
                    </div>
                    
                    {
                        loading && <p>Cargando...</p>
                    }
                    {
                        error && <p>Ha ocurrido un error</p>
                    }
                    {
                        !loading && !error && dataProductsFiltered.length === 0 && <p>No hay datos</p>
                    }
                    {
                        !loading && !error && dataProductsFiltered.length > 0 && (
                    <Table
                        columns={columnsProducts}
                        data={dataToShow}
                        onRowClick={() => null}
                        editableAction={{ onClick: () => null }}
                        deleteAction={{ onClick: handleDelete }}
                        nombreArchivo={'Productos Reporte'}
                        tituloDocumento={'Productos Reporte'}
                    />)
                    }
                </div>
                {
                    isModalOpen && createPortal(
                        <>
                            <CreateProductModal setIsModalOpen={setIsModalOpen} title="Crear Producto"/>
                        </>,
                        document.getElementById('modal') as HTMLElement
                    )
                }
            </Container>
        </>
    );
};

export default Products;