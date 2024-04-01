import Burdeo6 from '../../assets/Burdeo6.jpg';
import Burdeo8 from '../../assets/Burdeo8.jpg';
import Burdeo11 from '../../assets/Burdeo11.jpg';
import Burdeo06 from '../../assets/Burdeo06.jpg';
import Burdeo21 from '../../assets/Burdeo21.jpg';
import Burdeo13 from '../../assets/Burdeo13.jpg';
import ProductImage2 from '../../assets/productBack.jpg';
import ProductImage from '../../assets/productFront.jpg';
import coffeeGif from '../../assets/descargar.gif';
import { SliderBanner } from '../../components/SliderBanner/SliderBanner.tsx';
import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Home.css';
import { ProductCard } from '../../components/ProductCard/ProductCard.tsx';
import { useEffect, useRef, useState } from 'react';
import { API_KEY, API_URL } from '../../utils/constantes.ts';
import { useFetch } from '../../hooks/useFetch.tsx';
import { Product } from '../../types/ProductCard';

// gsap.registerPlugin(ScrollTrigger);
// const boxDOMEL = document.createElement("div");
// boxDOMEL.classList.add("box");
// const contenedor = document.querySelector(".userLayout__mainContent");
//
// contenedor?.appendChild(boxDOMEL);
//
// gsap.to(boxDOMEL, {
//   background: "#ffcc00",
//   rotate: 180,
//   duration: 3,
//   delay: 1,
//   //opacity:0,
//   xPercent: "+=100"
// })
export const Home = () => {
	const { data, get } = useFetch(API_URL);
	const [products, setProducts] = useState<Product[]>([]);
	const cupRef = useRef(null);
	const homeContentRef = useRef(null);
	const [isCupAnimationComplete, setIsCupAnimationComplete] = useState(false);

	// const images = [BannerBurdeo1, BannerBurdeo2];
	// const productosHome = [
	//   {
	//     id: 1,
	//     name: "Burdeo Coffee",
	//     price: 25000,
	//     image: ProductImage,
	//     description: "Some",
	//     category: "Cafe",
	//   },
	//   {
	//     id: 2,
	//     name: "Burdeo Coffee",
	//     price: 25000,
	//     image: ProductImage,
	//     description: "Some",
	//     category: "Cafe",
	//   },
	//   {
	//     id: 3,
	//     name: "Burdeo Coffee",
	//     price: 25000,
	//     image: ProductImage,
	//     description: "Some",
	//     category: "Cafe",
	//     discount: 50,
	//     new: true
	//   },
	//   {
	//     id: 4,
	//     name: "Burdeo Coffee",
	//     price: 25000,
	//     image: ProductImage,
	//     description: "Some",
	//     category: "Cafe",
	//   },
	// ];
	useEffect(() => {
		const timeline = gsap.timeline({
			onComplete: () => {
				setIsCupAnimationComplete(true);
			},
		});

		gsap.set(cupRef.current, { opacity: 0, scale: 0 });

		timeline.to(cupRef.current, { opacity: 1, scale: 1, duration: 0 });
		timeline.to(cupRef.current, { opacity: 0, scale: 0, duration: 0 }, '+=0');

		timeline.play();
	}, []);

	useEffect(() => {
		if (isCupAnimationComplete) {
			gsap.to(homeContentRef.current, {
				opacity: 1,
				duration: 1,
				ease: 'power1.out',
			});
		}
	}, [isCupAnimationComplete]);

	useEffect(() => {
		get(`productsActive?apikey=${API_KEY}&limit=4`);
	}, []);

	useEffect(() => {
		if (data?.products) {
			console.log(data?.products?.rows);
			const productsArray: Product[] = data?.products?.rows.map(
				(product: any) => ({
					id: product.id,
				name: product.name,
				price: product.unitPrice,
				image: [ProductImage, ProductImage2],
				description: product.description,
				link: `/producto/${product.id}`,
				new: new Date(product.createdAt) > new Date(new Date().setDate(new Date().getDate() - 7)),
				stock: product.amount
				})
			);
			setProducts(productsArray);
		}
	}, [data]);

	return (
		<div className='home__container'>
			{!isCupAnimationComplete && (
				<div ref={cupRef} className='cup'>
					<img src={coffeeGif} alt='Coffe Cup' />
				</div>
			)}

			{isCupAnimationComplete && (
				<div
					ref={homeContentRef}
					className='home__content'
					style={{ opacity: 0 }}
				>
					<div className='home__bannerContainer'>
						<SliderBanner
							images={[Burdeo8, Burdeo6, Burdeo13]}
							autoPlayInterval={2500}
						/>
					</div>

					<div className='home__productsContainer'>
						<div className='title-container'>
							<h2>Burdeo Café de Origen</h2>
							<p>
								Desde nuestras fincas o las de los mejores productores del país.
							</p>
						</div>
					</div>
					<div className='sectionbanneroneHome'>
						<div className='wrapper'>
							<div className='card1 cardb'>
								<img src={Burdeo11} alt='' />
								<div className='info'>
									<h1>Origenes: El corazon de nuestro café</h1>
									<p></p>
									<a href='#/nosotros' className='btn'>
										Leer más
									</a>
								</div>
							</div>

							<div className='card2 cardb'>
								<img src={Burdeo06} alt='' />
								<div className='info'>
									<h1>Pergamino: Aromas Reveladores de Nuestra Tierra</h1>
									<p></p>
									<a href='#/nosotros' className='btn'>
										Leer más
									</a>
								</div>
							</div>

							<div className='card3 cardb'>
								<img src={Burdeo21} alt='' />
								<div className='info'>
									<h1>
										Guardianes de la Cosecha: Manos Que Tejen Historias en Cada
										Grano
									</h1>
									<p></p>
									<a href='#/nosotros' className='btn'>
										Leer más
									</a>
								</div>
							</div>
						</div>
					</div>
					<div className='home__productsContainer'>
						<div className='title-container'>
							<h2>Productos Burdeo</h2>
							<p>
								DESDE EL PERGAMINO HASTA TU BOLSA.
							</p>
              <div className="home__productsCards">
              {products?.map((producto) => (
                <ProductCard key={producto.id} product={producto} />
              ))}
            </div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
export default Home;
