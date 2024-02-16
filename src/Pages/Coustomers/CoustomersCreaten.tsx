import {Container} from "../../components/Container/Container.tsx";
import {FormRedisign} from "../../components/FormRedisign/FormRedisign.tsx";
import {FormField, SelectOption} from "../../types/Form";
import {useState} from "react";
import { API_KEY } from '../../constantes';


export const CreateCoustomer = () => {
    const [error, setError] = useState<{}>({})



    const [formData, setFormData] = useState<{
        name: string,
        lastname: string,
        documentType: SelectOption | undefined,
        documentNumber: string,
        address: string,
        phone: string,
        email: string,
        password: string,
        confirmPassword: string,
        rol: SelectOption | undefined,
    }>({
        name: '',
        lastname: '',
        documentType: undefined,
        documentNumber: '',
        address: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        rol: undefined,
    });

    const fields: FormField[] = [
        {
            type: 'select',
            value: formData.rol,
            onChange: (value: SelectOption | undefined) => setFormData({...formData, rol: value}),
            label: 'Rol',
            name: 'rol',
            size: 'large',
            placeholder: 'Seleccione un rol',
            options: [
                {label: 'Administrador', value: 'admin'},
                {label: 'Vendedor', value: 'seller'},
                {label: 'Cliente', value: 'client'},
            ]
        },
        {
            type: 'select',
            value: formData.documentType,
            onChange: (value: SelectOption | undefined) => setFormData({...formData, documentType: value}),
            label: 'Tipo de documento',
            name: 'documentType',
            size: 'medium',
            placeholder: 'Seleccione un tipo de documento',
            options: [
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
        {
            type: 'password',
            value: formData.password,
            onChange: (value: string) => setFormData({...formData, password: value}),
            label: 'Contraseña',
            name: 'password',
            size: 'medium',
        },
        {
            type: 'password',
            value: formData.confirmPassword,
            onChange: (value: string) => setFormData({...formData, confirmPassword: value}),
            label: 'Confirmar contraseña',
            name: 'confirmPassword',
            size: 'medium',
        }
    ]

    const handleSubmit= async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let mensajeError = {}
        if (!formData.rol) {
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
        if (!formData.password) {
            mensajeError = {...mensajeError, password: 'La contraseña es requerida'}
        }
        if (!formData.confirmPassword) {
            mensajeError = {...mensajeError, confirmPassword: 'La confirmación de contraseña es requerida'}
        }
        if (formData.password !== formData.confirmPassword) {
            mensajeError = {...mensajeError, confirmPassword: 'Las contraseñas no coinciden'}
        }
        if (Object.keys(mensajeError).length > 0) {
            console.log('Mensaje de error', mensajeError)
            setError(mensajeError)
            return
        }
        try{
            const requestBody = {
                rol: formData.rol?.value,
                documentType: formData.documentType?.value,
                document: formData.documentNumber,
                name: formData.name,
                lastname: formData.lastname,
                address: formData.address,
                phone: formData.phone,
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
            
            };
            console.log('Datos del formulario', requestBody);

            const response = await fetch(`https://coffvart-backend.onrender.com/api/users?apikey=${API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
            console.log('Respuesta del servidor', response);

            if(!response.ok){
                console.error('Error al crear el usuario', response.statusText);
                return;
            }
            console.log('Usuario creado con éxito');
        }catch(error){
            console.error('Error al crear el usuario', error);
        
        }
    };
    return (
        <Container>
            <FormRedisign fields={fields} onSubmit={handleSubmit} button={'Registrar Cliente'} title={'CREAR CLIENTE'} errors={error}/>
        </Container>
    )
}

export default CreateCoustomer;