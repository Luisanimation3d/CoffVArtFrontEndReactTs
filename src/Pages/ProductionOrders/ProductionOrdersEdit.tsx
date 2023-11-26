import React, {useState, useEffect} from 'react';
import {useFetch} from '../../hooks/useFetch';
import {FormField, SelectOption} from '../../types/Form';
import {Button} from '../../components/Button/Button';
import {Form} from '../../components/Form/Form';
import {API_KEY} from '../../constantes';
import {useParams, useNavigate} from 'react-router-dom';


export const ProductionOrdersEdit = () => {
    const {id} = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [formValues, setFormValues] = useState<Record<string, string  | number>>({
        orderNumber: '',
        quantity: '',
    })
    const [error, setError] = useState<{}>({});
    const handleInputChangen = (value: SelectOption | undefined, name: string | number) => {
        setFormValues((prevValues: any) => ({
            ...prevValues,
            [name]:value,
        }));
    };
    const productionOrderFields: FormField[] = [
        {
            name: 'orderNumber',
            type: 'text',
            label: 'Numero de la orden',
            placeholder: '1',
            value: formValues.orderNumber !== undefined ? String(formValues.orderNumber): '',
            onChange: (value) => handleInputChange('orderNumber', value),
            size: 'medium'
        },
        {
            name: 'quantity',
            type: 'number',
            label: 'Cantidad (lb)',
            placeholder: '200',
            value: formValues.quality !== undefined ? String(formValues.quality): '',
            onChange: (value) => handleInputChange('quantity', value),
            size: 'medium'
        },
    ];

    // ...

// ...

    const {data, loading, error: errorFetch, get, put} = useFetch('https://coffvart-backend.onrender.com/api/')

    useEffect(() => {
        get(`productionOrders/${id}?apikey=${API_KEY}`)
    }, [id]);

    useEffect(() => {
        if (!loading) {
            const newValues = {
                orderNumber: data?.productionOrder.orderNumber,
                quantity: data?.productionOrder.quantity,
            }
            setFormValues(newValues)
        }
    }, [data]);


    const handleInputChange = (name: string, value: string | number) => {
        setFormValues((prevValues: any) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formValues, 'esto lo voy a mandar')
        const requestBody = {
            orderNumber: formValues.orderNumber,
            quantity: formValues.quantity,
        };
        console.log(requestBody, 'esto es lo que voy a mandar')
        put(`productionOrders/${id}?apikey=${API_KEY}`, requestBody)
        if (!errorFetch) {
            setTimeout(() => {
                navigate(-1)
            }, 500);
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <Form
            title='Editar orden de producción'
            fields={productionOrderFields}
            onSubmit={handleSubmit}
            button={<Button text='Editar orden de producción' onClick={() => null} fill={true} type={'SUBMIT'}/>}
            errors={error}
        />
    );
};
