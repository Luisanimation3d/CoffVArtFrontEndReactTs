import { Column } from '../../types/Table';
import { Container } from '../../components/Container/Container';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { API_KEY } from '../../utils/constantes.ts';
import { CreateProductModal } from '../../Modales/CreateProductModal/CreateProductModal';
import { ProductEditModal } from '../../Modales/EditProductModal/EditProductModal.tsx';
import { createPortal } from 'react-dom';
import { TableRedisign } from '../../components/TableRedisign/TableRedisign.tsx';
import { FiShuffle } from 'react-icons/fi';

export const Products = () => {
	const [search, setSearch] = useState<string>('');
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [productToEdit, setProductToEdit] = useState<number | null>(null);
	const { data, loading, get, del } = useFetch(
		'https://coffvart-backend.onrender.com/api/'
	);
	// const [dataToShow, setDataToShow] = useState<any[]>([]);
	const navigate = useNavigate();
	const [page, setPage] = useState<number>(1);

	useEffect(() => {
		get(`products?apikey=${API_KEY}`);
	}, []);

	const columnsProducts: Column[] = [
		{ key: 'id', header: 'ID' },
		{ key: 'name', header: 'Nombre' },
		{ key: 'amount', header: 'Cantidad' },
		{ key: 'stockMin', header: 'Stock Minimo' },
		{ key: 'stockMax', header: 'Stock Máximo' },
		{
			key: 'unitPrice',
			header: 'Precio Unitario',
			render: (cell: string | number) => {
				return cell.toLocaleString('es-CO', {
					style: 'currency',
					currency: 'COP',
					minimumFractionDigits: 0,
				});
			},
		},
		{ key: 'description', header: 'Descripción' },
		{ key: 'state', header: 'Estado' },
	];

	// const dataProducts = data?.products?.rows || [];
	const dataProducts = data?.products?.rows || [];
	let dataProductsFiltered: any[];

	if (search.length > 0) {
		dataProductsFiltered = dataProducts.filter(
			(product: any) =>
				product.name.toLowerCase().includes(search.toLowerCase()) ||
				product.unitPrice.toString().includes(search)
		);
	} else {
		dataProductsFiltered = dataProducts;
	}

	const handleCallback = (
		row: { [key: string]: string | number },
		type: string | number
	) => {
		if (type === 'Cambiar estado') {
			del(`products/${row.id}?apikey=${API_KEY}`);
			setTimeout(() => {
				get(`products?apikey=${API_KEY}`);
			}, 500);
		} else if (type === 'Editar') {
			console.log(row, 'Row');
			navigate(`/admin/Products/edit/${row.id}`);
		}
	};
	const options = [
		{
			label: 'Cambiar estado',
			icon: <FiShuffle />,
		},
		{
			label: 'Editar',
			icon: <FiShuffle />,
		},
	];

	return (
		<>
			<Container align={'CENTER'} justify={'TOP'}>
				<TableRedisign
					columns={columnsProducts}
					data={dataProductsFiltered}
					search={search}
					setSearch={setSearch}
					title={'Productos'}
					page={page || 1}
					setPage={setPage}
					totalPages={Math.ceil(data?.users?.count / data?.options?.limit) || 1}
					pagination={true}
					dropDownOptions={options}
					createAction={() => navigate('/admin/products/create')}
					loading={loading}
					onRowClick={(row) => alert(row.name)}
					callback={handleCallback}
				/>
				{isModalOpen &&
					createPortal(
						<>
							{productToEdit ? (
								<ProductEditModal
									setIsModalOpen={setIsModalOpen}
									idProduct={productToEdit}
									setIdEdit={setProductToEdit}
								/>
							) : (
								<CreateProductModal
									setIsModalOpen={setIsModalOpen}
									title='Crear Producto'
								/>
							)}
						</>,
						document.getElementById('modal') as HTMLElement
					)}
			</Container>
		</>
	);
};

export default Products;
