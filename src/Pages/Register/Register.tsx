import {useFetch} from "../../hooks/useFetch.tsx";
import {API_KEY, API_URL} from "../../constantes.ts";
import {useEffect, useState} from "react";
import {FormField, SelectOption} from "../../types/Form";
import styles from './Register.module.css';
import {Form} from "../../components/Form/Form.tsx";
import {Button} from "../../components/Button/Button.tsx";
import {Container} from "../../components/Container/Container.tsx";
import {useNavigate} from "react-router-dom";

export const Register = () => {
    const navigate = useNavigate();
    const {data, post, error: errorRegister} = useFetch(API_URL)
    const [registerForm, setRegisterForm] = useState<{
        name: string,
        lastname: string,
        address: string,
        phone: string,
        email: string,
        password: string,
        confirmPassword: string,
        documentType: SelectOption | undefined,
        document: string
    }>({
        name: '',
        lastname: '',
        address: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        documentType: undefined,
        document: '',
    });

    const documentTypeOptions: SelectOption[] = [
        {
            value: 'CC',
            label: 'CC',
        },
        {
            value: 'TI',
            label: 'TI',
        }
    ];

    const [error, setError] = useState<{ [key: string]: string }>({});
    const validateIfNumber = (value: string) => {
        if (value === '') return true;
        const reg = new RegExp('^[0-9]+$');
        return reg.test(value);
    }
    const formFieldsRegister: FormField[] = [
        {
            name: 'name',
            type: 'text',
            label: 'Nombre',
            placeholder: 'Ingrese su nombre',
            value: registerForm.name,
            onChange: (value: string) => setRegisterForm({...registerForm, name: value}),
            size: 'medium',
        },
        {
            name: 'lastname',
            type: 'text',
            label: 'Apellido',
            placeholder: 'Ingrese su apellido',
            value: registerForm.lastname,
            onChange: (value: string) => setRegisterForm({...registerForm, lastname: value}),
            size: 'medium',
        },
        {
            name: 'address',
            type: 'text',
            label: 'Dirección',
            placeholder: 'Ingrese su dirección',
            value: registerForm.address,
            onChange: (value: string) => setRegisterForm({...registerForm, address: value}),
            size: 'large',
        },
        {
            name: 'phone',
            type: 'text',
            label: 'Teléfono',
            placeholder: 'Ingrese su teléfono',
            value: registerForm.phone,
            onChange: (value: string) => setRegisterForm(prev => ({...registerForm, phone: validateIfNumber(value) ? value : prev.phone})),
            size: 'large',
        },
        {
            name: 'email',
            type: 'text',
            label: 'Email',
            placeholder: 'Ingrese su email',
            value: registerForm.email,
            onChange: (value: string) => setRegisterForm({...registerForm, email: value}),
            size: 'large',
        },
        {
            name: 'password',
            type: 'password',
            label: 'Contraseña',
            placeholder: 'Ingrese su contraseña',
            value: registerForm.password,
            onChange: (value: string) => setRegisterForm({...registerForm, password: value}),
            size: 'large',
        },
        {
            name: 'confirmPassword',
            type: 'password',
            label: 'Confirmar contraseña',
            placeholder: 'Confirme su contraseña',
            value: registerForm.confirmPassword,
            onChange: (value: string) => setRegisterForm({...registerForm, confirmPassword: value}),
            size: 'large',
        },
        {
            name: 'documentType',
            type: 'select',
            label: 'Tipo de documento',
            placeholder: 'Tipo de documento',
            value: registerForm.documentType,
            options: documentTypeOptions,
            onChange: (value: SelectOption | undefined) => setRegisterForm({...registerForm, documentType: value}),
        },
        {
            name: 'document',
            type: 'text',
            label: 'Documento',
            placeholder: 'Documento',
            value: registerForm.document,
            onChange: (value: string) => setRegisterForm({...registerForm, document: validateIfNumber(value) ? value : registerForm.document}),
            size: 'large',
        }
    ]

    const handleClick = () => {
        navigate('/user/Login');
    }

    const validateForm = () => {
        const errors: { [key: string]: string } = {};
        if (!registerForm.name) {
            errors.name = 'Ingrese su nombre';
        }
        if (!registerForm.lastname) {
            errors.lastname = 'Ingrese su apellido';
        }
        if (!registerForm.address) {
            errors.address = 'Ingrese su dirección';
        }
        if (!registerForm.phone) {
            errors.phone = 'Ingrese su teléfono';
        }
        if (!registerForm.email) {
            errors.email = 'Ingrese su email';
        }
        if (!registerForm.password) {
            errors.password = 'Ingrese su contraseña';
        }
        if (!registerForm.confirmPassword) {
            errors.confirmPassword = 'Confirme su contraseña';
        }
        if (registerForm.password !== registerForm.confirmPassword) {
            errors.confirmPassword = 'Las contraseñas no coinciden';
            errors.password = 'Las contraseñas no coinciden';
        }
        if (!registerForm.documentType) {
            errors.documentType = 'Seleccione un tipo de documento';
        }
        if (!registerForm.document) {
            errors.document = 'Ingrese su documento';
        }
        return errors;
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setError({})
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            const dataToSend = {
                ...registerForm,
                documentType: registerForm.documentType?.value,
            }
            post(`users?apikey=${API_KEY}`, {...dataToSend, roleId: 1})
        } else {
            console.log('Formulario inválido');
            setError(errors);
        }
    }

    useEffect(() => {
        if (data?.newUser && !errorRegister) {
            alert('Usuario creado correctamente')
            console.log(data)
            navigate('/user/Login');
        }
    }, [data]);

    return (
        <Container align={'CENTER'} justify={'CENTER'}>
            <div className={`${styles.formContainer}`}>
                <Form
                    fields={formFieldsRegister}
                    button={<Button text={'Crear una cuenta'} type={'SUBMIT'} fill={false} autosize={false}/>}
                    onSubmit={handleSubmit}
                    errors={error}
                    title={'Registrarse'}
                    cancelButton={false}
                />
                <p className={`${styles.linksContainer}`}>
                    ¿Ya tienes una cuenta? &nbsp;
                    <a
                        onClick={e => {
                            e.preventDefault();
                            handleClick();
                        }}
                        className={`${styles.linksStyle}`}
                    >
                        ¡Inicia sesión ahora!
                    </a>
                </p>
            </div>
        </Container>
    )
}