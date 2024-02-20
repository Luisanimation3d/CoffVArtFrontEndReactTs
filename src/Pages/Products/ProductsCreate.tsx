import { Container } from '../../components/Container/Container.tsx';
import { FormRedisign } from '../../components/FormRedisign/FormRedisign.tsx';
import { FormField,  } from '../../types/Form';
import { useState,  } from 'react';
import { API_KEY, } from '../../constantes.ts';

export const CreateProduct = () => {
	const [error, setError] = useState<{ [key: string]: string }>({});

	const [formData, setFormData] = useState<{
		name: string;
		amount: string;
		stockMin: string;
		stockMax: string;
		unitPrice: string;
		amountSupply: string;
		description: string;
	}>({
		name: '',
		amount: '',
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
			size: 'medium',
		},
		{
			type: 'number',
			value: formData.amount,
			onChange: (value: string) =>
				setFormData((prev) => ({
					...formData,
					amount: validateIfNumber(value) ? value : prev.amount,
				})),
			label: 'Cantidad',
			name: 'amount',
			size: 'medium',
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
	]

	const validateIfNumber = (value: string) => {
		if (value.length === 0) return true;
		const regex = new RegExp('^[0-9]+$');
		return regex.test(value);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let mensajeError = {};
		if (!formData.name) {
			mensajeError = { ...mensajeError, name: 'El nombre es requerido' };
		}
		if (!formData.amount) {
			mensajeError = { ...mensajeError, amount: 'La cantidad es requerida' };
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
		if (!formData.description) {
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
				amount: formData.amount,
				stockMin: formData.stockMin,
				stockMax: formData.stockMax,
				unitPrice: formData.unitPrice,
				amountSupply: formData.amountSupply,
				description: formData.description,
			};
			console.log('Datos del formulario', requestBody);

			const response = await fetch(`https://coffvart-backend.onrender.com/api/products?apikey=${API_KEY}`, {
				method: 'POST',
				headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(requestBody),
				});
			console.log('Respuesta del servidor', response);

			if (!response.ok) {
				console.error('Error al crear el producto', response.statusText);
				return;
			}
			console.log('Producto creado con éxito');
		} catch (error) {
			console.error('Error al crear el usuario', error);
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
		</Container>
	);
};

export default CreateProduct;