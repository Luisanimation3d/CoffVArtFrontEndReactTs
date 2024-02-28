import { Column } from "../../types/Table";
import { Table } from "../../components/Table/Table";
import { Titles } from "../../components/Titles/Titles";
import { Container } from "../../components/Container/Container";
import { useState, useEffect } from "react";
import { SearchInput } from "../../components/SearchInput/SearchInput";
import { Button } from "../../components/Button/Button";
import { CreateSupplyModal } from "../../Modales/CreateSupplyModal/CreateSupplyModal";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { SupplyEditModal } from "../../Modales/EditSupplyModal/EditSupplyModal.tsx";
import { API_KEY } from "../../constantes";
import {TableRedisign} from "../../components/TableRedisign/TableRedisign.tsx";
import {FiShuffle} from "react-icons/fi";

export const Supplies = () => {
    const [search, setSearch] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [supplyToEdit, setSupplyToEdit] = useState<number|null>(null)
    const [dataToShow, setDataToShow] = useState<any[]>([])
    const { data, loading, error, get, del } = useFetch('https://coffvart-backend.onrender.com/api/');
    const [page, setPage] = useState<number>(1)
    const navigate = useNavigate();

    useEffect(() => {
        get(`supplies?apikey=${API_KEY}`);
    }, []);

    const columnsSupplies: Column[] = [
        { key: 'id', header: 'ID' },
        { key: 'name', header: 'Nombre' },
        { key: 'amount', header: 'Cantidad' },
        { key: 'unitPrice', header: 'Precio Unitario' },
        { key: 'description', header: 'Descripción' },
        { key: 'state', header: 'Estado' }
    ];
    
    const dataSupplies = data?.supplies?.rows || [];
    let dataSuppliesFiltered: any[];
    

    if (search.length > 0) {
        dataSuppliesFiltered = dataSupplies.filter((supply: any) =>
            supply.name.toLowerCase().includes(search.toLowerCase()) ||
            supply.unitPrice.toString().includes(search)
        );
    } else {
        dataSuppliesFiltered = dataSupplies;
    }

    const handleCallback = (row: {[key : string] : string | number}, type: string | number) => {
        if(type === 'Cambiar estado'){
            del(`supplies/${row.id}?apikey=${API_KEY}`);
            setTimeout(() => {
                get(`supplies?apikey=${API_KEY}`);
            }, 500);
        }else if(type === 'Editar'){
            console.log(row, 'Row')
            navigate(`/admin/Supplys/edit/${row.id}`)
        }
    }
    const options = [
        {
            label: 'Cambiar estado',
            icon: <FiShuffle/>
        },
        {
            label: 'Editar',
            icon: <FiShuffle/>
        }
    ]

    return (
        <>
            <Container align={'CENTER'} justify={'TOP'}>
            <TableRedisign
                    columns={columnsSupplies}
                    data={dataSuppliesFiltered}
                    search={search}
                    setSearch={setSearch}
                    title={'Insumos'}
                    page={page || 1}
                    setPage={setPage}
                    totalPages={Math.ceil(data?.users?.count / data?.options?.limit) || 1}
                    pagination={true}
                    dropDownOptions={options}
                    createAction={() => navigate('/admin/supplys/create')}
                    loading={loading}
                    onRowClick={row => alert(row.name)}
                    callback={handleCallback}
                />
                {
                    isModalOpen && createPortal(
                        <>{
                            supplyToEdit?(
                                <SupplyEditModal setIsModalOpen={setIsModalOpen} idSupply={supplyToEdit} setIdEdit={setSupplyToEdit}/>
                            ):
                            <CreateSupplyModal setIsModalOpen={setIsModalOpen} title="Crear Insumo"/>
                        }
                        </>,
                        document.getElementById('modal') as HTMLElement
                    )
                }
            </Container>
        </>
    );
};

export default Supplies;