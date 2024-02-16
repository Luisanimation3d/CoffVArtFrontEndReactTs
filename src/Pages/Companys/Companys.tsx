import {Column} from "../../types/Table";
import {Table} from "../../components/Table/Table.tsx";
import {Titles} from "../../components/Titles/Titles.tsx";
import {Container} from "../../components/Container/Container.tsx";
import {useEffect, useState} from "react";
import {SearchInput} from "../../components/SearchInput/SearchInput.tsx";
import { Button } from "../../components/Button/Button.tsx";
import {useNavigate} from "react-router-dom";
import { API_KEY, API_URL } from "../../constantes.ts";
import { useFetch } from "../../hooks/useFetch.tsx";
import { createPortal } from "react-dom";
import { CompanysCreateModal } from "../../Modales/CreateCompanyModal/CreateCompanyModal.tsx";
import { CompanysEditModal } from "../../Modales/EditCompanyModal/EditCompanyModal.tsx";
import {TableRedisign} from "../../components/TableRedisign/TableRedisign.tsx";
import {FiShuffle} from "react-icons/fi";

export const Companys = () => {
    const [search, setSearch] = useState<string>('');
    const [companyToEdit, setCompanyToEdit] = useState<number|null>(null)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const {data,loading,error,get,del} = useFetch(API_URL)
    const navigate = useNavigate();

    useEffect(()=>{
        get(`companys?apikey=${API_KEY}`);
    },[]);
    
    const columnsCompanys: Column[] = [
        {
            key: 'id',
            header:'ID',
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
        },
        {
            key: 'state',
            header: 'Estado',
        }
    ]

    const dataCompanys = data?.companys?.rows || [];
    let dataCompanysFiltered: any[];

    if(search.length > 0){
        dataCompanysFiltered = dataCompanys.filter((company:any) =>
           company.name.toLowerCase().includes(search.toLowerCase()) 
        || company.address.toLowerCase().includes(search.toLowerCase())
        || company.nit.toLowerCase().includes(search.toLowerCase())
        || company.phone.toLowerCase().includes(search.toLowerCase())
        || company.email.toLowerCase().includes(search.toLowerCase())
        );
    }else{
        dataCompanysFiltered = dataCompanys;
    }
    
    const handleCallback = (row: {[key : string] : string | number}, type: string | number) => {
        if(type === 'Cambiar estado'){
            del(`companys/${row.id}?apikey=${API_KEY}`);
            setTimeout(() => {
                get(`companys?apikey=${API_KEY}`);
            }, 500);
        }
    }
    const options = [
        {
            label: 'Cambiar estado',
            icon: <FiShuffle/>
        }
    ]
    return(
        <>
        <Container align={'CENTER'} justify={'TOP'}>
        <TableRedisign
                    columns={columnsCompanys}
                    data={dataCompanysFiltered}
                    search={search}
                    setSearch={setSearch}
                    title={'Compañias'}
                    createAction={() => navigate('/admin/Companys/create')}
                    loading={loading}
                    callback={handleCallback}
                    dropDownOptions={options}
                />
                    
            {
                    isModalOpen && createPortal(
                        <>{
                            companyToEdit?(
                                <CompanysEditModal setIsModalOpen={setIsModalOpen} idCompany={companyToEdit} setIdEdit={setCompanyToEdit}/>
                            ):
                            <CompanysCreateModal setIsModalOpen={setIsModalOpen} title="Crear compañia"/>
                                 }
                            </>,
                        document.getElementById('modal') as HTMLElement
                    )
                }
        </Container>
    </>
    );
};

export default Companys;