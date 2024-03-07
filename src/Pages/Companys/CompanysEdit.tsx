import React, {useState, useEffect} from 'react';
import {useFetch} from '../../hooks/useFetch';
import {FormField} from '../../types/Form';
import {FormRedisign} from '../../components/FormRedisign/FormRedisign';
import {API_KEY, API_URL} from '../../utils/constantes.ts';
import {useParams, useNavigate} from 'react-router-dom';
import {Container} from "../../components/Container/Container.tsx";
import toast, {Toaster} from "react-hot-toast";


export const CompanysEdit = () => {

    const {id} = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [error, setError] = useState<{[key: string]: string}>({})
    




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
        }// CAMBIAR CUANDO LA VALIDACION ESTÉ GLOBAL
        /*{
            type: 'text',
            value: formData.phone,
            onChange: (value: string) => setFormData(prev => ({...prev, phone:validateIfNumber(value)? value : prev.phone})),
            label: 'Teléfono',
            name: 'phone',
            size: 'large',
        }*/
    ]


    const {data, loading, get} = useFetch(API_URL)

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


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        if(Object.keys(mensajeError).length > 0){
            setError(mensajeError)
            return
        }
        try{
            const requestBody = {
                name: formData.name,
                email: formData.email,
                address: formData.address,
                phone: formData.phone,
            }
           const response = await fetch(`http://localhost:3000/api/companys/${id}?apikey=${API_KEY}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            })
            if(response){
            const data = await response.json()
            if(data.message === 'Compañía editada correctamente'){
                toast(data.message , {
                    icon: '👏',
                    position: 'bottom-right'
                })
                setTimeout(() => {
                    navigate(-1)
                }, 2000);
                
            }
        }
        }
        catch (error) {
            console.log('Error:', error)
        }
   
    };

    return (
        <Container>
            <FormRedisign
                title='Editar Proveedor'
                fields={fields}
                onSubmit={handleSubmit}
                button={'Guardar'}
                errors={error}
            />
            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=''
                containerStyle={{}}
                toastOptions={{
                    className:'',
                    duration: 5000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                        fontSize: '1.5em',
                    },
                    success: {
                        duration: 3000,
                        iconTheme: {
                            primary: 'green',
                            secondary: 'black',
                        },
                    },
                }}/>
        </Container>
    );
};

export default CompanysEdit;
