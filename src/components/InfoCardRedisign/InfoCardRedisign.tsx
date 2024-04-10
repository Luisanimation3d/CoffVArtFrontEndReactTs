import styles from './InfoCardRedisign.module.css'
import {FiArrowUpCircle, FiMoreHorizontal} from "react-icons/fi";
// import {useEffect, useState} from "react";
// import { useFetch } from '../../hooks/useFetch';
// import { API_URL, API_KEY } from '../../utils/constantes';

interface InfoCardProps {
    darkMode: boolean;
    direction?: any;
    [x: string]: any;
    titulo: string;
    productoMasVendido?: string;
    cantidadMasVendida?: number;
    productoMenosVendido?: string;
    cantidadMenosVendida?: number;
    totalVentasmes?: number;
    ventasPorMes?: [number, number][];
}

export const InfoCardRedisign = ({darkMode, direction = 'column', titulo, ventasPorMes, productoMasVendido, cantidadMasVendida, productoMenosVendido, cantidadMenosVendida, totalVentasmes, ...props}: InfoCardProps) => {

    return (
        <div
            className={`${styles.infoCard__container} ${darkMode ? styles.infoCard__container__darkMode : styles.infoCard__container__lightMode}`} {...props}>
            <div className={`${styles.infoCard__header}`}>
                <h2 className={`${styles.infoCard__header__title}`}>{titulo}</h2>
                <span className={`${styles.infoCard__header__icon}`}>
                    <FiMoreHorizontal/>
                </span>
            </div>
            <div className={`${styles.infoCard__body}`} style={{'flexDirection': direction}}>
                <div className={`${styles.infoCard__body__data}`}>
                    <div className={`${styles.infoCard__body__data__container}`}>
                        <span className={`${styles.infoCard__body__data__price}`}>
                            ${Intl.NumberFormat('es-CO').format(totalVentasmes || 0)}
                        </span>
                        <div className={`${styles.infoCard__body__data__content}`}>
                            <h3 className={`${styles.infoCard__body__data__title}`}>{productoMasVendido}</h3>
                            <p className={`${styles.infoCard__body__data__description}`}>
                                Este café es el más vendido de la semana, con un total de {cantidadMasVendida} unidades vendidas.
                            </p>
                        </div>
                        <div className={`${styles.infoCard__body__data__content}`}>
                            <h3 className={`${styles.infoCard__body__data__title}`}>{productoMenosVendido}</h3>
                            <p className={`${styles.infoCard__body__data__description}`}>
                                Este café es el menos vendido de la semana, con un total de {cantidadMenosVendida} unidades vendidas.
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
                {ventasPorMes?.map(([mes, ventaTotal]) => (
            <InfoCardBar key={mes} month={mes} ventaTotal={ventaTotal} ventasPorMes={ventasPorMes}/>
          ))}
                </div>
            </div>
        </div>
    )
}

const InfoCardBar = ({ month, ventaTotal, ventasPorMes }: { month: number; ventaTotal: number; ventasPorMes: [number, number][]; }) => {
    const maxVentaTotal = Math.max(...ventasPorMes.map(([_, venta]) => venta));
    const height = (ventaTotal / maxVentaTotal) * 100;
  

    return (
        <div className={`${styles.infoCard__barContainer__container}`}>
          <div className={`${styles.infoCard__barContainer}`}>
            <span
              className={`${styles.infoCard__barContainer__bar} ${
                height > 80
                  ? styles.infoCard__barContainer__bar__high
                  : height > 50
                  ? styles.infoCard__barContainer__bar__medium
                  : styles.infoCard__barContainer__bar__low
              }`}
              style={{
                height: `${height}%`,
              }}
            ></span>
          </div>
          <span className={`${styles.infoCard__barContainer__day}`}>
            {new Date(0, month).toLocaleString('es-ES', { month: 'short' })}
          </span>
        </div>
      );
    };