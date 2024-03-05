import { useParams } from "react-router-dom";
import ProductImage from '../../assets/product.jpg';
import { Product } from '../../components/ProductCard/ProductCard.tsx';
import { useFetch } from "../../hooks/useFetch.tsx";
import { API_KEY, API_URL } from "../../constantes.ts";
import { useEffect, useState } from "react";
import '../ProductDetailPage/ProductDetailPage.css';

export const ProductDetailPage = () => {
    const { data, loading, error, get } = useFetch(API_URL);
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);

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
                        <label htmlFor="quantity">Cantidad:</label>
                        <select id="quantity" name="quantity" value={quantity} onChange={handleQuantityChange}>
                            {[1, 2, 3, 4, 5].map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                        <button className="add-to-cart-button">Agregar al carrito</button>
                    </div>
                </div>
            )}
        </div>
    );
};
export default ProductDetailPage;