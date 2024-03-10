import { useParams } from "react-router-dom";
import ProductImage from '../../assets/product.jpg';
import { Product } from '../../components/ProductCard/ProductCard.tsx';
import { useFetch } from "../../hooks/useFetch.tsx";
import { API_KEY, API_URL } from "../../utils/constantes.ts";
import { useEffect, useState } from "react";
import '../ProductDetailPage/ProductDetailPage.css';
import {useCart} from "../../context/CartContext.tsx";
import toast, {Toaster} from "react-hot-toast";
import {FiMinus, FiPlus} from "react-icons/fi";

export const ProductDetailPage = () => {
    const { data, loading, error, get } = useFetch(API_URL);
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);

    const {addToCart} = useCart()

    function handleAddToCart() {
        if (!product) return;

        if(product.stock !== undefined && quantity > product.stock){
            toast('No hay suficiente stock', {
                icon: '🔥',
                position: 'bottom-right',
            });
            return
        }

        addToCart({ ...product, quantity });
        const buttonCart = document.querySelector(
            '#cartButton'
        ) as HTMLButtonElement;
        buttonCart?.click();

        toast('Producto agregado al carrito', {
            icon: '🛒',
            position: 'bottom-left',
        });

    }

    const { id } = useParams();

    useEffect(() => {
        get(`products/${id}?apikey=${API_KEY}`);
    }, [id]);

    useEffect(() => {
        if (data?.product) {
            const productData = data.product;
            const productInfo: Product = {
                id: productData.id,
                name: productData.name,
                price: productData.unitPrice,
                image: ProductImage,
                description: productData.description,
                link: `/producto/${productData.id}`,
                new: new Date(productData.createdAt) > new Date(new Date().setDate(new Date().getDate() - 7)),
                stock: productData.amount,
            };
            setProduct(productInfo);
        }
    }, [data]);

    const handleQuantityChange = (e) => {
        setQuantity(parseInt(e.target.value, 10));
    };

    const handleAddQuantity = () => {
        if(!product) return

        if(product.stock !== undefined && quantity > product.stock){
            toast('No hay suficiente stock', {
                icon: '🔥',
                position: 'bottom-right',
            });
            return
        }

        setQuantity(quantity + 1);
    }

    const handleSubtractQuantity = () => {
        if(quantity <= 1) return
        setQuantity(quantity - 1);
    }

    return (
        <div className="product-detail-container">
            {product && (
                <div className="product-content">
                    <div className="product-image-container">
                        <img className="product-image" src={product.image} alt={product.name} />
                    </div>
                    <div className="product-info">
                        <h1 className="product-title">{product.name}</h1>
                        <p className="product-description">{product.description}</p>
                        <p className="product-price">${product.price}</p>
                        <div className={`selectorQuantityContainer`}>
                            <button onClick={handleSubtractQuantity}><FiMinus/></button>
                            <span>{quantity}</span>
                            <button onClick={handleAddQuantity}><FiPlus/></button>
                        </div>
                        {/*<label htmlFor="quantity">Cantidad:</label>*/}
                        {/*<select id="quantity" name="quantity" value={quantity} onChange={handleQuantityChange}>*/}
                        {/*    {[1, 2, 3, 4, 5].map((value) => (*/}
                        {/*        <option key={value} value={value}>*/}
                        {/*            {value}*/}
                        {/*        </option>*/}
                        {/*    ))}*/}
                        {/*</select>*/}
                        <button className="add-to-cart-button" onClick={handleAddToCart}>Agregar al carrito</button>
                    </div>
                </div>
            )}
            <Toaster toastOptions={{
                duration: 2000,
            }}/>
        </div>
    );
};
export default ProductDetailPage;