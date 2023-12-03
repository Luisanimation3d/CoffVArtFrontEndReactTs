import {Link, useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import {FormField} from "../../types/Form";
import {Modal, ModalContainer} from "../../components/Modal/Modal.tsx";
import {Form} from "../../components/Form/Form.tsx";
import {Button} from "../../components/Button/Button.tsx";
import ImageLogin from '../../assets/LoginImage.png'

import styles from './LoginModal.module.css';

export const LoginModal = ({showModal}: { showModal: (e: boolean) => void }) => {
    const location = useLocation();
    const {pathname} = location;
    const navigate = useNavigate();

    const handleClick = () => {
        navigate({
            pathname,
            search: 'register'
        })
    }

    const [error, setError] = useState<{ [key: string]: string }>({});

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
    });

    const formFieldsLogin: FormField[] = [
        {
            name: 'email',
            type: 'email',
            label: 'Email',
            placeholder: 'Enter your email',
            value: loginForm.email,
            onChange: (e: any) => setLoginForm({...loginForm, email: e.target.value}),
            size: 'large',
        },
        {
            name: 'password',
            type: 'password',
            label: 'Password',
            placeholder: 'Enter your password',
            value: loginForm.password,
            onChange: (e: any) => setLoginForm({...loginForm, password: e.target.value}),
            size: 'large',
        },
    ]

    return (
        <>
            <ModalContainer ShowModal={showModal}>
                <Modal showModal={showModal} className={`${styles.LoginModal}`}>
                    <div className={`${styles.imageContainer}`}>
                        <img src={ImageLogin} alt="Login Image"/>
                    </div>
                    <div className={`${styles.formContainer}`}>
                        <Form fields={formFieldsLogin}
                              button={<Button text={'Iniciar Sesión'} type={'SUBMIT'} fill={false} autosize={false}/>} errors={error}
                              onSubmit={() => null} title={'Iniciar Sesión'}
                              cancelButton={false}
                        />
                        <span className={`${styles.linksContainer}`}>
                            ¿Aún no tienes una cuenta?
                            <a
                                onClick={e=> {
                                    e.preventDefault();
                                    handleClick();
                                }}
                                className={`${styles.linksStyle}`}
                            >
                                ¡Regístrate aquí!
                            </a>
                        </span>
                    </div>
                </Modal>
            </ModalContainer>
        </>
    )

}