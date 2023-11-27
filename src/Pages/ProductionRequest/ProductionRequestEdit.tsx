import React, {useState, useEffect} from 'react';
import {useFetch} from '../../hooks/useFetch';
import {FormField, SelectOption} from '../../types/Form';
import {Button} from '../../components/Button/Button';
import {Form} from '../../components/Form/Form';
import {API_KEY} from '../../constantes';
import {useParams, useNavigate} from 'react-router-dom';


export const ProductionRequestEdit = () => {
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
    const productionRequestFields: FormField[] = [
        {
            name: 'requestNumber',
            type: 'text',
            label: 'Numero de la solicitud',
            placeholder: '1',
            value: formValues['requestNumber'] !== undefined ? String(formValues['requestNumber']): '',
            onChange: (value) => handleInputChange('requestNumber', value),
            size: 'medium'
        },
        {
            name: 'dateOfDispatch',
            type: 'date',
            label: 'Fecha de envio',
            placeholder: '20/11/2023',
            value: formValues['dateOfDispatch'] !== undefined ? String(formValues['dateOfDispatch']): '',
            onChange: (value) => handleInputChange('dateOfDispatch', value),
            size: 'medium'
        },
        {
            name: 'quantity',
            type: 'number',
            label: 'Cantidad (lb)',
            placeholder: '200',
            value: formValues['quantity'] !== undefined ? String(formValues['quantity']): '',
            onChange: (value) => handleInputChange('quantity', value),
            size: 'medium'
        },
    ];

    // ...

// ...

    const {data, loading, error: errorFetch, get, put} = useFetch('https://coffvart-backend.onrender.com/api/')

    useEffect(() => {
        get(`productionRequest/${id}?apikey=${API_KEY}`)
    }, [id]);

    useEffect(() => {
        if (!loading) {
            const newValues = {
                requestNumber: data?.productionRequest.requestNumber,
                dateOfDispatch: data?.productionRequest.dateOfDispatch,
                quantity: data?.productionRequest.quantity,
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
            requestNumber: formValues.requestNumber,
            dateOfDispatch: formValues.dateOfDispatch,
            quantity: formValues.quantity,
        };
        console.log(requestBody, 'esto es lo que voy a mandar')
        put(`productionRequest/${id}?apikey=${API_KEY}`, requestBody)
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
            title='Editar solicitud de producción'
            fields={productionRequestFields}
            onSubmit={handleSubmit}
            button={<Button text='Editar solicitud de producción' onClick={() => null} fill={true} type={'SUBMIT'}/>}
            errors={error}
        />
    );
};
