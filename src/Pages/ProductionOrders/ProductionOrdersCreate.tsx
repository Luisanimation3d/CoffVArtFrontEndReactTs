import { FormField} from '../../types/Form'
import { Button } from '../../components/Button/Button'
import { Form } from '../../components/Form/Form';
import { API_KEY } from '../../constantes';
import { useFetch } from '../../hooks/useFetch';
import { useState } from 'react';
import React from 'react';

export const ProductionOrdersCreate= ()=>{
    const [formValues, setFormValues] = useState<Record<string, string  | number>>({
        orderNumber: '',
        quantity: '',
    })

    const { post } = useFetch('https://coffvart-backend.onrender.com/api/');

    const companyFields: FormField[] = [
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

        const response = await fetch(`https://coffvart-backend.onrender.com/api/ProductionOrders?apikey=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            console.error('Error al crear la orden de producción:', response.statusText);
            // Puedes agregar más detalles de la respuesta si es necesario: response.json(), response.text(), etc.
            return;
        }

        console.log('orden de producción creada con éxito');

    } catch (error) {
        console.error('Error al crear la orden de producción', error);
    }
};
return (
    <Form
        title='Crear orden de producción'
        fields={companyFields}
        onSubmit={handleSubmit}
        button={<Button text='Crear orden de producción' onClick={() => handleSubmit} fill={true} />}
    />
);

}


