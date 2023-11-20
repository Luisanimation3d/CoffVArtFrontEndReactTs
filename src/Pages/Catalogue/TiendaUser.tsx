import BannerBurdeo1 from '../../assets/BannerBurdeo1.png';
import BannerBurdeo2 from '../../assets/BannerBurdeo2.png';
import ProductImage from '../../assets/product.jpg';
import {SliderBanner} from "../../components/SliderBanner/SliderBanner.tsx";
import { Product, ProductCard } from '../../components/ProductCard/ProductCard.tsx';
import './TiendaUser.css 	';

export const TiendaUser = () => {
    const images = [BannerBurdeo1, BannerBurdeo2];
	const productosTienda: Array<Product> = [
		{
			id: 1,
			name: 'Burdeo Coffee',
			price: 25000,
			image: ProductImage,
			description: 'Some',
			category: 'Cafe',
		},
		{
			id: 2,
			name: 'Burdeo Coffee',
			price: 25000,
			image: ProductImage,
			description: 'Some',
			category: 'Cafe',
		},
		{
			id: 3,
			name: 'Burdeo Coffee',
			price: 25000,
			image: ProductImage,
			description: 'Some',
			category: 'Cafe',
			discount: 50,
			new: true,
		},
		{
			id: 4,
			name: 'Burdeo Coffee',
			price: 25000,
			image: ProductImage,
			description: 'Some',
			category: 'Cafe',
		},
		{
			id: 5,
			name: 'Burdeo Coffee',
			price: 25000,
			image: ProductImage,
			description: 'Some',
			category: 'Cafe',
		},
		{
			id: 6,
			name: 'Burdeo Coffee',
			price: 25000,
			image: ProductImage,
			description: 'Some',
			category: 'Cafe',
		},
		{
			id: 7,
			name: 'Burdeo Coffee',
			price: 25000,
			image: ProductImage,
			description: 'Some',
			category: 'Cafe',
		},
		{
			id: 8,
			name: 'Burdeo Coffee',
			price: 25000,
			image: ProductImage,
			description: 'Some',
			category: 'Cafe',
		},
	];

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
						{productosTienda.map((producto) => {
							return <ProductCard key={producto.id} product={producto} />;
						})}
					</div>
				</div>
			</div>
            </div>
		</div>
	);
};