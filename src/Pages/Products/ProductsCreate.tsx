import { Container } from '../../components/Container/Container.tsx';
import { FormRedisign } from '../../components/FormRedisign/FormRedisign.tsx';
import { FormField } from '../../types/Form';
import { useState } from 'react';
import { API_KEY } from '../../utils/constantes.ts';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const CreateProduct = () => {
	const [error, setError] = useState<{ [key: string]: string }>({});
	const navigate = useNavigate();

	const [formData, setFormData] = useState<{
		name: string;
		stockMin: string;
		stockMax: string;
		unitPrice: string;
		amountSupply: string;
		description: string;
	}>({
		name: '',
		stockMin: '',
		stockMax: '',
		unitPrice: '',
		amountSupply: '',
		description: '',
	});

	const fields: FormField[] = [
		{
			type: 'text',
			value: formData.name,
			onChange: (value: string) => setFormData({ ...formData, name: value }),
			label: 'Nombre',
			name: 'name',
			size: 'large',
		},
		{
			type: 'number',
			value: formData.stockMin,
			onChange: (value: string) =>
				setFormData((prev) => ({
					...formData,
					stockMin: validateIfNumber(value) ? value : prev.stockMin,
				})),
			label: 'Stock Minimo',
			name: 'stockMin',
			size: 'medium',
		},
		{
			type: 'number',
			value: formData.stockMax,
			onChange: (value: string) =>
				setFormData((prev) => ({
					...formData,
					stockMax: validateIfNumber(value) ? value : prev.stockMax,
				})),
			label: 'Stock Máximo',
			name: 'stockMax',
			size: 'medium',
		},
		{
			type: 'number',
			value: formData.unitPrice,
			onChange: (value: string) =>
				setFormData((prev) => ({
					...formData,
					unitPrice: validateIfNumber(value) ? value : prev.unitPrice,
				})),
			label: 'Precio Unitario',
			name: 'unitPrice',
			size: 'medium',
		},
		{
			type: 'number',
			value: formData.amountSupply,
			onChange: (value: string) =>
				setFormData((prev) => ({
					...formData,
					amountSupply: validateIfNumber(value) ? value : prev.amountSupply,
				})),
			label: 'Monto Insumo',
			name: 'amountSupply',
			size: 'medium',
		},
		{
			type: 'textarea',
			value: formData.description,
			onChange: (value: string) =>
				setFormData({ ...formData, description: value }),
			label: 'Descripción',
			name: 'description',
			size: 4,
		},
	];

	const validateIfNumber = (value: string) => {
		if (value.length === 0) return true;
		const regex = new RegExp('^[0-9]+$');
		return regex.test(value);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let mensajeError = {};
		if (!formData.name || formData.name.trim().length < 1 || !/^[a-zA-Z\d\u00C0-\u017F\s]+$/.test(formData.name)) {
			mensajeError = { ...mensajeError, name: 'El nombre es requerido' };
		}
		if (!formData.stockMin) {
			mensajeError = {
				...mensajeError,
				stockMin: 'El stock minimo es requerido',
			};
		}
		if (!formData.stockMax) {
			mensajeError = {
				...mensajeError,
				stockMax: 'El stock máximo es requerido',
			};
		}
		if (!formData.unitPrice) {
			mensajeError = {
				...mensajeError,
				unitPrice: 'El precio unitario es requerido',
			};
		}
		if (!formData.amountSupply) {
			mensajeError = {
				...mensajeError,
				amountSupply: 'La cantidad de insumos es requerida',
			};
		}
		if (!formData.description || formData.description.trim().length < 1 || !/^[a-zA-Z\d\u00C0-\u017F\s]+$/.test(formData.description)) {
			mensajeError = {
				...mensajeError,
				description: 'La descripción es requerida',
			};
		}
		if (Object.keys(mensajeError).length > 0) {
			console.log('Mensaje de error', mensajeError);
			setError(mensajeError);
			return;
		}
		try {
			const requestBody = {
				name: formData.name,
				stockMin: formData.stockMin,
				stockMax: formData.stockMax,
				unitPrice: formData.unitPrice,
				amountSupply: formData.amountSupply,
				description: formData.description,
			};
			console.log('Datos del formulario', requestBody);

			const response = await fetch(
				`https://coffvart-backend.onrender.com/api/products?apikey=${API_KEY}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(requestBody),
				}
			);
			console.log('Respuesta del servidor', response);

			if (response) {
				const data = await response.json();
				if (data.message == 'Producto creado correctamente') {
					toast(data.message, {
						icon: '👏',
						position: 'bottom-right',
					});
					setTimeout(() => {
						navigate(-1);
					}, 2000);
				}
			}
		} catch (error) {
			console.error('Error al crear el Producto', error);
		}
	};
	return (
		<Container>
			<FormRedisign
				fields={fields}
				onSubmit={handleSubmit}
				button={'Registrar Producto'}
				title={'Crear Producto'}
				errors={error}
			/>
			<Toaster
				position='top-center'
				reverseOrder={false}
				gutter={8}
				containerClassName=''
				containerStyle={{}}
				toastOptions={{
					className: '',
					duration: 5000,
					style: {
						background: '#363636',
						color: '#fff',
					},
					success: {
						duration: 3000,
						iconTheme: {
							primary: 'green',
							secondary: 'black',
						},
					},
				}}
			/>
		</Container>
	);
};

export default CreateProduct;
