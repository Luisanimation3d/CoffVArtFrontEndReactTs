import { Button } from '../Button/Button';

// import { useGlobalState } from '../../Context/GlobalState';

import { FC } from 'react';

import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { MiniCartProductCardProps } from '../../types/ProductCard'

import './ProductCard.css';

export interface Product {
	id: number;
	name: string;
	price: number;
	image: string;
	description: string;
	category: string;
	discount?: number;
	new?: boolean;
}

interface ProductCardProps {
	product: Product;
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
    // const { addToCart } = useGlobalState();
    // function handleAddToCart() {
    //     addToCart({ ...product, quantity: 1 });
    //     const buttonCart = document.querySelector(
    //         '#cartButton'
    //     ) as HTMLButtonElement;
    //     buttonCart?.click();
    // }

    return (
        <div className={`productCard`}>
            <div className='productCard--info-top'>
                {product.new && (
                    <div className='productCard__new'>
                        <p>New</p>
                    </div>
                )}
                {product.discount && (
                    <div className='productCard__discount'>
                        <p>{product.discount}%</p>
                    </div>
                )}
            </div>

            <button className='addFavorite'>
                <AiOutlineHeart />
                <AiFillHeart />
            </button>

            <div className={`productCard__image`}>
                <img src={product.image} alt={product.name} />
            </div>
            <div className={`productCard__info`}>
                <h3 className='product__name'>{product.name}</h3>
                {!product.discount ? (
                    <p className='product__price'>
                        ${new Intl.NumberFormat('es-co').format(product.price) || '0000'}
                    </p>
                ) : (
                    <div className='productCard__priceDiscount'>
                        <p className='product__price--discount'>
                            ${new Intl.NumberFormat('es-co').format(product.price) || '0000'}
                        </p>
                        <p className='product__price'>
                            $
                            {new Intl.NumberFormat('es-co').format(
                                product.price - (product.price * product.discount) / 100
                            ) || '0000'}
                        </p>
                    </div>
                )}
                <div className='product__actions'>
                    <Button
                        // onClick={handleAddToCart}
                        text={'Añadir al carrito'}
                        fill={false}
                        autosize={false}
                    />
                </div>
            </div>
        </div>
    );
};

export const MiniCartProductCard: FC<MiniCartProductCardProps> = ({
                                                                      product,
                                                                  }) => {
    // const { removeFromCart, addQuantity, removeQuantity } = useGlobalState();
    // function handleRemoveFromCart() {
    //     removeFromCart(product.id);
    // }
    //
    // function handleAddQuantity() {
    //     if (product.quantity >= 10) {
    //         return;
    //     }
    //     addQuantity(product.id);
    // }
    //
    // function handleRemoveQuantity() {
    //     if (product.quantity > 1) {
    //         removeQuantity(product.id);
    //     }
    // }

    return (
        <div className={`miniCartProductCard--container`}>
            <div className='miniCartProductCard--image'>
                <img src={product.image} alt={product.name} />
            </div>
            <div className='miniCartProductCard--info'>
                <span className='miniCartProductCard--brand'>Burdeo</span>
                <h4 className='miniCartProductCard--productName'>{product.name}</h4>
                <div className='miniCartProductCard--quantityInfo'>
                    <button
                        className={`miniCartProductCard--buttonQuantity ${
                            product.quantity === 1 &&
                            'miniCartProductCard--buttonQuantity--disabled'
                        }`}
                        // onClick={handleRemoveQuantity}
                    >
                        <FaMinus />
                    </button>
                    <p className='miniCartProductCard--quantity'>{product.quantity}</p>
                    <button
                        className={`miniCartProductCard--buttonQuantity ${product.quantity ===	 10 && 'miniCartProductCard--buttonQuantity--disabled'}`}
                        // onClick={handleAddQuantity}
                    >
                        <FaPlus />
                    </button>
                </div>
                {!product.discount ? (
                    <span className='miniCartProductCard--unitPriceInfo'>
						${new Intl.NumberFormat('es-co').format(product.price) || '0000'} x
						UNIT.
					</span>
                ) : (
                    <div className='miniCartProductCard--discountContainer'>
						<span className='miniCartProductCard--unitPriceInfoDiscount'>
							${new Intl.NumberFormat('es-co').format(product.price) || '0000'}{' '}
						</span>
                        <span className='miniCartProductCard--discountInfo'>
							$
                            {new Intl.NumberFormat('es-co').format(
                                product.price - (product.price * product.discount) / 100
                            ) || '0000'}{' '}
                            x UNIT.
						</span>
                    </div>
                )}
                <span className='miniCartProductCard--totalPriceInfo'>
					$
                    {!product.discount
                        ? new Intl.NumberFormat('es-co').format(
                        product.price * product.quantity
                    ) || '0000'
                        : new Intl.NumberFormat('es-co').format(
                        (product.price - (product.price * product.discount) / 100) *
                        product.quantity
                    ) || '0000'}
				</span>
            </div>
            <div className='miniCartProductCard--actions'>
                <button
                    className='miniCartProductCard--remove'
                    // onClick={handleRemoveFromCart}
                >
                    <FaTrash />
                </button>
            </div>
        </div>
    );
};

export const CartProductCard: FC<MiniCartProductCardProps> = ({ product }) => {
    // const { removeFromCart, addQuantity, removeQuantity } = useGlobalState();
    // function handleRemoveFromCart() {
    //     removeFromCart(product.id);
    // }
    // function handleAddQuantity() {
    //     if (product.quantity >= 10) {
    //         return;
    //     }
    //     addQuantity(product.id);
    // }
    // function handleRemoveQuantity() {
    //     if (product.quantity > 1) {
    //         removeQuantity(product.id);
    //     }
    // }

    return (
        <div className={`cartProductCard--container`}>
            <div className='cartProductCard--image'>
                <img src={product.image} alt={product.name} />
            </div>
            <div className='cartProductCard--info'>
                <div className='cartProductCard--infoContainer'>
                    <h4 className='cartProductCard--productName'>{product.name}</h4>
                    <div className='cartProductCard--description'>
                        Premium coffee with intense notes of cocoa and nuts.
                    </div>
                </div>

                <div className='cartProductCard--quantityInfo'>
                    <button className={`cartProductCard--buttonQuantity ${product.quantity === 1 && 'cartProductCard--buttonQuantity--disabled'}`}
                            // onClick={handleRemoveQuantity}
                    >
                        <FaMinus />
                    </button>
                    <p className='cartProductCard--quantity'>{product.quantity}</p>
                    <button className={`cartProductCard--buttonQuantity ${product.quantity === 10 && 'cartProductCard--buttonQuantity--disabled'}`}
                            // onClick={handleAddQuantity}
                    >
                        <FaPlus />
                    </button>
                </div>
                {!product.discount ? (
                    <span className='cartProductCard--unitPriceInfo'>
						${new Intl.NumberFormat('es-co').format(product.price) || '0000'} x
						UNIT.
					</span>
                ) : (
                    <div className='cartProductCard--discountContainer'>
						<span className='cartProductCard--unitPriceInfoDiscount'>
							${new Intl.NumberFormat('es-co').format(product.price) || '0000'}{' '}
						</span>
                        <span className='cartProductCard--discountInfo'>
							$
                            {new Intl.NumberFormat('es-co').format(
                                product.price - (product.price * product.discount) / 100
                            ) || '0000'}{' '}
                            x UNIT.
						</span>
                    </div>
                )}
                <span className='cartProductCard--totalPriceInfo'>
					$
                    {!product.discount
                        ? new Intl.NumberFormat('es-co').format(
                        product.price * product.quantity
                    ) || '0000'
                        : new Intl.NumberFormat('es-co').format(
                        (product.price - (product.price * product.discount) / 100) *
                        product.quantity
                    ) || '0000'}
				</span>
            </div>
            <div className='cartProductCard--actions'>
                <button className='cartProductCard--remove'
                        // onClick={handleRemoveFromCart}
                >
                    <FaTrash />
                </button>
            </div>
        </div>
    );
};