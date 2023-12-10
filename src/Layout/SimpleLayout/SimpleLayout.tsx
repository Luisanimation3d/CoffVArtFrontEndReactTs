import styles from './SimpleLayout.module.css';
import logoBurdeo from '../../assets/burdeoLogo.png';
import {FiInstagram, FiFacebook} from 'react-icons/fi'
import {Outlet, useNavigate} from "react-router-dom";

export const SimpleLayout = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.fullContainer}>
            <header className={styles.header}>
                <img src={logoBurdeo} alt="Logo Burdeo" style={{
                    cursor: 'pointer'
                }} onClick={()=> navigate('/home')}/>
            </header>
            <main className={styles.main}>
                <Outlet/>
            </main>
            <footer className={styles.footer}>
                <div className={styles.col}>
                    © {new Date().getFullYear()} Burdeo. Todos los derechos reservados.
                </div>
                <div className={styles.col}>
                    <a href="" className={styles.socialMedia}>
                        <FiInstagram/>
                    </a>
                    <a href="" className={styles.socialMedia}>
                        <FiFacebook/>
                    </a>
                </div>
                <div className={styles.col}>
                    CoffVart
                </div>
            </footer>
        </div>

    )
}

export default SimpleLayout;