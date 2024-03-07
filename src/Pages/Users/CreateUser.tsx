import {Container} from "../../components/Container/Container.tsx";
import {FormRedisign} from "../../components/FormRedisign/FormRedisign.tsx";
import {FormField, SelectOption} from "../../types/Form";
import {useState, useEffect} from "react";
import {API_KEY, API_URL} from "../../utils/constantes.ts";
import {useFetch} from "../../hooks/useFetch.tsx";
import {useNavigate} from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";
import {validateIfNumber} from "../../helpers/validateIfNumber.helper.ts";

export const CreateUser = () => {
    const [error, setError] = useState<{ [key: string]: string }>({})
    const {data: dataUser, postFile: postFileUser} = useFetch(API_URL);
    const navigate = useNavigate();


    const [formDataRegister, setFormDataRegister] = useState<{
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
        image: string
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
        image: ''
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

    const fields: FormField[] = [
        {
            type: 'select',
            value: formDataRegister.rol,
            onChange: (value: SelectOption | undefined) => setFormDataRegister({...formDataRegister, rol: value}),
            label: 'Rol',
            name: 'rol',
            size: 'large',
            placeholder: 'Seleccione un rol',
            options: optionsRoles
        },
        {
            type: 'select',
            value: formDataRegister.documentType,
            onChange: (value: SelectOption | undefined) => setFormDataRegister({...formDataRegister, documentType: value}),
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
            value: formDataRegister.documentNumber,
            onChange: (value: string) => setFormDataRegister({...formDataRegister, documentNumber: value}),
            label: 'Número de documento',
            name: 'documentNumber',
            size: 'medium',
        },
        {
            type: 'text',
            value: formDataRegister.name,
            onChange: (value: string) => setFormDataRegister({...formDataRegister, name: value}),
            label: 'Nombre',
            name: 'name',
            size: 'medium',
        },
        {
            type: 'text',
            value: formDataRegister.lastname,
            onChange: (value: string) => setFormDataRegister({...formDataRegister, lastname: value}),
            label: 'Apellido',
            name: 'lastname',
            size: 'medium',
        },
        {
            type: 'text',
            value: formDataRegister.address,
            onChange: (value: string) => setFormDataRegister({...formDataRegister, address: value}),
            label: 'Dirección',
            name: 'address',
            size: 'medium',
        },
        {
            type: 'text',
            value: formDataRegister.phone,
            onChange: (value: string) => setFormDataRegister(prev => ({...prev, phone: validateIfNumber(value) ? value : prev.phone})),
            label: 'Teléfono',
            name: 'phone',
            size: 'medium',
        },
        {
            type: 'email',
            value: formDataRegister.email,
            onChange: (value: string) => setFormDataRegister({...formDataRegister, email: value}),
            label: 'Correo electrónico',
            name: 'email',
            size: 'large',
        },
        {
            type: 'password',
            value: formDataRegister.password,
            onChange: (value: string) => setFormDataRegister({...formDataRegister, password: value}),
            label: 'Contraseña',
            name: 'password',
            size: 'medium',
        },
        {
            type: 'password',
            value: formDataRegister.confirmPassword,
            onChange: (value: string) => setFormDataRegister({...formDataRegister, confirmPassword: value}),
            label: 'Confirmar contraseña',
            name: 'confirmPassword',
            size: 'medium',
        },
        {
            name: 'image',
            label: 'Imagen',
            type: 'file',
            size: 'large',
            value: formDataRegister.image,
            onChange: (file: File) => {
                setFormDataRegister({...formDataRegister, image: file.name})
                const formData = new FormData();
                formData.append('image', file);
                postFileUser(`users/upload?apikey=${API_KEY}`, formData)
            }
        }
    ]

    const validateForm = () => {
        let mensajeError = {}
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formDataRegister.rol) {
            mensajeError = {...mensajeError, rol: 'El rol es requerido'}
        }
        if (!formDataRegister.documentType) {
            mensajeError = {...mensajeError, documentType: 'El tipo de documento es requerido'}
        }
        if (!formDataRegister.documentNumber || formDataRegister.documentNumber.trim().length < 8 || formDataRegister.documentNumber.trim().length > 15) {
            mensajeError = {
                ...mensajeError,
                documentNumber: 'El número de documento debe tener entre 8 y 15 caracteres'
            };
        }
        if (!formDataRegister.name || formDataRegister.name.trim().length < 3 || formDataRegister.name.trim().length > 15) {
            mensajeError = {...mensajeError, name: 'El nombre debe tener entre 3 y 15 letras'};
        }
        if (!formDataRegister.lastname || formDataRegister.lastname.trim().length < 3) {
            mensajeError = {...mensajeError, lastname: 'El apellido debe tener entre 3 y 15 letras'};
        }
        if (!formDataRegister.address || formDataRegister.address.trim().length < 10) {
            mensajeError = {...mensajeError, address: 'La dirección debe tener al menos 10 caracteres'}
        }
        if (!formDataRegister.phone || formDataRegister.phone.trim().length < 10 || formDataRegister.phone.trim().length > 12) {
            mensajeError = {...mensajeError, phone: 'El teléfono debe tener entre 10 y 12 caracteres'};
        }
        if (!formDataRegister.email || !emailRegex.test(formDataRegister.email)) {
            mensajeError = {...mensajeError, email: 'Ingrese un correo electrónico válido'};
        }

        if (!formDataRegister.password) {
            mensajeError = {...mensajeError, password: 'La contraseña es requerida'}
        }

        if (formDataRegister.password.trim().length < 8 || !/\d/.test(formDataRegister.password) || !/[!@#$%^&*]/.test(formDataRegister.password)) {
            mensajeError = {
                ...mensajeError,
                password: 'La contraseña debe tener al menos 8 caracteres, incluir al menos un número y un carácter especial'
            };
        }

        if (!formDataRegister.confirmPassword) {
            mensajeError = {...mensajeError, confirmPassword: 'La confirmación de contraseña es requerida'}
        }
        if (formDataRegister.password !== formDataRegister.confirmPassword) {
            mensajeError = {...mensajeError, confirmPassword: 'Las contraseñas no coinciden'}
        }

        return mensajeError;
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const mensajeError = validateForm();
        if (Object.keys(mensajeError).length > 0) {
            console.log('Mensaje de error', mensajeError);
            setError(mensajeError);
            return;
        }
    
        try {
            const requestBody = {
                roleId: formDataRegister.rol?.value,
                documentType: formDataRegister.documentType?.value,
                document: formDataRegister.documentNumber,
                name: formDataRegister.name,
                lastname: formDataRegister.lastname,
                address: formDataRegister.address,
                phone: formDataRegister.phone,
                email: formDataRegister.email,
                password: formDataRegister.password,
                confirmPassword: formDataRegister.confirmPassword,
            };
            console.log('Datos del formulario', requestBody);
    
            const response = await fetch(`https://coffvart-backend.onrender.com/api/users?apikey=${API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
    
            if (response) {
                const data = await response.json();
                if (data.message === "Usuario creado correctamente") {
                    toast(data.message, {
                        icon: '👏',
                        position: 'bottom-right'
                    });
                    setTimeout(() => {
                        navigate(-1);
                    }, 2000);
                } else if (data.msg === 'Este correo ya esta registrado') {
                    toast.error("Este correo ya esta registrado", {
                        icon: '👎',
                        position: 'bottom-right'
                    });
                } else if (data.msg === 'Este documento ya esta registrado') {
                    toast.error("Este documento ya esta registrado", {
                        icon: '👎',
                        position: 'bottom-right'
                    });
                }
            }
        } catch (error) {
            console.error('Error al crear el usuario', error);
        }
    };
    

    useEffect(() => {
        if(dataUser?.message == "Usuario creado correctamente"){
            toast(dataUser.message , {
                icon: '👏',
                position: 'bottom-right'
            })
            setTimeout(() => {
                navigate(-1)
            }, 2000);
        }else if (dataUser.msg == 'Este correo ya esta registrado'){
            toast.error("Este correo ya esta registrado", {
                icon: '👎',
                position: 'bottom-right'
            })
        }else if (dataUser.msg == 'Este documento ya esta registrado'){
            toast.error("Este documento ya esta registrado", {
                icon: '👎',
                position: 'bottom-right'
            })
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