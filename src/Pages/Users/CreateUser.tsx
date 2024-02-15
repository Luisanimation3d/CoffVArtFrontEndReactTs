import {Container} from "../../components/Container/Container.tsx";
import {FormRedisign} from "../../components/FormRedisign/FormRedisign.tsx";
import {FormField, SelectOption} from "../../types/Form";
import {useState} from "react";

export const CreateUser = () => {


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

    return (
        <Container>
            <FormRedisign fields={fields} onSubmit={()=>null} button={'Registrar Usuario'} title={'CREAr USUARIO'}/>
        </Container>
    )
}

export default CreateUser;