import React, { useState, useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { FormField, SelectOption } from '../../types/Form';
import { FormRedisign } from '../../components/FormRedisign/FormRedisign';
import { API_KEY, API_URL } from '../../utils/constantes.ts';
import { useParams, useNavigate } from 'react-router-dom';
import { Container } from '../../components/Container/Container.tsx';
import toast, { Toaster } from 'react-hot-toast';

export const SuppliesEdit = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [error, setError] = useState<{}>({});
	const [tipo, setTipo] = useState<SelectOption | undefined>();

	const [formData, setFormData] = useState<{
		name: string;
		description: string;
	}>({
		name: '',
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
			type: 'textarea',
			value: formData.description,
			onChange: (value: string) =>
				setFormData({ ...formData, description: value }),
			label: 'Descripción',
			name: 'description',
			size: 4,
		},
	];

	const { data, loading, error: errorFetch, get, put } = useFetch(API_URL);

	useEffect(() => {
		get(`supplies/${id}?apikey=${API_KEY}`);
	}, []);

	useEffect(() => {
		if (!loading) {
			const newValues = {
				name: data?.supply?.name,
				description: data?.supply?.description,
			};
			setFormData(newValues);
		}
	}, [data]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let mensajeError = {};
		if (!formData.name || formData.name.trim().length < 4 || !/^[a-zA-Z\s]+$/.test(formData.name)) {
            mensajeError = {...mensajeError, name: 'El nombre es requerido'}
        }
        if (!formData.description || formData.description.trim().length < 5 || !/^[a-zA-Z\s]+$/.test(formData.description)){
            mensajeError = {...mensajeError, description: 'La descripción es requerida'}
        }
		if (Object.keys(mensajeError).length > 0) {
			console.log('Mensaje de error', mensajeError)
			setError(mensajeError)
			return
		}
		console.log(formData, 'esto lo voy a mandar');
		const requestBody = {
			name: formData.name,
			description: formData.description,
		};
		console.log(requestBody, 'esto es lo que voy a mandar');
		put(`supplies/${id}?apikey=${API_KEY}`, requestBody);
		if (!errorFetch) {
			// setTimeout(() => {
			//     navigate(-1)
			// }, 500);
		}
	};

	useEffect(() => {
		if (data.message == 'Insumo actualizado correctamente' && !errorFetch) {
			toast(data.message, {
				icon: '👏',
				position: 'bottom-right',
			});
			setTimeout(() => {
				navigate(-1);
			}, 1000);
		}
	}, [data, errorFetch]);
	return (
		<Container>
			<FormRedisign
				title='Editar Insumo'
				fields={fields}
				onSubmit={handleSubmit}
				button={'Guardar'}
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

export default SuppliesEdit;
