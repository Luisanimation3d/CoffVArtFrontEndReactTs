import React, {useState, useEffect} from 'react';
import {useFetch} from '../../hooks/useFetch';
import {FormField, SelectOption} from '../../types/Form';
import {Button} from '../../components/Button/Button';
import {Form} from '../../components/Form/Form';
import { FormRedisign } from '../../components/FormRedisign/FormRedisign';
import {API_KEY, API_URL} from '../../constantes';
import {useParams, useNavigate} from 'react-router-dom';



export const CustomersEdit = () => {
    
    const {id} = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [error, setError] = useState<{}>({})
    const [tipo, setTipo] = useState<SelectOption | undefined>();

    const [optionsRoles, setOptionsRoles] = useState<SelectOption[]>([])

    const {get: getRoles} = useFetch(API_URL)
    const {data: dataRoles} = useFetch(API_URL);


    useEffect(() => {
        getRoles(`roles?apikey=${API_KEY}`);
    }, []);

    useEffect(() => {
        if(dataRoles?.roles?.rows){
            setOptionsRoles(dataRoles?.roles?.rows.map((role: any) => {
                return {
                    label: role.name,
                    value: role.id
                }
            }))
        }
    }, [dataRoles])

    const [formData, setFormData] = useState<{
        name: string,
        lastname: string,
        documentType: SelectOption | undefined,
        documentNumber: string,
        address: string,
        phone: string,
        email: string,
        roleId: SelectOption | undefined,
    }>({
        name: '',
        lastname: '',
        documentType: undefined,
        documentNumber: '',
        address: '',
        phone: '',
        email: '',
        roleId: undefined,
    });

    const fields: FormField[] = [
        {
            type: 'select',
            value: formData.roleId,
            onChange: (value: SelectOption | undefined) => setFormData({...formData, roleId: value}),
            label: 'Rol',
            name: 'rol',
            size: 'large',
            placeholder: 'Seleccione un rol',
            options: optionsRoles
        },
        {
            type: 'select',
            value: formData.documentType,
            onChange: (value: SelectOption | undefined) => setFormData({...formData, documentType: value}),
            label: 'Tipo de documento',
            name: 'documentType',
            size: 'medium',
            placeholder: 'Seleccione un tipo de documento',
            options:  [
                {label: 'Cédula de ciudadanía', value: 'CC'},
                {label: 'Cédula de extranjería', value: 'CE'},
                {label: 'Pasaporte', value: 'PA'},
            ]
        },
        {
            type: 'text',
            value: formData.documentNumber,
            onChange: (value: string) => setFormData({...formData, documentNumber: value}),
            label: 'Número de documento',
            name: 'documentNumber',
            size: 'medium',
        },
        {
            type: 'text',
            value: formData.name,
            onChange: (value: string) => setFormData({...formData, name: value}),
            label: 'Nombre',
            name: 'name',
            size: 'medium',
        },
        {
            type: 'text',
            value: formData.lastname,
            onChange: (value: string) => setFormData({...formData, lastname: value}),
            label: 'Apellido',
            name: 'lastname',
            size: 'medium',
        },
        {
            type: 'text',
            value: formData.address,
            onChange: (value: string) => setFormData({...formData, address: value}),
            label: 'Dirección',
            name: 'address',
            size: 'medium',
        },
        {
            type: 'text',
            value: formData.phone,
            onChange: (value: string) => setFormData({...formData, phone: value}),
            label: 'Teléfono',
            name: 'phone',
            size: 'medium',
        },
        {
            type: 'email',
            value: formData.email,
            onChange: (value: string) => setFormData({...formData, email: value}),
            label: 'Correo electrónico',
            name: 'email',
            size: 'large',
        },
    ]



    const {data, loading, error: errorFetch, get, put} = useFetch(API_URL)

    useEffect(() => {
        get(`users/${id}?apikey=${API_KEY}`)
    }, []);

    useEffect(() => {
        if (!loading) {
            const newValues = {
                roleId: data?.users.role?.value,
                documentType: data?.users.documentType?.value,
                document: data?.users.document,
                name: data?.users.name,
                lastname: data?.users.lastname,
                address: data?.users.address,
                email: data?.users.email,
                phone: data?.user.phone,
                documentNumber: data?.users.documentNumber, // Add this line
            }
            setFormData(newValues)
        }
    }, [data]);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let mensajeError = {}
        if (!formData.roleId) {
            mensajeError = {...mensajeError, rol: 'El rol es requerido'}
        }
        if (!formData.documentType) {
            mensajeError = {...mensajeError, documentType: 'El tipo de documento es requerido'}
        }
        if (!formData.documentNumber) {
            mensajeError = {...mensajeError, documentNumber: 'El número de documento es requerido'}
        }
        if (!formData.name) {
            mensajeError = {...mensajeError, name: 'El nombre es requerido'}
        }
        if (!formData.lastname) {
            mensajeError = {...mensajeError, lastname: 'El apellido es requerido'}
        }
        if (!formData.address) {
            mensajeError = {...mensajeError, address: 'La dirección es requerida'}
        }
        if (!formData.phone) {
            mensajeError = {...mensajeError, phone: 'El teléfono es requerido'}
        }
        if (!formData.email) {
            mensajeError = {...mensajeError, email: 'El correo electrónico es requerido'}
        }
        console.log(formData, 'esto lo voy a mandar')
        const requestBody = {
            roleId: formData.roleId?.value,
                documentType: formData.documentType?.value,
                document: formData.documentNumber,
                name: formData.name,
                lastname: formData.lastname,
                address: formData.address,
                phone: formData.phone,
                email: formData.email,
        };
        console.log(requestBody, 'esto es lo que voy a mandar')
        put(`users/${id}?apikey=${API_KEY}`, requestBody)
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
            fields={fields}
            onSubmit={handleSubmit}
            button={<Button text='Editar Cliente' onClick={() => null} fill={true} type={'SUBMIT'}/>}
            errors={error}
        />
    );
};

export default CustomersEdit;
