import { FormField} from '../../types/Form'
import { Button } from '../../components/Button/Button'
import { Form } from '../../components/Form/Form';
import { API_KEY } from '../../constantes';
import { useFetch } from '../../hooks/useFetch';
import { useState } from 'react';
import React from 'react';

export const ProductionRequestCreate= ()=>{
    const [formValues, setFormValues] = useState<Record<string, string  | number>>({
        requestNumber: '',
        dateOfDispatch: '',
        quantity: '',
    })

    const { post } = useFetch('https://coffvart-backend.onrender.com/api/');

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
            requestNumber: formValues.requestNumber,
            dateOfDispatch: formValues.dateOfDispatch,
            quantity: formValues.quantity,
        }; console.log('Datos del formulario:', requestBody);

        const response = await fetch(`https://coffvart-backend.onrender.com/api/ProductionRequest?apikey=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            console.error('Error al crear la solicitud de producción:', response.statusText);
            // Puedes agregar más detalles de la respuesta si es necesario: response.json(), response.text(), etc.
            return;
        }

        console.log('solicitud de producción creada con éxito');

    } catch (error) {
        console.error('Error al crear la solicitud de producción', error);
    }
};
return (
    <Form
        title='Crear solicitud de producción'
        fields={productionRequestFields}
        onSubmit={handleSubmit}
        button={<Button text='Crear solicitud de producción' onClick={() => handleSubmit} fill={true} />}
    />
);

}


