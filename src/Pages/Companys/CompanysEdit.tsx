import React, {useState, useEffect} from 'react';
import {useFetch} from '../../hooks/useFetch';
import {FormField, SelectOption} from '../../types/Form';
import {FormRedisign} from '../../components/FormRedisign/FormRedisign';
import {API_KEY, API_URL} from '../../constantes';
import {useParams, useNavigate} from 'react-router-dom';
import {Container} from "../../components/Container/Container.tsx";
import toast, {Toaster} from "react-hot-toast";


export const CompanysEdit = () => {

    const {id} = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [error, setError] = useState<{}>({})
    const [tipo, setTipo] = useState<SelectOption | undefined>();




    const [formData, setFormData] = useState<{
        name: string,
        email: string,
        address: string,
        phone: string,
        
    }>({
        name: '',
        email: '',
        address: '',
        phone: '',
    });

    const fields: FormField[] = [
        {
            type: 'text',
            value: formData.name,
            onChange: (value: string) => setFormData({...formData, name: value}),
            label: 'Nombre',
            name: 'name',
            size: 'large',
        },
        {
            type: 'text',
            value: formData.email,
            onChange: (value: string) => setFormData({...formData, email: value}),
            label: 'Correo',
            name: 'email',
            size: 'large',
        },
        {
            type: 'text',
            value: formData.address,
            onChange: (value: string) => setFormData({...formData, address: value}),
            label: 'Dirección',
            name: 'address',
            size: 'large',
        },
        {
            type: 'text',
            value: formData.phone,
            onChange: (value: string) => setFormData({...formData, phone: value}),
            label: 'Teléfono',
            name: 'phone',
            size: 'large',
        }
    ]


    const {data, loading, error: errorFetch, get, put} = useFetch(API_URL)

    useEffect(() => {
        get(`companys/${id}?apikey=${API_KEY}`)
    }, []);

    useEffect(() => {
        if (!loading) {
            const newValues = {
                name: data?.company?.name,
                email: data?.company?.email,
                address: data?.company?.address,
                phone: data?.company?.phone,
            }
            
            setFormData(newValues)
        }
    }, [data]);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let mensajeError = {}
        if (!formData.name) {
            mensajeError = {...mensajeError, name: 'El nombre es requerido'}
        }
        if (!formData.email) {
            mensajeError = {...mensajeError, email: 'El correo es requerido'}
        }
        if (!formData.address) {
            mensajeError = {...mensajeError, address: 'La dirección es requerida'}
        }
        if (!formData.phone) {
            mensajeError = {...mensajeError, phone: 'El teléfono es requerido'}
        }
        setError(mensajeError)
        console.log(formData, 'esto lo voy a mandar')
        const requestBody = {
            name: formData.name,
            email: formData.email,
            address: formData.address,
            phone: formData.phone,
        };
        console.log(requestBody, 'esto es lo que voy a mandar')
        put(`companys/${id}?apikey=${API_KEY}`, requestBody)
        navigate (-1)
  
    };

    useEffect(() => {
        if (data && !errorFetch) {
            toast('Compañía editada con éxito' , {
                icon: '👏',
                position: 'bottom-right'
            })
            
            // navigate(-1)
        }
    }, [data, errorFetch]);

    return (
        <Container>
            <FormRedisign
                title='Editar Proveedor'
                fields={fields}
                onSubmit={handleSubmit}
                button={'Guardar'}
                errors={error}
            />
            <Toaster/>
        </Container>
    );
};

export default CompanysEdit;
