import { FormField} from '../../types/Form'
import { Button } from '../../components/Button/Button'
import { Form } from '../../components/Form/Form';
import { API_KEY } from '../../constantes';
import { useFetch } from '../../hooks/useFetch';
import { useState } from 'react';
import React from 'react';

export const SuppliersCreate= ()=>{
    const [formValues, setFormValues] = useState<Record<string, string  | number>>({
        name: '',
        nit: '',
        coffeType: '',
        address: '', 
        phone: '',
        quality:'',
        unitCost:'',
    })

    const { post } = useFetch('https://coffvart-backend.onrender.com/api/');

    const supplierFields: FormField[] = [
    {
        name: 'name',
        type: 'text',
        label: 'Nombre del proveedor',
        placeholder: 'proveedor S.A.S',
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
        name: 'coffeType',
        type: 'text',
        label: 'Tipo de café',
        placeholder: 'pergamino',
        value: formValues['coffeType'] !== undefined ? String(formValues['coffeType']): '',
        onChange: (value) => handleInputChange('coffeType', value),
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
    {
        name: 'quality',
        type: 'text',
        label: 'Calidad',
        placeholder: 'Premiun',
        value: formValues['quality'] !== undefined ? String(formValues['quality']): '',
        onChange: (value) => handleInputChange('quality', value),
        size:'medium'
    },
    {
        name: 'unitCost',
        type: 'number',
        label: 'Costo bulto',
        placeholder: 'Premiun',
        value: formValues['unitCost'] !== undefined ? String(formValues['unitCost']): '',
        onChange: (value) => handleInputChange('unitCost', value),
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
            coffeType: formValues.coffeType,
            address: formValues.address,
            phone: formValues.phone,
            quality: formValues.quality,
            unitCost: formValues.unitCost,
        }; console.log('Datos del formulario:', requestBody);

        const response = await fetch(`https://coffvart-backend.onrender.com/api/suppliers?apikey=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            console.error('Error al crear el proveedor:', response.statusText);
            // Puedes agregar más detalles de la respuesta si es necesario: response.json(), response.text(), etc.
            return;
        }

        console.log('proveedor creado con éxito');

    } catch (error) {
        console.error('Error al crear el proveedor', error);
    }
};
return (
    <Form
        title='Crear proveedor'
        fields={supplierFields}
        onSubmit={handleSubmit}
        button={<Button text='Crear proveedor' onClick={() => handleSubmit} fill={true} />}
    />
);

}


