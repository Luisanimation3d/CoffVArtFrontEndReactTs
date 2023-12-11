/*import React, {useState, useEffect} from 'react';
import {useFetch} from '../../hooks/useFetch';
import {FormField} from '../../types/Form';
import {Button} from '../../components/Button/Button';
import {Form} from '../../components/Form/Form';
import {API_KEY, API_URL} from '../../constantes';
import {useParams, useNavigate} from 'react-router-dom';


export const CompanysEdit = () => {
    const {id} = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [formValues, setFormValues] = useState<any>({
        name: '',
        nit: '',
        email: '',
        address: '', 
        phone: '',
    });
    const [error, setError] = useState<{}>({});
    const companyFields: FormField[] = [
    {
        name: 'name',
        type: 'text',
        label: 'Nombre de la compañia',
        placeholder: 'Compañia S.A.S',
        value: formValues.name !== undefined ? String(formValues.name): '',
        onChange: (value) => handleInputChange('name', value),
        size: 'medium'
    },
    {
        name: 'email',
        type: 'email',
        label: 'Correo',
        placeholder: 'Compañia@company.com',
        value: formValues.email !== undefined ? String(formValues.email): '',
        onChange: (value) => handleInputChange('email', value),
        size: 'medium'
    },
    {
        name: 'address',
        type: 'text',
        label: 'Dirección',
        placeholder: 'Cra 00 # 00 - 00',
        value: formValues.address !== undefined ? String(formValues.address): '',
        onChange: (value) => handleInputChange('address', value),
        size:'medium'
    },
    {
        name: 'phone',
        type: 'text',
        label: 'Teléfono',
        placeholder: '300 000 00 00',
        value: formValues.phone !== undefined ? String(formValues.phone): '',
        onChange: (value) => handleInputChange('phone', value),
        size:'medium'
    },
];

    // ...

// ...

    const {data, loading, error: errorFetch, get, put} = useFetch(API_URL)

    useEffect(() => {
        get(`companys/${id}?apikey=${API_KEY}`)
    }, [id]);

    useEffect(() => {
        if (!loading) {
            const newValues = {
                name: data?.companys.name,
                email: data?.companys.email,
                address: data?.companys.address,
                phone: data?.companys.phone,
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
            name: formValues.name,
            email: formValues.email,
            address: formValues.address,
            phone: formValues.phone,
        };
        console.log(requestBody, 'esto es lo que voy a mandar')
        put(`companys/${id}?apikey=${API_KEY}`, requestBody)
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
            title='Editar Cliente'
            fields={companyFields}
            onSubmit={handleSubmit}
            button={<Button text='Editar Compañia' onClick={() => null} fill={true} type={'SUBMIT'}/>}
            errors={error}
        />
    );
};

export default CompanysEdit;*/