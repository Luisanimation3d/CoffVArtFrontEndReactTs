import BannerBurdeo1 from '../../assets/BannerBurdeo1.png';
import BannerBurdeo2 from '../../assets/BannerBurdeo2.png';
import ProductImage from '../../assets/product.jpg';
import {SliderBanner} from "../../components/SliderBanner/SliderBanner.tsx";
import { Product, ProductCard } from '../../components/ProductCard/ProductCard.tsx';
import '../Catalogue/TiendaUser.css';
import {useFetch} from "../../hooks/useFetch.tsx";
import {API_KEY, API_URL} from "../../constantes.ts";
import {useEffect, useState} from "react";


export const TiendaUser = () => {
	const {data, loading, error, get} = useFetch(API_URL)
	const [priceFilter, setPriceFilter] = useState<number | null>(null);
	const [products, setProducts] = useState<Product[]>([])

    const images = [BannerBurdeo1, BannerBurdeo2];
	

	useEffect(() => {
		get(`products?apikey=${API_KEY}`)
	}, [])

	useEffect(() => {
		if (data?.products) {
			const productsArray = data?.products?.rows.map((product: any) => ({
				id: product.id,
				name: product.name,
				price: product.unitPrice,
				image: ProductImage,
				description: product.description,
				link: `/producto/${product.id}`,
				new: new Date(product.createdAt) > new Date(new Date().setDate(new Date().getDate() - 7)),
				stock: product.amount
			}))
			setProducts(productsArray)
		}
	}, [data]);

	return (
        <div className="home__container">
            <div className="home__bannerContainer">
                <SliderBanner images={images} autoPlayInterval={2500}/>
            </div>
		<div className='tiendaUser--container'>
			<div className='tiendaUser--contentContainer'>
				<div className='tiendaUser--filterContainer'>
					<div className='tiendaUser--filterContainer__filter'>
						<div className='tiendaUser--filterContainer__filter__title'>
							<h3>Filtros</h3>
							<div className='tiendaUser--filterContainer__filter__item'>
                                    <label>Precio:</label>
                                    <input
                                        type='range'
                                        min={0}
                                        max={1000} // Ajusta el valor máximo según tus necesidades
                                        step={10}
                                        value={priceFilter ?? ''}
                                        onChange={(e) => setPriceFilter(e.target.value === '' ? null : parseInt(e.target.value))}
                                    />
                                    <span>{priceFilter !== null ? `$${priceFilter}` : 'Todos'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
				<div className='tiendaUser--productsContainer'>
					<div className='tiendaContainer--row1Productos'></div>
					<div className='tiendaContainer--row2Productos'>
						{products.map((producto) => {
							return <ProductCard key={producto.id} product={producto} />;
						})}
					</div>
				</div>
			</div>
            </div>
		</div>
	);
};

export default TiendaUser;