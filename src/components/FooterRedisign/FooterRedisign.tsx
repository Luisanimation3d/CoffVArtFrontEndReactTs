import styles from './FooterRedisign.module.css';

import logoBurdeo from '../../assets/burdeoLogo.png';
import {Link} from "react-router-dom";

export const FooterRedisignDesktop = () => {
    return (
        <div className={`${styles.footer__container}`}>
            <div className={`${styles.footer__one__row}`}>
                <div className={`${styles.col}`}>
                    <div className={styles.image__container}>
                        <img src={logoBurdeo} alt="logo" />
                    </div>
                </div>
                <div className={`${styles.col}`}>
                    <ul className={styles.list}>
                        <h3>Burdeo</h3>
                        <li>
                            <Link to={'/nosotros'}>Nosotros</Link>
                        </li>
                        <li>
                            <Link to={'/tiendaUser'}>Tienda</Link>
                        </li>
                    </ul>
                    <ul className={styles.list}>
                        <h3>Contacto</h3>

                    </ul>
                </div>
                <div className={`${styles.col}`}>
                </div>
            </div>
        </div>
    )
}