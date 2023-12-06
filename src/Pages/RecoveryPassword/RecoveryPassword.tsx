import {FormField} from "../../types/Form";
import {Form} from "../../components/Form/Form.tsx";
import {Button} from "../../components/Button/Button.tsx";
import {useEffect, useState} from "react";
import {Container} from "../../components/Container/Container.tsx";
import {Titles} from "../../components/Titles/Titles.tsx";

import styles from './RecoveryPassword.module.css';
import {useFetch} from "../../hooks/useFetch.tsx";
import {API_KEY, API_URL} from "../../constantes.ts";
import {useParams} from "react-router-dom";

export const SendEmail = () => {
    const {data, error: errorPost, post} =useFetch(API_URL)
    const [email, setEmail] = useState('');
    const [error, setError] = useState({});
    const formFields: FormField[] = [
        {
            label: 'Email',
            name: 'email',
            value: email,
            onChange: (value) => setEmail(value),
            type: 'text',
            size: 'large'
        }
    ];

    const validate = () => {
        const errors: any = {};
        if (!email) {
            errors.email = 'El email es requerido';
        }else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'El email es inválido';
        }
        return errors;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length) {
            setError(errors);
            return;
        }
        setError({});

        post(`auth/forgot-password?apikey=${API_KEY}`, {email})
    }

    useEffect(() => {
        if (errorPost){
            setError({email: errorPost})
        }
    }, [errorPost]);

    useEffect(() => {
        if (data?.msg) {
            alert(data.msg)
        }
    }, [data]);

    return (
        <>
            <Container align={'CENTER'} justify={'CENTER'} className={styles.container}>
                <Titles title={'¿Olvidaste tu contraseña?'} transform={'UPPERCASE'} level={2}/>
                <Titles title={'Ingresa tu correo electrónico y te enviaremos un link para restablecer tu contraseña.'} level={6}/>
                <Form
                    fields={formFields}
                    onSubmit={handleSubmit}
                    button={<Button type={'Submit'} text={'Enviar Link'}/>} cancelButton={false}
                    errors={error}
                />
            </Container>
        </>
    )
}

export const ResetPassword = () => {
    const {token} = useParams();
    const {data, error: errorPost, post} = useFetch(API_URL)
    const [changePassword, setChangePassword] = useState({
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState({});
    const formFields: FormField[] = [
        {
            label: 'Contraseña',
            name: 'password',
            value: changePassword.password,
            onChange: (value) => setChangePassword({...changePassword, password: value}),
            type: 'password',
            size: 'large'
        },
        {
            label: 'Confirmar contraseña',
            name: 'confirmPassword',
            value: changePassword.confirmPassword,
            onChange: (value) => setChangePassword({...changePassword, confirmPassword: value}),
            type: 'password',
            size: 'large'
        }
    ];

    const validate = () => {
        const errors: any = {};
        if (!changePassword.password) {
            errors.password = 'La contraseña es requerida';
        } else if (changePassword.password.length < 8) {
            errors.password = 'La contraseña debe tener al menos 8 caracteres';
        }
        if (!changePassword.confirmPassword) {
            errors.confirmPassword = 'La confirmación de la contraseña es requerida';
        } else if (changePassword.password !== changePassword.confirmPassword) {
            errors.password = 'Las contraseñas no coinciden';
            errors.confirmPassword = 'Las contraseñas no coinciden';
        }
        return errors;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length) {
            setError(errors);
            return;
        }
        setError({});
        const sendData = {
            password: changePassword.password,
            token
        }
        console.log('lo mandó')
        post(`auth/reset-password?apikey=${API_KEY}`, sendData)
    }

    useEffect(() => {
        if (errorPost){
            setError({password: errorPost})
        }
    }, [errorPost]);

    useEffect(() => {
        if (data?.msg) {
            alert(data.msg)
        }
    }, [data]);

    return (
        <>
            <Container align={'CENTER'} justify={'CENTER'} className={styles.container}>
                <Titles title={'Restablecer contraseña'} transform={'UPPERCASE'} level={2}/>
                <Titles title={'Ingresa tu nueva contraseña.'} level={6}/>
                <Form
                    fields={formFields}
                    onSubmit={handleSubmit}
                    button={<Button type={'Submit'} text={'Restablecer contraseña'}/>} cancelButton={false}
                    errors={error}
                />
            </Container>
        </>
    )
}