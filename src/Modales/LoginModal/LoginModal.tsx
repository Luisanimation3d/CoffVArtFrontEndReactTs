import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {FormField} from "../../types/Form";
import {Modal, ModalContainer} from "../../components/Modal/Modal.tsx";
import {Form} from "../../components/Form/Form.tsx";
import {Button} from "../../components/Button/Button.tsx";
import ImageLogin from '../../assets/LoginImage.png'
import {useAuth} from '../../context/AuthContext.tsx'

import styles from './LoginModal.module.css';
import {useFetch} from "../../hooks/useFetch.tsx";
import {API_KEY, API_URL} from "../../utils/constantes.ts";
import Swal from "sweetalert2";

export const LoginModal = ({showModal}: { showModal: (e: boolean) => void }) => {
    const location = useLocation();
    const {pathname} = location;
    const navigate = useNavigate();
    const {login, isAuthenticated, updateUser, user} = useAuth();

    const handleClick = () => {
        navigate({
            pathname,
            search: 'register'
        })
    }

    const {data, error: errorLogin, post, get} = useFetch(API_URL)

    console.log(errorLogin)

    const [error, setError] = useState<{ [key: string]: string }>({});

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
    });

    const formFieldsLogin: FormField[] = [
        {
            name: 'email',
            type: 'text',
            label: 'Email',
            placeholder: 'Enter your email',
            value: loginForm.email,
            onChange: (value: string) => setLoginForm({...loginForm, email: value}),
            size: 'large',
        },
        {
            name: 'password',
            type: 'password',
            label: 'Password',
            placeholder: 'Enter your password',
            value: loginForm.password,
            onChange: (value: string) => setLoginForm({...loginForm, password: value}),
            size: 'large',
        },
    ]

    const validate = (values: any) => {
        console.log(values);
        const errors: any = {};
        if (!values.email) {
            errors.email = 'El correo Electrónico es requerido'
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = 'El correo electrónico es inválido'
        }
        if (!values.password) {
            errors.password = 'La contraseña es requerida'
        }
        return errors;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError({})
        const errors = validate(loginForm);
        if (Object.keys(errors).length === 0) {
            post(`login?apikey=${API_KEY}`, {
                email: loginForm.email,
                password: loginForm.password,
            })
        } else {
            setError(errors);
        }
    }

    useEffect(() => {
        // extract the error from the response
        if (errorLogin) {
            const newError: any = {
                email: errorLogin?.msg || '',
                password: errorLogin?.msg || '',
            }
            setError(newError);
        }
    }, [errorLogin])

    useEffect(() => {
        if (data?.token) {
            login(null, data.token);
            Swal.fire({
                title: 'Bienvenido',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            })
        }

        if(user){
            showModal(false);
            navigate('/admin/my-profile')
        }
    }, [data, user])

    useEffect(() => {
        if (isAuthenticated) {
            get(`login/getTokenData?apikey=${API_KEY}`)
        }
    }, [isAuthenticated])

    useEffect(() => {
        if (data?.user) {
            const userToUpdate = {
                email: data.user?.email,
                name: data.user?.name,
                role: data.user?.role,
                permissions: data.user?.permissions,
                address: data.user?.coustomer?.address,
                phone: data.user?.coustomer?.phone,
                document: data.user?.coustomer?.document,
                documentType: data.user?.coustomer?.documentType,

            }
            updateUser(userToUpdate);
        }
    }, [data]);

    return (
        <>
            <ModalContainer ShowModal={showModal}>
                <Modal showModal={showModal} className={`${styles.LoginModal}`} xColor={'#9f212f'}>
                    <div className={`${styles.imageContainer}`}>
                        <img src={ImageLogin} alt="Login Image"/>
                    </div>
                    <div className={`${styles.formContainer}`}>
                        <Form fields={formFieldsLogin}
                              button={<Button text={'Iniciar Sesión'} type={'SUBMIT'} fill={false} autosize={false}/>}
                              errors={error}
                              onSubmit={handleSubmit} title={'Iniciar Sesión'}
                              cancelButton={false}
                              extra={
                                  <a
                                      onClick={e => {
                                          e.preventDefault();
                                          navigate('/user/sendRecoveryPassword')
                                      }}
                                      className={`${styles.linksStyle}`}
                                      style={{
                                          width: '100%',
                                          textAlign: 'left',
                                      }}
                                  >
                                      Olvidé mi contraseña
                                  </a>
                              }
                        />
                        <p className={`${styles.linksContainer}`}>
                            ¿Aún no tienes una cuenta? &nbsp;
                            <a
                                onClick={e => {
                                    e.preventDefault();
                                    handleClick();
                                }}
                                className={`${styles.linksStyle}`}
                            >
                                ¡Regístrate aquí!
                            </a>
                        </p>
                    </div>
                </Modal>
            </ModalContainer>
        </>
    )

}