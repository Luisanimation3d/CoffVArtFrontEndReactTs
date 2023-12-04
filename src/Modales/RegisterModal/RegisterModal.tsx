import {FormField} from "../../types/Form";
import {Modal, ModalContainer} from "../../components/Modal/Modal.tsx";
import {Form} from "../../components/Form/Form.tsx";
import {Button} from "../../components/Button/Button.tsx";
import {useEffect, useState} from "react";
import styles from './RegisterModal.module.css';
import {useLocation, useNavigate} from "react-router-dom";

import ImageRegister from '../../assets/RegisterImage.png'
import {useFetch} from "../../hooks/useFetch.tsx";
import {API_KEY, API_URL} from "../../constantes.ts";

export const RegisterModal = ({showModal}: { showModal: (e: boolean) => void }) => {
    const location = useLocation();
    const { pathname } = location;
    const navigate = useNavigate();
    const {data, post, error: errorRegister} = useFetch(API_URL)
    const [registerForm, setRegisterForm] = useState({
        name: '',
        lastname: '',
        address: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
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
        }
    ]

    const handleClick = () => {
        navigate({
            pathname: pathname,
            search: `login`,
        });
    };

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
        return errors;
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setError({})
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            post(`users?apikey=${API_KEY}`, {...registerForm, roleId: 1})
        } else {
            console.log('Formulario inválido');
            setError(errors);
        }
    }

    useEffect(() => {
        if (data?.newUser && !errorRegister) {
            alert('Usuario creado correctamente')
            console.log(data)
            navigate({
                pathname: pathname,
                search: `login`,
            });
        }
    }, [data]);

    return (
        <>
            <ModalContainer ShowModal={showModal}>
                <Modal showModal={showModal} xColor={'#9f212f'} className={`${styles.RegisterModal}`}>
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
                    <div className={`${styles.imageContainer}`}>
                        <img src={ImageRegister} alt="Register Image"/>
                    </div>
                </Modal>
            </ModalContainer>
        </>
    )
}