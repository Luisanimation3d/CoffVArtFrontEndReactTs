import { FormField} from '../../types/Form'
import { Button } from '../../components/Button/Button'
import { Form } from '../../components/Form/Form';
import { API_KEY } from '../../constantes';
import { useFetch } from '../../hooks/useFetch';
import { useState } from 'react';
import React from 'react';

export const CompanysCreate= ()=>{
    const [formValues, setFormValues] = useState<Record<string, string  | number>>({
        name: '',
        nit: '',
        email: '',
        address: '', 
        phone: '',
    })

    const { post } = useFetch('https://coffvart-backend.onrender.com/api/');

    const companyFields: FormField[] = [
    {
        name: 'name',
        type: 'text',
        label: 'Nombre de la compañia',
        placeholder: 'Compañia S.A.S',
        value: formValues['name'] !== undefined ? String(formValues['name']): '',
        onChange: (value) => handleInputChange('name', value),
        size: 'medium'
    },
    {
        name: 'nit',
        type: 'text',
        label: 'NIT',
        placeholder: '10122012334-5',
        value: formValues['nit'] !== undefined ? String(formValues['nit']): '',
        onChange: (value) => handleInputChange('nit', value),
        size: 'medium'
    },
    {
        name: 'email',
        type: 'email',
        label: 'Correo',
        placeholder: 'Compañia@company.com',
        value: formValues['email'] !== undefined ? String(formValues['email']): '',
        onChange: (value) => handleInputChange('email', value),
        size: 'medium'
    },
    {
        name: 'address',
        type: 'text',
        label: 'Dirección',
        placeholder: 'Cra 00 # 00 - 00',
        value: formValues['address'] !== undefined ? String(formValues['address']): '',
        onChange: (value) => handleInputChange('address', value),
        size:'medium'
    },
    {
        name: 'phone',
        type: 'text',
        label: 'Teléfono',
        placeholder: '300 000 00 00',
        value: formValues['phone'] !== undefined ? String(formValues['phone']): '',
        onChange: (value) => handleInputChange('phone', value),
        size:'medium'
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
            name: formValues.name,
            nit: formValues.nit,
            email: formValues.email,
            address: formValues.address,
            phone: formValues.phone,
        }; console.log('Datos del formulario:', requestBody);

        const response = await fetch(`https://coffvart-backend.onrender.com/api/companys?apikey=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            console.error('Error al crear la compañia:', response.statusText);
            // Puedes agregar más detalles de la respuesta si es necesario: response.json(), response.text(), etc.
            return;
        }

        console.log('compañia creada con éxito');

    } catch (error) {
        console.error('Error al crear la compañia', error);
    }
};
return (
    <Form
        title='Crear Compañia'
        fields={companyFields}
        onSubmit={handleSubmit}
        button={<Button text='Crear Compañia' onClick={() => handleSubmit} fill={true} />}
    />
);

}


