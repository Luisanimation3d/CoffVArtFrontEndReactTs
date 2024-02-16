import styles from './InfoCardRedisign.module.css'
import {FiArrowUpCircle, FiMoreHorizontal} from "react-icons/fi";
import {useEffect, useState} from "react";

interface InfoCardProps {
    darkMode: boolean;
    direction?: any;
    [x: string]: any;
}

export const InfoCardRedisign = ({darkMode, direction = 'column', ...props}: InfoCardProps) => {

    return (
        <div
            className={`${styles.infoCard__container} ${darkMode ? styles.infoCard__container__darkMode : styles.infoCard__container__lightMode}`} {...props}>
            <div className={`${styles.infoCard__header}`}>
                <h2 className={`${styles.infoCard__header__title}`}>Producto más vendido</h2>
                <span className={`${styles.infoCard__header__icon}`}>
                    <FiMoreHorizontal/>
                </span>
            </div>
            <div className={`${styles.infoCard__body}`} style={{'flexDirection': direction}}>
                <div className={`${styles.infoCard__body__data}`}>
                    <div className={`${styles.infoCard__body__data__container}`}>
                        <span className={`${styles.infoCard__body__data__price}`}>
                            ${Intl.NumberFormat('es-CO').format(15025485)}
                        </span>
                        <div className={`${styles.infoCard__body__data__content}`}>
                            <h3 className={`${styles.infoCard__body__data__title}`}>Café Burdeo</h3>
                            <p className={`${styles.infoCard__body__data__description}`}>
                                Este café es el más vendido de la semana, con un total de 1500 unidades vendidas.
                            </p>
                        </div>
                    </div>
                    <div className={`${styles.infoCard__body__data__parameter}`}>
                        <span className={`${styles.infoCard__body__data__parameter__value}`}>
                            6.2%
                            <span className={`${styles.infoCard__body__data__parameter__icon}`}>
                                <FiArrowUpCircle/>
                            </span>
                        </span>
                    </div>
                </div>
                <div className={`${styles.infoCard__body__statics}`}>
                    <InfoCardBar day={'L'}/>
                    <InfoCardBar day={'M'}/>
                    <InfoCardBar day={'W'}/>
                    <InfoCardBar day={'J'}/>
                    <InfoCardBar day={'V'}/>
                    <InfoCardBar day={'S'}/>
                    <InfoCardBar day={'D'}/>
                </div>
            </div>
        </div>
    )
}

const InfoCardBar = ({day}: { day: string }) => {
    const randomNumber = Math.floor(Math.random() * 100) + 1

    const [height, setHeight] = useState<number>(0)

    useEffect(() => {
        setTimeout(() => {
            setHeight(randomNumber)
        }, 500)
    }, []);

    return (
        <div className={`${styles.infoCard__barContainer__container}`}>
            <div className={`${styles.infoCard__barContainer}`}>
                <span
                    className={`${styles.infoCard__barContainer__bar} ${height > 80 ? styles.infoCard__barContainer__bar__high : height > 50 ? styles.infoCard__barContainer__bar__medium : styles.infoCard__barContainer__bar__low}`}
                    style={{
                        height: `${height}%`,
                    }}
                >
                </span>
            </div>
            <span className={`${styles.infoCard__barContainer__day}`}>
                {day}
            </span>
        </div>
    )
}