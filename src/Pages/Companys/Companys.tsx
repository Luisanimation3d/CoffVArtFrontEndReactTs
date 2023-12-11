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
    
    const handleDelete = (row: any) => {
        del(`companys/${row.id}?apikey=${API_KEY}`);
        setTimeout(() => {
            get(`companys?apikey=${API_KEY}`);
        }, 500);
    };
    return(
        <>
        <Container align={'CENTER'} justify={'TOP'}>
            <Titles title={'Compañias'} level={1}/>
            <div className="companys__table" style={
                    {
                        width: '100%',
                    }
                }>
            <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem',

                    }}>
                        <SearchInput label={'Buscar Compañias'} onChange={e=> setSearch(e.target.value)} value={search} idSearch={'companySearch'} />
                        <Button text={'Crear Compañia'} onClick={() => setIsModalOpen(true)} fill={false}/>
                    </div>
                    
                    {
                        loading && <p>Cargando...</p>
                    }
                    {
                        error && <p>Ha ocurrido un error</p>
                    }
                    {
                        !loading && !error && dataCompanysFiltered.length === 0 && <p>No hay datos</p>
                    }
                    {
                        !loading && !error && dataCompanysFiltered.length > 0 && (
                
                <Table columns={columnsCompanys}
                    data={dataCompanysFiltered}
                    onRowClick={()=> null}
                    editableAction={{
                        label: 'Editar Compania',
                        onClick: (row: any) => {
                            setCompanyToEdit(row.id)
                            setIsModalOpen(true)
                        }} }
                deleteAction={{onClick:handleDelete}}
                />)
                }
            </div>
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