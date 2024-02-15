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
import { ProductEditModal } from "../../Modales/EditProductModal/EditProductModal.tsx";
import { createPortal } from "react-dom";
import {TableRedisign} from "../../components/TableRedisign/TableRedisign.tsx";
import {FiShuffle} from "react-icons/fi";


export const Products = () => {
    const [search, setSearch] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [productToEdit, setProductToEdit] = useState<number|null>(null)
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
        { key: 'unitPrice', header: 'Precio Unitario' },
        { key: 'description', header: 'Descripción' },
        { key: 'state', header: 'Estado' }
    ];
    
    // const dataProducts = data?.products?.rows || [];
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

    const handleCallback = (row: {[key : string] : string | number}, type: string | number) => {
        if(type === 'Cambiar estado'){
            del(`products/${row.id}?apikey=${API_KEY}`);
            setTimeout(() => {
                get(`products?apikey=${API_KEY}`);
            }, 500);
        }
    }
    const options = [
        {
            label: 'Cambiar estado',
            icon: <FiShuffle/>
        }
    ]


    return (
        <>
            <Container align={'CENTER'} justify={'TOP'}>
            <TableRedisign
                    columns={columnsProducts}
                    data={dataProductsFiltered}
                    search={search}
                    setSearch={setSearch}
                    title={'Productos'}
                    createAction={() => setIsModalOpen(true)}
                    loading={loading}
                    callback={handleCallback}
                    dropDownOptions={options}
                />
                {
                    isModalOpen && createPortal(
                        <>{
                            productToEdit?(
                                <ProductEditModal setIsModalOpen={setIsModalOpen} idProduct={productToEdit} setIdEdit={setProductToEdit}/>
                            ):
                            <CreateProductModal setIsModalOpen={setIsModalOpen} title="Crear Producto"/>
                        }
                        </>,
                        document.getElementById('modal') as HTMLElement
                    )
                }
            </Container>
        </>
    );
};

export default Products;