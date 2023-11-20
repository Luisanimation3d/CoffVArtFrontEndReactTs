import  { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { FormField, SelectOption } from '../../types/Form';
import { Button } from '../../components/Button/Button';
import { Form } from '../../components/Form/Form';
import { API_KEY } from '../../constantes';
import React from 'react';


export const CustomersCreate = () => {
    const options: SelectOption[] = [
        {
            value: 'CC',
            label: 'CC',
        },
        {
            value: 'TI',
            label: 'TI',
        }
    ];

    /*const optionsState: SelectOption[] = [
        {
            value: 'Activo',
            label: 'Activo',
        },
        {
            value: 'Inactivo',
            label: 'Inactivo',
        }
    ];*/

    const [tipo, setTipo] = useState<SelectOption | undefined>();
    const [formValues, setFormValues] = useState<Record<string, string  | number>>({
        name: '',
        documentType: '',
        document: '',
        phone: '',
        email: '',
        address: '',
    })

    const { post } = useFetch('https://coffvart-backend.onrender.com/api/');


    const customerFields: FormField[] = [
        {
            name: 'name',
            type: 'text',
            label: 'Nombre',
            placeholder: 'Nombre',
            value: formValues['name'] !== undefined ? String(formValues['name']): '',
            onChange: (value) => handleInputChange('name', value),
            size: 'large'
        },
        {
            name: 'documentType',
            type: 'select',
            label: 'Tipo de documento',
            placeholder: 'Tipo de documento',
            value: tipo,
            options: options,
            onChange: (o) => setTipo(o),
            size: 'medium'
        },
        {
            name: 'document',
            type: 'number',
            label: 'Documento',
            placeholder: 'Documento',
            value: formValues['document'] !== undefined ? String(formValues['document']): '',
            onChange: (value) => handleInputChange('document', value),
            size: 'large'
        },
        {
            name: 'phone',
            type: 'text',
            label: 'Telefono',
            placeholder: 'Telefono',
            value: formValues['phone'] !== undefined ? String(formValues['phone']): '',
            onChange: (value) => handleInputChange('phone', value),
            size: 'large'
        },
        {
            name: 'email',
            type: 'email',
            label: 'Email',
            placeholder: 'Email',
            value: formValues['email'] !== undefined ? String(formValues['email']): '',
            onChange: (value) => handleInputChange('email', value),
            size: 'large'
        },
        {
            name: 'address',
            type: 'text',
            label: 'Dirección',
            placeholder: 'Dirección',
            value: formValues['address'] !== undefined ? String(formValues['address']): '',
            onChange: (value) => handleInputChange('address', value),
            size: 'large'
        },
    ];
    const handleInputChange = (name: string, value: string | number) => {
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const requestBody = {
                name: formValues.name,
                documentType: tipo?.value,
                document: formValues.document,
                phone: formValues.phone,
                email: formValues.email,
                address: formValues.address,
            };
    
            console.log('Datos del formulario:', requestBody);
    
            const response = await fetch(`https://coffvart-backend.onrender.com/api/coustumers?apikey=${API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
    
            if (!response.ok) {
                console.error('Error al crear el cliente:', response.statusText);
                // Puedes agregar más detalles de la respuesta si es necesario: response.json(), response.text(), etc.
                return;
            }
    
            console.log('Cliente creado con éxito');
    
        } catch (error) {
            console.error('Error al crear el cliente', error);
        }
    };
    

    return (
        <Form
            title='Crear Cliente'
            fields={customerFields}
            onSubmit={handleSubmit}
            button={<Button text='Crear Cliente' onClick={handleSubmit} fill={true} />}
        />
    );
};
