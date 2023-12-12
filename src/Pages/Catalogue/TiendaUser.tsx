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
	const [products, setProducts] = useState<Product[]>([])

    const images = [BannerBurdeo1, BannerBurdeo2];
	// const productosTienda: Array<Product> = [
	// 	{
	// 		id: 1,
	// 		name: 'Burdeo Coffee',
	// 		price: 25000,
	// 		image: ProductImage,
	// 		description: 'Some',
	// 		category: 'Cafe',
	// 		link: '/producto/1'
	// 	},
	// 	{
	// 		id: 2,
	// 		name: 'Burdeo Coffee',
	// 		price: 25000,
	// 		image: ProductImage,
	// 		description: 'Some',
	// 		category: 'Cafe',
	// 		link: '/producto/2'
	// 	},
	// 	{
	// 		id: 3,
  	// 		name: 'Burdeo Coffee',
  	// 		price: 25000,
  	// 		image: ProductImage,
  	// 		description: 'Some',
  	// 		category: 'Cafe',
  	// 		discount: 50,
  	// 		new: true,
  	// 		link: '/some-link',
	//
	// 	},
	// 	{
	// 		id: 4,
	// 		name: 'Burdeo Coffee',
	// 		price: 25000,
	// 		image: ProductImage,
	// 		description: 'Some',
	// 		category: 'Cafe',
	// 		discount: 50,
  	// 		new: true,
  	// 		link: '/some-link',
	// 	},
	// 	{
	// 		id: 5,
	// 		name: 'Burdeo Coffee',
	// 		price: 25000,
	// 		image: ProductImage,
	// 		description: 'Some',
	// 		category: 'Cafe',
	// 		discount: 50,
  	// 		new: true,
  	// 		link: '/some-link',
	// 	},
	// 	{
	// 		id: 6,
	// 		name: 'Burdeo Coffee',
	// 		price: 25000,
	// 		image: ProductImage,
	// 		description: 'Some',
	// 		category: 'Cafe',
	// 		discount: 50,
  	// 		new: true,
  	// 		link: '/some-link',
	// 	},
	// 	{
	// 		id: 7,
	// 		name: 'Burdeo Coffee',
	// 		price: 25000,
	// 		image: ProductImage,
	// 		description: 'Some',
	// 		category: 'Cafe',
	// 		discount: 50,
  	// 		new: true,
  	// 		link: '/some-link',
	// 	},
	// 	{
	// 		id: 8,
	// 		name: 'Burdeo Coffee',
	// 		price: 25000,
	// 		image: ProductImage,
	// 		description: 'Some',
	// 		category: 'Cafe',
	// 		discount: 50,
  	// 		new: true,
  	// 		link: '/some-link',
	// 	},
	// ];

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
						</div>
						<div className='tiendaUser--filterContainer__filter__content'>
							{/* Aqui van los filtros */}
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