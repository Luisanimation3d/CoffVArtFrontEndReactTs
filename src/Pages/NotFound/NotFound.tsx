import styles from './NotFoundPage.module.css';
import logoBurdeo from '../../assets/LogoBurdeoIcon.png';
import {Link} from "react-router-dom";

export const NotFound = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.notFound__title}>
                4
                <span className={styles.image__container}>
                    <img src={logoBurdeo} alt="logo" className={styles.logo}/>
                </span>
                4
            </h1>
            <h2 className={styles.notFound__subtitle}>Página no encontrada</h2>
            <p className={styles.paragraph}>
                No pudimos encontrar la página que estás buscando.
            </p>
            <Link to={'/'} className={styles.link}>Volver al Inicio</Link>
        </div>
    )
}