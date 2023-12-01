import { HeaderMenu } from "../../components/HeaderMenu/HeaderMenu"
import styles from './NotFoundPage.module.css'
import coffeeGif from '../../assets/descargar.gif';

export const NotFoundPage = () => {
    return (
        <>
            <HeaderMenu />
            <div className={styles.NotFoundContainer}>
                <img src={coffeeGif} alt="Coffe Cup" className={styles.NotFoundImage}/>
                <h1 className={styles.NotFoundTitle}>404</h1>
            </div>
        </>
    )
}