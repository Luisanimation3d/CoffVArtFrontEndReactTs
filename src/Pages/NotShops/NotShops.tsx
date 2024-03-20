import styles from '../NotShops/NotShopsPage.module.css';
import logoBurdeo from '../../assets/LogoBurdeoIcon.png';
import {Link} from "react-router-dom";

export const NotShops = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.notFound__title}>
                <span className={styles.image__container}>
                    <img src={logoBurdeo} alt="logo" className={styles.logo}/>
                </span>
            </h1>
            <h2 className={styles.notFound__subtitle}>¿Listo para encontrar algo genial?</h2>
            <p className={styles.paragraph}>
            Echa un vistazo a nuestros productos ahora.
            </p>
            <Link to={'/tiendaUser'} className={styles.link}>Ir a la tienda</Link>
        </div>
    )
}