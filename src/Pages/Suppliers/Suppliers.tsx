import {Column} from "../../types/Table";
import {Table} from "../../components/Table/Table.tsx";
import {Titles} from "../../components/Titles/Titles.tsx";
import {Container} from "../../components/Container/Container.tsx";
import {useEffect, useState} from "react";
import {SearchInput} from "../../components/SearchInput/SearchInput.tsx";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button.tsx";
import { API_KEY, API_URL } from "../../constantes.ts";
import { useFetch } from "../../hooks/useFetch.tsx";
import { SuppliersCreateModal } from "../../Modales/CreateSupplierModal/CreateSupplierModal.tsx";
import { createPortal } from "react-dom";
import { SuppliersEditModal } from "../../Modales/EditSupplierModal/EditSupplierModal.tsx";
import {TableRedisign} from "../../components/TableRedisign/TableRedisign.tsx";
import {FiShuffle} from "react-icons/fi";

export const Suppliers = () => {
    const [search, setSearch] = useState<string>('');
    const [supplierToEdit, setSupplierToEdit] = useState<number|null>(null)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const { data, loading, error, get, del } = useFetch(API_URL);
    const navigate = useNavigate();
    useEffect(() => {
        get(`suppliers?apikey=${API_KEY}`);
    }, []);
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
            key: 'state',
            header: 'Estado',
        }
    ];
    
    const dataSuppliers = data?.suppliers?.rows || [];

    let dataSuppliersFiltered: any[];

    if(search.length > 0){
        dataSuppliersFiltered = dataSuppliers.filter((supplier:any )=>
        supplier.nit.toLowerCase().includes(search.toLowerCase() )
        || supplier.coffeType.toLowerCase().includes(search.toLowerCase() )
        || supplier.address.toLowerCase().includes(search.toLowerCase() )
        || supplier.phone.toLowerCase().includes(search.toLowerCase() )
        || supplier.quality.toLowerCase().includes(search.toLowerCase() )
        )
    }else{
        dataSuppliersFiltered = dataSuppliers;
    }
    const handleCallback = (row: {[key : string] : string | number}, type: string | number) => {
        if(type === 'Cambiar estado'){
            del(`suppliers/${row.id}?apikey=${API_KEY}`);
            setTimeout(() => {
                get(`suppliers?apikey=${API_KEY}`);
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
                    columns={columnsSuppliers}
                    data={dataSuppliersFiltered}
                    search={search}
                    setSearch={setSearch}
                    title={'Proveedores'}
                    createAction={() => setIsModalOpen(true)}
                    loading={loading}
                    callback={handleCallback}
                    dropDownOptions={options}
                />
                {
                    isModalOpen && createPortal(
                        <>{
                            supplierToEdit?(
                                <SuppliersEditModal setIsModalOpen={setIsModalOpen} idSupplier={supplierToEdit} setIdEdit={setSupplierToEdit}/>
                            ):
                            (<SuppliersCreateModal setIsModalOpen={setIsModalOpen} title="Crear Proveedor"/>)
                        }
                            
                        </>,
                        document.getElementById('modal') as HTMLElement
                    )
                }
            </Container>
        </>
    )
}

export default Suppliers;