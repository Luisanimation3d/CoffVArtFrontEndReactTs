import {FormField} from '../../types/Form'
import {API_KEY, API_URL} from '../../constantes';
import {useFetch} from '../../hooks/useFetch';
import {useState} from 'react';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Container} from "../../components/Container/Container.tsx";
import {FormRedisign} from "../../components/FormRedisign/FormRedisign.tsx";
import toast,{Toaster} from 'react-hot-toast';

export const CompanysCreate = () => {
    const [error, setError] = useState<{[key: string]: string}>({})
    const navigate = useNavigate()

    const [formValues, setFormValues] = useState<{
        name: string,
        nit: string,
        email: string,
        address: string,
        phone: string,
    }>({
        name: '',
        nit: '',
        email: '',
        address: '',
        phone: '',
        });
    
    
    const companyFields: FormField[] = [
        {
            name: 'nit',
            type: 'text',
            label: 'NIT',
            placeholder: '10122012334-5',
            value: formValues.nit,
            onChange: (value: string) => setFormValues({...formValues, nit: value}),
            size: 'medium'
        },
        {
            name: 'name',
            type: 'text',
            label: 'Nombre de la compañia',
            placeholder: 'Compañia S.A.S',
            value: formValues.name,
            onChange: (value: string) => setFormValues({...formValues, name: value}),
            size: 'medium'
        },
        {
            name: 'address',
            type: 'text',
            label: 'Dirección',
            placeholder: 'Cra 00 # 00 - 00',
            value: formValues.address,
            onChange: (value: string) => setFormValues({...formValues, address: value}),
            size: 'medium'
        },
        {
            name: 'phone',
            type: 'text',
            label: 'Teléfono',
            placeholder: '300 000 00 00',
            value: formValues.phone,
            onChange: (value: string) => setFormValues({...formValues, phone: value}),
            size: 'medium'
        },//CAMBIAR CUANDO LA FUNCION SEA GLOBAL
        /*{
            name: 'phone',
            type: 'text',
            label: 'Teléfono',
            placeholder: '300 000 00 00',
            value: formValues.phone,
            onChange: (value: string) => setFormValues(prev => ({...prev, phone: validateIfNumber(value) ? value : prev.phone})),
            size: 'medium'
        },*/
        {
            name: 'email',
            type: 'email',
            label: 'Correo',
            placeholder: 'Compañia@company.com',
            value: formValues.email,
            onChange: (value: string) => setFormValues({...formValues, email: value}),
            size: 'large'
        },
    ];
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let mensajeError = {}
        if(formValues.name === ''){
            mensajeError = {...mensajeError, name: 'El nombre es requerido'}
        }
        if(formValues.nit === ''){
            mensajeError = {...mensajeError, nit: 'El NIT es requerido'}
        }
        if(formValues.email === ''){
            mensajeError = {...mensajeError, email: 'El correo es requerido'}
        }
        if(formValues.address === ''){
            mensajeError = {...mensajeError, address: 'La dirección es requerida'}
        }
        if(formValues.phone === ''){
            mensajeError = {...mensajeError, phone: 'El teléfono es requerido'}
        }
        if(Object.keys(mensajeError).length > 0){
            console.log('Error en el formulario:', mensajeError)
            setError(mensajeError)
            return
        }
        try {
            const requestBody = {
                name: formValues.name,
                nit: formValues.nit,
                email: formValues.email,
                address: formValues.address,
                phone: formValues.phone,
            };
            console.log('Datos del formulario:', requestBody);

            const response = await fetch(`${API_URL}companys?apikey=${API_KEY}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
            if(response){
                const data = await response.json();
                if(data.message == "Compañia creada correctamente"){
                    toast(data.message, {
                        icon: '👏',
                        position: 'bottom-right'
                        })
                        setTimeout(() => {
                            navigate(-1)
                        }, 2000);
                }else if(data.error == "El NIT ya existe"){
                    toast.error(data.error, {
                        icon: '😞',
                        position: 'bottom-right'
                    })
                    setTimeout(() => {
                    }, 2000);
                }else if(data.error == "El NIT no es valido ejemplo:00000000-0"){
                    toast.error(data.error, {
                        icon: '😞',
                        position: 'bottom-right'
                    })
                    setTimeout(() => {
                    }, 2000);
                }
                else if(data.error == "El correo no es valido"){
                    toast.error(data.error, {
                        icon: '😞',
                        position: 'bottom-right'
                    })
                    setTimeout(() => {
                    }, 2000);
                }
                else if(data.error == "El teléfono no es valido"){
                    toast.error(data.error, {
                        icon: '😞',
                        position: 'bottom-right'
                    })
                    setTimeout(() => {
                    }, 2000);
                }else if(data.name == "El campo solo debe contener letras"){
                    toast.error('No se permiten espacios en los campos', {
                        icon: '😞',
                        position: 'bottom-right'
                    })
                    setTimeout(() => {
                    }, 2000);
                }else if(data.phone== "El campo no debe contener espacios"){
                    toast.error('El campo no debe contener espacios', {
                        icon: '😞',
                        position: 'bottom-right'
                    })
                    setTimeout(() => {
                    }, 2000);
                }
            }
            
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
            title={'Crear Compañia'}
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
                }}
            />
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


