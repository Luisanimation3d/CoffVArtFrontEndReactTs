import styles from './Cart.module.css'
import {Button} from "../../components/Button/Button.tsx";
import {useCart} from "../../context/CartContext.tsx";
import {CartProductCard} from "../../components/ProductCard/ProductCard.tsx";
import {useNavigate} from "react-router-dom";

export const Cart = () => {
    const navigate = useNavigate()
    const {cart} = useCart()

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    const impuestos = subtotal * 0.19
    const total = subtotal + impuestos + 10000

    return (
        <>
            {
                cart.length === 0 ?
                    (
                        <div className={styles.emptyCartContainer}>
                            <div className={styles.emptyCartTitle}>Tu carrito está vacío</div>
                            <div className={styles.emptyCartSubtitle}>Parece que aún no has elegido lo que quieres
                                comprar
                            </div>
                            <Button text={'Seguir comprando'} fill={true} autosize={false}
                                    onClick={() => navigate('/tiendaUser')}/>
                        </div>
                    )
                    :
                    (
                        <div className={styles.cartContainer}>
                            <nav className={styles.navigationCartContainer}>
                                <ul className={`${styles.navigationList}`}>
                                    <li className={`${styles.navigationListItem} ${styles['navigationListItem--active']}`}>Carrito</li>
                                    <li className={`${styles.navigationListItem}`}>Completa tu información</li>
                                    <li className={`${styles.navigationListItem}`}>Envío</li>
                                    <li className={`${styles.navigationListItem}`}>Pago</li>
                                </ul>
                            </nav>
                            <div className={styles.cartResumeContainer}>
                                <div className={styles.productCartContainer}>
                                    <div className={styles.productsCartContainerCards}>
                                        {
                                            cart?.map((item, index) => {
                                                return (
                                                    <CartProductCard product={item} key={index}/>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className={styles.summaryContainer}>
                                    <div className={styles.summaryItem}>
                                        <div className={styles.summaryItemTitle}>Subtotal</div>
                                        <div
                                            className={styles.summaryItemValue}>$ {Intl.NumberFormat('es-co').format(subtotal)}</div>
                                    </div>
                                    <div className={styles.summaryItem}>
                                        <div className={styles.summaryItemTitle}>Impuestos</div>
                                        <div
                                            className={styles.summaryItemValue}>$ {Intl.NumberFormat('es-co').format(impuestos)}</div>
                                    </div>
                                    <div className={styles.summaryItem}>
                                        <div className={styles.summaryItemTitle}>Envío</div>
                                        <div className={styles.summaryItemValue}>$ 10.000</div>
                                    </div>
                                    <div className={`${styles.summaryItem} ${styles.summaryItemTotal}`}>
                                        <div className={styles.summaryItemTitle}>Total</div>
                                        <div
                                            className={styles.summaryItemValue}>$ {Intl.NumberFormat('es-co').format(total)}</div>
                                    </div>
                                    <div className={styles.buttonsContainer}>
                                        <Button text={'Finalizar orden'} fill={false} autosize={false}/>
                                        <Button text={'Seguir comprando'} fill={true} autosize={false}
                                                onClick={() => navigate('/tiendaUser')}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
            }
        </>
    )
}