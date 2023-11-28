import { FormField} from '../../types/Form'
import { Button } from '../../components/Button/Button'
import { Form } from '../../components/Form/Form';
import { API_KEY } from '../../constantes';
import { useFetch } from '../../hooks/useFetch';
import { useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const ProductionOrdersCreate= ()=>{
    const [formValues, setFormValues] = useState<Record<string, string  | number>>({
        orderNumber: '',
        quantity: '',
    })

    const { post,loading,error } = useFetch('https://coffvart-backend.onrender.com/api/');
    const navigate = useNavigate()
    const productionOrderFields: FormField[] = [
    {
        name: 'orderNumber',
        type: 'text',
        label: 'Numero de la orden',
        placeholder: '1',
        value: formValues['orderNumber'] !== undefined ? String(formValues['orderNumber']): '',
        onChange: (value) => handleInputChange('orderNumber', value),
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
const handleInputChange = (name: string, value: string | number) => {
    setFormValues(prevValues => ({
        ...prevValues,
        [name]: value
    }));
};
const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        const requestBody = {
            orderNumber: formValues.orderNumber,
            quantity: formValues.quantity,
        }; console.log('Datos del formulario:', requestBody);

        post(`productionOrders?apikey=${API_KEY}`, requestBody)
        console.log(loading, error)
        console.log('orden de producción creada con éxito');
        navigate(-1);

        

    } catch (error) {
        console.error('Error al crear la orden de producción', error);
    }
};
return (
    <Form
        title='Crear orden de producción'
        fields={productionOrderFields}
        onSubmit={handleSubmit}
        button={<Button text='Crear orden de producción' onClick={() => handleSubmit} fill={true} type={'SUBMIT'}/>}
    />
);

}


