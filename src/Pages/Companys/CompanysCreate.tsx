import {FormField} from '../../types/Form'
import {Button} from '../../components/Button/Button'
import {Form} from '../../components/Form/Form';
import {API_KEY, API_URL} from '../../constantes';
import {useFetch} from '../../hooks/useFetch';
import {useState} from 'react';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Container} from "../../components/Container/Container.tsx";
import {FormRedisign} from "../../components/FormRedisign/FormRedisign.tsx";

export const CompanysCreate = () => {
    const [formValues, setFormValues] = useState<Record<string, string | number>>({
        name: '',
        nit: '',
        email: '',
        address: '',
        phone: '',
    })

    const {post, loading, error} = useFetch(API_URL);
    const navigate = useNavigate()
    const companyFields: FormField[] = [
        {
            name: 'nit',
            type: 'text',
            label: 'NIT',
            placeholder: '10122012334-5',
            value: formValues['nit'] !== undefined ? String(formValues['nit']) : '',
            onChange: (value) => handleInputChange('nit', value),
            size: 'medium'
        },
        {
            name: 'name',
            type: 'text',
            label: 'Nombre de la compañia',
            placeholder: 'Compañia S.A.S',
            value: formValues['name'] !== undefined ? String(formValues['name']) : '',
            onChange: (value) => handleInputChange('name', value),
            size: 'medium'
        },
        {
            name: 'address',
            type: 'text',
            label: 'Dirección',
            placeholder: 'Cra 00 # 00 - 00',
            value: formValues['address'] !== undefined ? String(formValues['address']) : '',
            onChange: (value) => handleInputChange('address', value),
            size: 'medium'
        },
        {
            name: 'phone',
            type: 'text',
            label: 'Teléfono',
            placeholder: '300 000 00 00',
            value: formValues['phone'] !== undefined ? String(formValues['phone']) : '',
            onChange: (value) => handleInputChange('phone', value),
            size: 'medium'
        },
        {
            name: 'email',
            type: 'email',
            label: 'Correo',
            placeholder: 'Compañia@company.com',
            value: formValues['email'] !== undefined ? String(formValues['email']) : '',
            onChange: (value) => handleInputChange('email', value),
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
                nit: formValues.nit,
                email: formValues.email,
                address: formValues.address,
                phone: formValues.phone,
            };
            console.log('Datos del formulario:', requestBody);

            post(`companys?apikey=${API_KEY}`, requestBody)
            console.log(loading, error);
            console.log('compañia creada con éxito');
            navigate(-1);


        } catch (error) {
            console.error('Error al crear la compañia', error);
        }
    };
    return (
        <Container>
            <FormRedisign 
            fields={companyFields} 
            onSubmit={handleSubmit} 
            button={'Registrar Compañia'} 
            title={'Crear Compañia'}/>
        </Container>
        /*<Form
            title='Crear Compañia'
            fields={companyFields}
            onSubmit={handleSubmit}
            button={<Button text='Crear Compañia' onClick={() => handleSubmit} fill={true} type={'SUBMIT'}/>}
        />*/
    );

}

export default CompanysCreate;


