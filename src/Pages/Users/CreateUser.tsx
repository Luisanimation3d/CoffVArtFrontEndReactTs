import {Container} from "../../components/Container/Container.tsx";
import {FormRedisign} from "../../components/FormRedisign/FormRedisign.tsx";
import {FormField, SelectOption} from "../../types/Form";
import {useState, useEffect} from "react";
import {API_KEY, API_URL} from "../../constantes.ts";
import {useFetch} from "../../hooks/useFetch.tsx";
import {useNavigate} from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";

export const CreateUser = () => {
    const [error, setError] = useState<{ [key: string]: string }>({})
    const {data: dataUser, post: postUser, loading: loadingUser} = useFetch(API_URL);
    const navigate = useNavigate();


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

    const [optionsRoles, setOptionsRoles] = useState<SelectOption[]>([])

    const {get, data} = useFetch(API_URL);

    useEffect(() => {
        get(`roles?apikey=${API_KEY}`);
    }, []);

    useEffect(() => {
        if (data?.roles?.rows) {
            setOptionsRoles(data?.roles?.rows.map((role: any) => {
                return {
                    label: role.name,
                    value: role.id
                }
            }))
        }
    }, [data])

    const validateIfNumber = (value: string) => {
        if (value === '') return true;
        const reg = new RegExp('^[0-9]+$');
        return reg.test(value);
    }

    const fields: FormField[] = [
        {
            type: 'select',
            value: formData.rol,
            onChange: (value: SelectOption | undefined) => setFormData({...formData, rol: value}),
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
            options: [
                {label: 'Cédula de ciudadanía', value: 'CC'},
                {label: 'Cédula de extranjería', value: 'CE'},
                {label: 'Pasaporte', value: 'PAS'},
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
            onChange: (value: string) => setFormData(prev => ({...prev, phone: validateIfNumber(value) ? value : prev.phone})),
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

    const validateForm = () => {
        let mensajeError = {}
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.rol) {
            mensajeError = {...mensajeError, rol: 'El rol es requerido'}
        }
        if (!formData.documentType) {
            mensajeError = {...mensajeError, documentType: 'El tipo de documento es requerido'}
        }
        if (!formData.documentNumber || formData.documentNumber.trim().length < 8 || formData.documentNumber.trim().length > 15) {
            mensajeError = {
                ...mensajeError,
                documentNumber: 'El número de documento debe tener entre 8 y 15 caracteres'
            };
        }
        if (!formData.name || formData.name.trim().length < 3 || formData.name.trim().length > 15) {
            mensajeError = {...mensajeError, name: 'El nombre debe tener entre 3 y 15 letras'};
        }
        if (!formData.lastname || formData.lastname.trim().length < 3) {
            mensajeError = {...mensajeError, lastname: 'El apellido debe tener entre 3 y 15 letras'};
        }
        if (!formData.address || formData.address.trim().length < 10) {
            mensajeError = {...mensajeError, address: 'La dirección debe tener al menos 10 caracteres'}
        }
        if (!formData.phone || formData.phone.trim().length < 10 || formData.phone.trim().length > 12) {
            mensajeError = {...mensajeError, phone: 'El teléfono debe tener entre 10 y 12 caracteres'};
        }
        if (!formData.email || !emailRegex.test(formData.email)) {
            mensajeError = {...mensajeError, email: 'Ingrese un correo electrónico válido'};
        }

        if (!formData.password) {
            mensajeError = {...mensajeError, password: 'La contraseña es requerida'}
        }

        if (formData.password.trim().length < 8 || !/\d/.test(formData.password) || !/[!@#$%^&*]/.test(formData.password)) {
            mensajeError = {
                ...mensajeError,
                password: 'La contraseña debe tener al menos 8 caracteres, incluir al menos un número y un carácter especial'
            };
        }

        if (!formData.confirmPassword) {
            mensajeError = {...mensajeError, confirmPassword: 'La confirmación de contraseña es requerida'}
        }
        if (formData.password !== formData.confirmPassword) {
            mensajeError = {...mensajeError, confirmPassword: 'Las contraseñas no coinciden'}
        }

        return mensajeError;
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const mensajeError = validateForm();
        if (Object.keys(mensajeError).length > 0) {
            console.log('Mensaje de error', mensajeError)
            setError(mensajeError)
            return
        }
        const requestBody = {
            roleId: formData.rol?.value,
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

        postUser(`users?apikey=${API_KEY}`, requestBody)
    };

    useEffect(() => {
        if(dataUser?.message == "Usuario creado correctamente"){
            toast(dataUser.message , {
                icon: '👏',
                position: 'bottom-right'
            })
            setTimeout(() => {
                navigate(-1)
            }, 500);
        }
    }, [dataUser])

    return (
        <Container>
            <FormRedisign fields={fields} onSubmit={handleSubmit} button={'Registrar Usuario'} title={'CREAr USUARIO'}
                          errors={error}/>
            <Toaster/>
        </Container>
    )
}

export default CreateUser;