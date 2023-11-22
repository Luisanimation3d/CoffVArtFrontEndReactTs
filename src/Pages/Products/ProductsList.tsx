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

export const Products = () => {
    const [search, setSearch] = useState<string>('');
    const { data, loading, error, get, del } = useFetch('https://coffvart-backend.onrender.com/api/');
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
    
    const dataProducts = data?.products?.rows || [];
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

                    <Button text={'Crear Producto'} onClick={() => navigate('/admin/Products/create')} fill={false} />
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
                        data={dataProductsFiltered}
                        onRowClick={() => null}
                        editableAction={{ onClick: () => null }}
                        deleteAction={{ onClick: handleDelete }}
                    />)
                    }
                </div>
            </Container>
        </>
    );
};
