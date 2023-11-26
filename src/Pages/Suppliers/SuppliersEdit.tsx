import React, {useState, useEffect} from 'react';
import {useFetch} from '../../hooks/useFetch';
import {FormField, SelectOption} from '../../types/Form';
import {Button} from '../../components/Button/Button';
import {Form} from '../../components/Form/Form';
import {API_KEY} from '../../constantes';
import {useParams, useNavigate} from 'react-router-dom';


export const SuppliersEdit= ()=>{
    const {id} = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [formValues, setFormValues] = useState<any>({
        name: '',
        nit: '',
        coffeType: '',
        address: '', 
        phone: '',
        quality:'',
        unitCost:'',
    });
    const [error, setError] = useState<{}>({});

    const handleInputChangen = (value: SelectOption | undefined, name: string | number) => {
        setFormValues((prevValues: any) => ({
            ...prevValues,
            [name]:value,
        }));
    };

    const supplierFields: FormField[] = [
    {
        name: 'name',
        type: 'text',
        label: 'Nombre del proveedor',
        placeholder: 'proveedor S.A.S',
        value: formValues.name !== undefined ? String(formValues.name): '',
        onChange: (value) => handleInputChange('name', value),
        size: 'medium'
    },
    {
        name: 'nit',
        type: 'text',
        label: 'NIT',
        placeholder: '10122012334-5',
        value: formValues.nit !== undefined ? String(formValues.nit): '',
        onChange: (value) => handleInputChange('nit', value),
        size: 'medium'
    },
    {
        name: 'coffeType',
        type: 'text',
        label: 'Tipo de café',
        placeholder: 'pergamino',
        value: formValues.coffeType !== undefined ? String(formValues.coffeType): '',
        onChange: (value) => handleInputChange('coffeType', value),
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
    {
        name: 'quality',
        type: 'text',
        label: 'Calidad',
        placeholder: 'Premiun',
        value: formValues.quality !== undefined ? String(formValues.quality): '',
        onChange: (value) => handleInputChange('quality', value),
        size:'medium'
    },
    {
        name: 'unitCost',
        type: 'number',
        label: 'Costo bulto',
        placeholder: 'Premiun',
        value: formValues.unitCost !== undefined ? String(formValues.unitCost): '',
        onChange: (value) => handleInputChange('unitCost', value),
        size:'medium'
    },
];

    // ...

// ...

    const {data, loading, error: errorFetch, get, put} = useFetch('https://coffvart-backend.onrender.com/api/')

    useEffect(() => {
        get(`suppliers/${id}?apikey=${API_KEY}`)
    }, [id]);

    useEffect(() => {
        if (!loading) {
            const newValues = {
                name: data?.suppliers.name,
                nit: data?.suppliers.nit,
                coffeType: data?.suppliers.coffeType,
                address: data?.suppliers.address,
                phone: data?.suppliers.phone,
                quality: data?.suppliers.quality,
                unitCost: data?.suppliers.unitCost,
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
            nit: formValues.nit,
            coffeType: formValues.coffeType,
            address: formValues.address,
            phone: formValues.phone,
            quality: formValues.quality,
            unitCost: formValues.unitCost,
        };
        console.log(requestBody, 'esto es lo que voy a mandar')
        put(`suppliers/${id}?apikey=${API_KEY}`, requestBody)
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
            title='Editar Proveedor'
            fields={supplierFields}
            onSubmit={handleSubmit}
            button={<Button text='Editar Proveedor' onClick={() => null} fill={true} type={'SUBMIT'}/>}
            errors={error}
        />
    );
};
