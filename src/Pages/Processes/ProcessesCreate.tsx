import {FormField} from '../../types/Form'
import {Button} from '../../components/Button/Button'
import {Form} from '../../components/Form/Form';
import {API_KEY} from '../../utils/constantes.ts';
import {useFetch} from '../../hooks/useFetch';
import {useState} from 'react';
import React from 'react';
import {useNavigate} from 'react-router-dom';

export const ProcessesCreate = () => {
    const [formValues, setFormValues] = useState<Record<string, string | number>>({
        name: '',
        description: '',
    })

    const {post, loading, error} = useFetch('https://coffvart-backend.onrender.com/api/');
    const navigate = useNavigate()
    const processFields: FormField[] = [
        {
            name: 'name',
            type: 'text',
            label: 'Nombre del proceso',
            placeholder: 'Tostamiento',
            value: formValues['name'] !== undefined ? String(formValues['name']) : '',
            onChange: (value) => handleInputChange('name', value),
            size: 'medium'
        },
        {
            name: 'description',
            type: 'text',
            label: 'Descripción',
            placeholder: 'proceso que define el estado...',
            value: formValues['description'] !== undefined ? String(formValues['description']) : '',
            onChange: (value) => handleInputChange('description', value),
            size: 'medium'
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
                description: formValues.description,
            };
            console.log('Datos del formulario:', requestBody);

            post(`processes?apikey=${API_KEY}`, requestBody)
            console.log(loading, error);
            console.log('proceso creado con éxito');
            navigate(-1);


        } catch (error) {
            console.error('Error al crear el proceso', error);
        }
    };
    return (
        <Form
            title='Crear Proceso'
            fields={processFields}
            onSubmit={handleSubmit}
            button={<Button text='Crear Proceso' onClick={() => handleSubmit} fill={true} type={'SUBMIT'}/>}
        />
    );

}

export default ProcessesCreate;