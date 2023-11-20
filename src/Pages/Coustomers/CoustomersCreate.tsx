import React, { ChangeEvent, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { FormField, SelectOption } from '../../types/Form';
import { Button } from '../../components/Button/Button';
import { Form } from '../../components/Form/Form';
import { API_KEY } from '../../constantes';


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

    const optionsState: SelectOption[] = [
        {
            value: 'Activo',
            label: 'Activo',
        },
        {
            value: 'Inactivo',
            label: 'Inactivo',
        }
    ];

    const [state, setState] = useState<SelectOption | undefined>();
    const [tipo, setTipo] = useState<SelectOption | undefined>();
    const [formValues, setFormValues] = useState<Record<string, string  | number>>({
        name: '',
        documentType: '',
        document: '',
        phone: '',
        email: '',
        address: '',
        state: '',
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
            type: 'number',
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
        {
            name: 'state',
            type: 'select',
            label: 'Estado',
            placeholder: 'Estado',
            value: state,
            onChange: (o) => setState(o),
            options: optionsState,
            size: 'medium'
        }
    ];
    const handleInputChange = (name: string, value: string | number) => {
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };
    const handleSubmit = async () => {
        try {
            const isActivo = state?.value === 'Activo';
            const requestBody = {
                name: formValues.name,
                documentType: tipo?.value,
                document: formValues.document,
                phone: formValues.phone,
                email: formValues.email,
                address: formValues.address,
                state: isActivo
            };

            await post(`coustumers?apikey=${API_KEY}`, requestBody);
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
