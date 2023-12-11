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
    const handleDelete = (row: any) => {
        del(`suppliers/${row.id}?apikey=${API_KEY}`);
        setTimeout(() => {
            get(`suppliers?apikey=${API_KEY}`);
        }, 500);
    };

    return (
        <>
            <Container align={'CENTER'} justify={'TOP'}>
                <Titles title={'Proveedores'} level={1}/>
                <div className="supplier__table" style={
                    {
                        width: '100%',
                    }
                }>
                <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem',

                    }}><SearchInput label={'Buscar Proveedores'} onChange={e=> setSearch(e.target.value)} value={search} idSearch={'supplierSearch'} />
                        <Button text={'Crear Proveedor'} onClick={() => setIsModalOpen(true)} fill={false}/>
                    </div>
                    {
                        loading && <p>Cargando...</p>
                    }
                    {
                        error && <p>Ha ocurrido un error</p>
                    }
                    {
                        !loading && !error && dataSuppliersFiltered.length === 0 && <p>No hay datos</p>
                    }
                    {
                        !loading && !error && dataSuppliersFiltered.length > 0 && (
                    <Table
                        columns={columnsSuppliers}
                        data={dataSuppliersFiltered}
                        onRowClick={() => null}
                        editableAction={{
                            label: 'Editar Proveedor',
                            onClick: (row: any) => {
                                setSupplierToEdit(row.id)
                                setIsModalOpen(true)
                            }} }
                        deleteAction={{ onClick: handleDelete }}
                    />)
                    }
                </div>
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