import React, {useState, useEffect} from 'react';
import {useFetch} from '../../hooks/useFetch';
import {FormField, SelectOption} from '../../types/Form';
import {FormRedisign} from '../../components/FormRedisign/FormRedisign';
import {API_KEY, API_URL} from '../../constantes';
import {useParams, useNavigate} from 'react-router-dom';
import {Container} from "../../components/Container/Container.tsx";
import toast, {Toaster} from "react-hot-toast";


export const SuppliersEdit = () => {

    const {id} = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [error, setError] = useState<{}>({})
    const [tipo, setTipo] = useState<SelectOption | undefined>();
    



    const [formData, setFormData] = useState<{
        name: string,
        coffeType: string,
        address: string,
        phone: string,
        quality: string,
        
    }>({
        name: '',
        coffeType: '',
        address: '',
        phone: '',
        quality: '',
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
            value: formData.coffeType,
            onChange: (value: string) => setFormData({...formData, coffeType: value}),
            label: 'Tipo de café',
            name: 'coffeType',
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
        },
        {
            type: 'text',
            value: formData.quality,
            onChange: (value: string) => setFormData({...formData, quality: value}),
            label: 'Calidad',
            name: 'quality',
            size: 'large',
        },
    ]


    const {data, loading, error: errorFetch, get, put} = useFetch(API_URL)

    useEffect(() => {
        get(`suppliers/${id}?apikey=${API_KEY}`)
    }, []);

    useEffect(() => {
        if (!loading) {
            const newValues = {
                name: data?.supplier?.name,
                coffeType: data?.supplier?.coffeType,
                address: data?.supplier?.address,
                phone: data?.supplier?.phone,
                quality: data?.supplier?.quality,
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
        if (!formData.coffeType) {
            mensajeError = {...mensajeError, coffeType: 'El tipo de café es requerido'}
        }
        if (!formData.address) {
            mensajeError = {...mensajeError, address: 'La dirección es requerida'}
        }
        if (!formData.phone) {
            mensajeError = {...mensajeError, phone: 'El teléfono es requerido'}
        }
        if (!formData.quality) {
            mensajeError = {...mensajeError, quality: 'La calidad es requerida'}
        }
        setError(mensajeError)
        console.log(formData, 'esto lo voy a mandar')
        const requestBody = {
            name: formData.name,
            coffeType: formData.coffeType,
            address: formData.address,
            phone: formData.phone,
            quality: formData.quality,
        };
        console.log(requestBody, 'esto es lo que voy a mandar')
        put(`suppliers/${id}?apikey=${API_KEY}`, requestBody)
        navigate (-1)
        if (!errorFetch) {
            // setTimeout(() => {
            //     navigate(-1)
            // }, 500);
        }
    };

    useEffect(() => {
        if (data && !errorFetch) {
            toast('Proveedor editado con éxito' , {
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

export default SuppliersEdit;
