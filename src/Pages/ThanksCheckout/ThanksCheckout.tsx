import LogoBurdeo from '../../assets/burdeoLogo.png'
import {useAuth} from "../../context/AuthContext.tsx";
import styles from './ThanksCheckout.module.css'
import {Button} from "../../components/Button/Button.tsx";
import {useNavigate} from "react-router-dom";

export const ThanksCheckout = () => {
    const {user} = useAuth()
    const navigate = useNavigate()
    return (
        <>
            <div className={styles.ThanksContainer}>
                <div className={styles.imageContainer}>
                    <img src={LogoBurdeo} alt=""/>
                </div>
                <div className={styles.ThanksInfo}>
                    <h1>Gracias por tu compra</h1>
                    <p>Tu pedido ha sido procesado con éxito. Recibirás un correo electrónico de confirmación a <span>{user?.email}</span> con los detalles de tu pedido.</p>
                    <p>Si tienes alguna pregunta, no dudes en contactarnos a <span><a href='mailto:soporte@burdeo.com'>soporte@burdeo.com</a></span></p>
                    <Button text="Volver al inicio" onClick={() => navigate('/')}/>
                </div>
            </div>
        </>
    )
}

export default ThanksCheckout