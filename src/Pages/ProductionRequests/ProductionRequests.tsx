import { Column } from '../../types/Table';
//import { Table } from '../../components/Table/Table.tsx';
//import { Titles } from '../../components/Titles/Titles.tsx';
import { Container } from '../../components/Container/Container.tsx';
import { useEffect, useState } from 'react';
//import { SearchInput } from '../../components/SearchInput/SearchInput.tsx';
import { useNavigate } from 'react-router-dom';
//import { Button } from '../../components/Button/Button.tsx';
import { useFetch } from '../../hooks/useFetch.tsx';
import { API_KEY, API_URL } from '../../utils/constantes.ts';
import { EditProcessRModal } from '../../Modales/EditProcessModal/EditProcessRModal.tsx';
import { createPortal } from 'react-dom';
import { TableRedisign } from '../../components/TableRedisign/TableRedisign.tsx';
import { FiShuffle } from 'react-icons/fi';

export const ProductionRequests = () => {
	const [search, setSearch] = useState<string>('');
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const { data, loading, get } = useFetch(API_URL);
    const [page, setPage] = useState<number>(1)
	const [dataProductionRequestsModify, setDataProductionRequestsModify] =
		useState<any>([]);
	const navigate = useNavigate();
	useEffect(() => {
		get(`productionRequests?apikey=${API_KEY}`);
	}, []);

	const columnsProductionRequest: Column[] = [
		{
			key: 'id',
			header: 'Número de Solicitud',
		},
		{
			key: 'supplie',
			header: 'Insumo',
		},
		{
			key: 'quantity',
			header: 'Cantidad',
			render: (cell: string | number) => {
				return (
					cell.toLocaleString('es-CO', {
						minimumFractionDigits: 0,
					}) + ` kg`
				);
			},
		},
		{
			key: 'company',
			header: 'Compañia',
		},
		{
			key: 'dateOfDispatch',
			header: 'Fecha de Envio',
		},

		{
			key: 'state',
			header: 'Proceso',
		},
	];

	useEffect(() => {
		if (data?.ProductionRequests?.rows) {
			console.log('Entra');
			const newProductionRequestsData = data?.ProductionRequests?.rows.map(
				(productionRequest: any) => {
					return {
						...productionRequest,
						state: productionRequest?.process?.name,
						supplie: productionRequest?.supply?.name,
						company: productionRequest?.company?.name,
						dateOfDispatch: productionRequest.dateOfDispatch.substring(0, 10),
					};
				}
			);

			setDataProductionRequestsModify(newProductionRequestsData);
		}
	}, [data]);
	const [idEdit, setidEdit] = useState(0);

	const dataProductionRequests = dataProductionRequestsModify || [];

	//const dataProductionRequests= data?.ProductionRequests?.rows|| [];
	let dataProductionRequestsFiltered: any;

    if(search !=''){
        dataProductionRequestsFiltered = dataProductionRequestsModify?.productionRequests?.rows.filter((productionRequest:any )=>
           productionRequest.id?.toLowerCase().includes(search.toLowerCase())
        || productionRequest.dateOfDispatch?.toLowerCase().includes(search.toLowerCase())
        || productionRequest.quantity?.tolowerCase().includes(search.toLowerCase())
        || productionRequest.process?.toLowerCase().includes(search.toLowerCase())
        )
    }else{
        dataProductionRequestsFiltered = dataProductionRequests
    }
    useEffect(() => {
        if (!isModalOpen) {
          get(`productionRequests?apikey=${API_KEY}`);
        }
      }, [isModalOpen]);
      
    const handleCallback = (row: {[key : string] : string | number}, type: string | number) => {
        
        if(type === 'Cambiar proceso'){
            setidEdit(row.id as number)
            setIsModalOpen(true)
        }
        
    }
    const options = [
        /*{
            label: 'Cambiar estado',
            icon: <FiShuffle/>
        },*/
        {
            label: 'Cambiar proceso',
            icon: <FiShuffle/>
        }
    ]
    
    return(
        <>
        <Container align={'CENTER'} justify={'TOP'}>
        <TableRedisign
                    columns={columnsProductionRequest}
                    data={dataProductionRequestsFiltered}
                    search={search}
                    setSearch={setSearch}
                    title={'Solicitudes de Producción'}
                    page={page || 1}
                    setPage={setPage}
                    totalPages={Math.ceil(data?.productionRequests?.count / data?.options?.limit) || 1}
                    pagination={true}
                    createAction={() => navigate('/admin/ProductionRequests/create')}
                    loading={loading}
                    callback={handleCallback}
                    dropDownOptions={options}
                />
            {
                    isModalOpen && createPortal(
                        <>
                            <EditProcessRModal
                            id= {idEdit}
                            setIsModalOpen={setIsModalOpen}
                            title="Cambiar proceso"/>
                        </>,
                        document.getElementById('modal') as HTMLElement
                    )
                }
        </Container>
    </>
    )
}

export default ProductionRequests;
