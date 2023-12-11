import {useAuth} from "../../context/AuthContext.tsx";
import {useFetch} from "../../hooks/useFetch.tsx";
import {API_KEY, API_URL} from "../../constantes.ts";
import {useEffect, useState} from "react";
import {FormField} from "../../types/Form";
import {Container} from "../../components/Container/Container.tsx";
import styles from "./Login.module.css"
import {Form} from "../../components/Form/Form.tsx";
import {Button} from "../../components/Button/Button.tsx";
import {useNavigate} from "react-router-dom";

export const Login = () => {
    const {login, isAuthenticated, updateUser, user} = useAuth();
    const navigate = useNavigate();
    const {data, error: errorLogin, post, get} = useFetch(API_URL)
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

    const handleClick = () => {
        navigate('/user/Register');
    }

    useEffect(() => {
        // extract the error from the response
        if (errorLogin) {
            const newError: any = {
                email: errorLogin || '',
                password: errorLogin || '',
            }
            setError(newError);
        }
    }, [errorLogin])

    useEffect(() => {
        if(data?.token) {
            login(null, data.token);
            alert('Login exitoso');
        }

        if(user){
            if(localStorage.getItem('CartComes') === 'true'){
                localStorage.removeItem('CartComes');
                setTimeout(()=> {
                    navigate('/user/checkout')
                }, 500)
            }else{
                setTimeout(()=> {
                    navigate('/admin/my-profile');
                },500)
            }
        }
    }, [data, user])

    useEffect(() => {
        if(isAuthenticated){
            get(`login/getTokenData?apikey=${API_KEY}`)
        }
    }, [isAuthenticated])

    useEffect(() => {
        if (data?.user) {
            const userToUpdate = {
                email: data.user.email,
                name: data.user.name,
                role: data.user.role,
                permissions: data.user.permissions,
                address: data.user.coustomer.address,
                phone: data.user.coustomer.phone,
                document: data.user.coustomer.document,
                documentType: data.user.coustomer.documentType,

            }
            updateUser(userToUpdate);
        }
    }, [data]);

    return (
        <Container direction={'ROW'} justify={'CENTER'} align={'CENTER'} className={styles.loginContainer}>
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
        </Container>
    )
}

export default Login;