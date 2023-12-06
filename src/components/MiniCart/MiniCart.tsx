import styles from './MiniCart.module.css';
import {useNavigate} from "react-router-dom";
import {FiX, FiShoppingCart} from "react-icons/fi";
import {MiniCartProductCard} from "../ProductCard/ProductCard.tsx";
import {Button} from "../Button/Button.tsx";
import {useCart} from "../../context/CartContext.tsx";
import {useState} from "react";

export const MiniCart = ({setShowMiniCart}: { setShowMiniCart: (showMiniCart: boolean) => void; }) => {
    const {cart} = useCart();
    const [closeCart, setCloseCart] = useState(false);
    const descuento = cart.reduce(
        (acc, product) =>
            product.discount
                ? acc + (product.price * product.quantity * product.discount) / 100
                : acc + 0, 0
    );
    const subtotal = cart.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
    );
    const total = subtotal - descuento;
    const navigate = useNavigate()
    return (
        <div className={`${styles['miniCart--overlay']}`} onClick={() => {
            setCloseCart(true)
            setTimeout(() => setShowMiniCart(false), 500)
        }}>
            <div className={`${styles['miniCart--container']} ${closeCart ? styles['miniCart--container-close'] : ''}`} onClick={e => e.stopPropagation()}>
                <div className={styles['miniCart--header']}>
                    <h3 className={styles['miniCart-Title']}>Carrito</h3>
                    <button className={styles['miniCart--close']} onClick={() => {
                        setCloseCart(true)
                        setTimeout(() => setShowMiniCart(false), 500)
                    }}>
                        <FiX/>
                    </button>
                </div>
                <div className={styles['miniCart--body']}>
                    {
                        cart.length > 0 ? (
                            cart?.map((product: any) => (
                                <MiniCartProductCard key={product?.id} product={product}/>
                            ))
                        ) : (
                            <div className={styles['miniCart--emptyMessage']}>
                                <FiShoppingCart/>
                                <p>Carrito vacío</p>
                            </div>
                        )
                    }
                </div>
                    {cart.length > 0 && (
                        <div className={styles['miniCart--footer']}>
							<span className={styles['miniCart--footerSubTotal']}>
								Subtotal{' '}
                                <span>
									${new Intl.NumberFormat('es-co').format(subtotal) || '0000'}
								</span>
							</span>
                            {/* <span className='miniCart--footerDiscount'>
								Descuento
								<span>
									${new Intl.NumberFormat('es-co').format(descuento) || '0000'}
								</span>
							</span> */}
                            <span className={styles['miniCart--footerTotal']}>
								Total{' '}
                                <span>
									${new Intl.NumberFormat('es-co').format(total) || '0000'}
								</span>
							</span>
                            <Button
                                text={'Finalizar compra'}
                                onClick={() => navigate('/cart')}
                                fill={false}
                                autosize={false}
                            />
                        </div>
                    )}
            </div>
        </div>
    )
}