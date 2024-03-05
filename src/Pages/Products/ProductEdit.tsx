import React, {useState, useEffect} from 'react';
import {useFetch} from '../../hooks/useFetch';
import {FormField, SelectOption} from '../../types/Form';
import {FormRedisign} from '../../components/FormRedisign/FormRedisign';
import {API_KEY, API_URL} from '../../constantes';
import {useParams, useNavigate} from 'react-router-dom';
import {Container} from "../../components/Container/Container.tsx";
import toast, {Toaster} from "react-hot-toast";


export const ProductsEdit = () => {

    const {id} = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [error, setError] = useState<{}>({})
    const [tipo, setTipo] = useState<SelectOption | undefined>();




    const [formData, setFormData] = useState<{
        name: string,
        amount: string,
        stockMin: string,
        stockMax: string,
        unitPrice: string,
        amountSupply: string,
        description: string,
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
            onChange: (value: string) => setFormData({...formData, name: value}),
            label: 'Nombre',
            name: 'name',
            size: 'medium',
        },
        {
            type: 'number',
            value: formData.amount,
            onChange: (value: string) => setFormData(prev => ({
                ...formData,
                amount: validateIfNumber(value) ? value : prev.amount
            })),
            label: 'Cantidad',
            name: 'amount',
            size: 'medium',
        },
        {
            type: 'number',
            value: formData.stockMin,
            onChange: (value: string) => setFormData(prev => ({
                ...formData,
                stockMin: validateIfNumber(value) ? value : prev.stockMin
            })),
            label: 'Stock Minimo',
            name: 'stockMin',
            size: 'medium',
        },
        {
            type: 'number',
            value: formData.stockMax,
            onChange: (value: string) => setFormData(prev => ({
                ...formData,
                stockMax: validateIfNumber(value) ? value : prev.stockMax
            })),
            label: 'Stock Máximo',
            name: 'stockMax',
            size: 'medium',
        },  {
            type: 'number',
            value: formData.unitPrice,
            onChange: (value: string) => setFormData(prev => ({
                ...formData,
                unitPrice: validateIfNumber(value) ? value : prev.unitPrice
            })),
            label: 'Precio Unitario',
            name: 'unitPrice',
            size: 'medium',
        },
        {
            type: 'number',
            value: formData.amountSupply,
            onChange: (value: string) => setFormData(prev => ({
                ...formData,
                amountSupply: validateIfNumber(value) ? value : prev.amountSupply
            })),
            label: 'Monto Insumo',
            name: 'amountSupply',
            size: 'medium',
        },
        {
            type: 'textarea',
            value: formData.description,
            onChange: (value: string) => setFormData({...formData, description: value}),
            label: 'Descripción',
            name: 'description',
            size: 4,
        },
    ]


    const validateIfNumber = (value: string) => {
        if (value.length === 0) return true
        const regex = new RegExp('^[0-9]+$')
        return regex.test(value)
    }

    const {data, loading, error: errorFetch, get, put} = useFetch(API_URL)

    useEffect(() => {
        get(`products/${id}?apikey=${API_KEY}`)
    }, []);

    useEffect(() => {
        if (!loading) {
            const newValues = {
                name: data?.product?.name,
                amount: data?.product?.amount,
                stockMin: data?.product?.stockMin,
                stockMax: data?.product?.stockMax,
                unitPrice: data?.product?.unitPrice,
                amountSupply: data?.product?.amountSupply,
                description: data?.product?.description
            }
            setFormData(newValues)
        }
    }, [data]);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let mensajeError = {}
        if (!formData.name) {
            mensajeError = {...mensajeError, name: 'El nombre es requerido'}
        }
        if (!formData.amount) {
            mensajeError = {...mensajeError, amount: 'La cantidad es requerida'}
        }
        if (!formData.stockMin) {
            mensajeError = {...mensajeError, stockMin: 'El stock minimo es requerido'}
        }
        if (!formData.stockMax) {
            mensajeError = {...mensajeError, stockMax: 'El stock máximo es requerido'}
        }
        if (!formData.unitPrice) {
            mensajeError = {...mensajeError, unitPrice: 'El precio unitario es requerido'}
        }
        if (!formData.amountSupply) {
            mensajeError = {...mensajeError, amountSupply: 'La cantidad de insumos es requerida'}
        }
        if (!formData.description) {
            mensajeError = {...mensajeError, description: 'La descripción es requerida'}
        }
        console.log(formData, 'esto lo voy a mandar')
        const requestBody = {
            name: formData.name,
            amount: formData.amount,
            stockMin: formData.stockMin,
            stockMax: formData.stockMax,
            unitPrice: formData.unitPrice,
            amountSupply: formData.amountSupply,
            description: formData.description,
        };
        console.log(requestBody, 'esto es lo que voy a mandar')
        put(`products/${id}?apikey=${API_KEY}`, requestBody)
        if (!errorFetch) {
            // setTimeout(() => {
            //     navigate(-1)
            // }, 500);
        }
    };

    useEffect(() => {
		if (data.message == 'Producto actualizado correctamente' && !errorFetch) {
			toast(data.message, {
				icon: '👏',
				position: 'bottom-right',
			});
			setTimeout(() => {
				navigate(-1);
			}, 2000);
		}
	}, [data, errorFetch]);

    return (
        <Container>
            <FormRedisign
                title='Editar Producto'
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

export default ProductsEdit;
