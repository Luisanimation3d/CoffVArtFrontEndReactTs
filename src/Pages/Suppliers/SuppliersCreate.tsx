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
import toast, { Toaster } from 'react-hot-toast';

export const SuppliersCreate = () => {
    const [error, setError] = useState<{[key: string]: string}>({})
    const [formValues, setFormValues] = useState<{
        name: string,
        nit: string,
        coffeType: string,
        address: string,
        phone: string,
        quality: string,
    }>({
        name: '',
        nit: '',
        coffeType: '',
        address: '',
        phone: '',
        quality: '',
    });
    

    const navigate = useNavigate()
    const supplierFields: FormField[] = [
        {
            name: 'name',
            type: 'text',
            label: 'Nombre del proveedor',
            placeholder: 'proveedor S.A.S',
            value: formValues['name'] !== undefined ? String(formValues['name']) : '',
            onChange: (value) => handleInputChange('name', value),
            size: 'medium'
        },
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
            name: 'coffeType',
            type: 'text',
            label: 'Tipo de café',
            placeholder: 'pergamino',
            value: formValues['coffeType'] !== undefined ? String(formValues['coffeType']) : '',
            onChange: (value) => handleInputChange('coffeType', value),
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
            type: 'number',
            label: 'Teléfono',
            placeholder: '300 000 00 00',
            value: formValues['phone'] !== undefined ? String(formValues['phone']) : '',
            onChange: (value) => handleInputChange('phone', value),
            size: 'medium'
        },
        {
            name: 'quality',
            type: 'text',
            label: 'Calidad',
            placeholder: 'Premiun',
            value: formValues['quality'] !== undefined ? String(formValues['quality']) : '',
            onChange: (value) => handleInputChange('quality', value),
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
        let mensajeError = {}
        if (formValues.name == '') {
            mensajeError = {...mensajeError, name: 'El nombre es requerido'}
        }
        if (!formValues.nit) {
            mensajeError = {...mensajeError, nit: 'El NIT es requerido'}
        }
        if (!formValues.coffeType) {
            mensajeError = {...mensajeError, coffeType: 'El tipo de café es requerido'}
        }
        if (!formValues.address) {
            mensajeError = {...mensajeError, address: 'La dirección es requerida'}
        }
        if (!formValues.phone) {
            mensajeError = {...mensajeError, phone: 'El teléfono es requerido'}
        }
        if (!formValues.quality) {
            mensajeError = {...mensajeError, quality: 'La calidad es requerida'}
        }
        if (Object.keys(mensajeError).length > 0) {
            console.log('Mensaje de error', mensajeError)
            setError(mensajeError)
            return
        }
        try {
            const requestBody = {
                name: formValues.name,
                nit: formValues.nit,
                coffeType: formValues.coffeType,
                address: formValues.address,
                phone: formValues.phone,
                quality: formValues.quality,
            };
            console.log('Datos del formulario:', requestBody);

            const response = await fetch(`http://localhost:3000/api/suppliers?apikey=${API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                });
                if (response){
                    const data = await response.json();
                    if (data.message == "Proveedor creado correctamente") {
                    toast(data.message, {
                        icon: '👏',
                        position: 'bottom-right'
                    })
                    setTimeout(() => {
                     navigate(-1)
                    }, 2000);


                }else if (data.error == `El NIT ya está registrado`){
                    toast.error(data.error, {
                        icon: '😞',
                        position: 'bottom-right'
                    })
                    setTimeout(() => {
                        
                        }, 2000);
                }else if (data.error == `El NIT no es valido example:00000000-0`){
                    toast.error(data.error, {
                        icon: '👎',
                        position: 'bottom-right'
                    })
                    setTimeout(() => {
                        
                        }, 2000);
                }
                else if (data.error == `El teléfono no es valido`){
                    toast.error(data.error, {
                        icon: '👎',
                        position: 'bottom-right'
                    })
                    setTimeout(() => {
                        
                        }, 2000);
                }
                }

        } catch (error) {
            console.error('Error al crear el proveedor', error);
        }
    };
    return (
        <Container>
            <FormRedisign 
            fields={supplierFields} 
            onSubmit={handleSubmit} 
            button={'Registrar Proveedor'} 
            title={'Crear Proveedor'}
            errors={error}/>
            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                    className: '',
                    duration: 5000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                        fontSize: '1.5rem',
                    },
                    success: {
                        duration: 3000,
                        iconTheme: {
                            primary: 'green',
                            secondary: 'black'
                        },
                    },
                }}
            />
        </Container>
        /*<Form
            title='Crear proveedor'
            fields={supplierFields}
            onSubmit={handleSubmit}
            button={<Button text='Crear proveedor' onClick={() => handleSubmit} fill={true} type={'SUBMIT'}/>}
        />*/
    );

}

export default SuppliersCreate;


