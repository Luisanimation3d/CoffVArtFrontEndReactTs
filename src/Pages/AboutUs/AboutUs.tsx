import BannerBurdeo1 from '../../assets/nosotros1.jpg';
import BannerBurdeo2 from '../../assets/nosotros2.jpg';

import coffeeGif from '../../assets/descargar.gif';
import { SliderBanner } from '../../components/SliderBanner/SliderBanner.tsx';
import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutUs.css';
import { useEffect, useRef, useState } from 'react';
import { SectionBanner } from '../../components/SectionBanner/SectionBanner.tsx';
import { API_KEY, API_URL } from '../../constantes.ts';
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
export const AboutUs = () => {
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
		get(`products?apikey=${API_KEY}&limit=4`);
	}, []);

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
							images={[BannerBurdeo1, BannerBurdeo2]}
							autoPlayInterval={2500}
						/>
					</div>
					<div className='contentAbout'>
						<section className='rowAbout'>
							{/* <img src={AboutRowImageOne} alt="" /> */}
							<div className='rowAbout__text'>
								<h2>Nosotros?</h2>
								<p className='rowAbout__paragraph'>
									Burdeo Coffee es una empresa familiar joven y enérgica
									dedicada a la producción y venta de café en grano alta
									calidad. Nos esforzamos por ofrecer a nuestros clientes la
									mejor calidad y sabor en cada taza de café preparada en casa.
									Para lograrlo buscamos los mejores granos de café de las más
									exclusivas de América Latina y los procesamos con esmero para
									obtener obtener un sabor único y delicioso. Además de nuestro
									café café en grano, también ofrecemos una amplia variedad de
									tés y otros para satisfacer todas las necesidades y gustos de
									nuestros clientes. En Estamos orgullosos de ofrecer un
									producto excepcional y esperamos compartir nuestra pasión por
									el café. Traducción realizada con la versión gratuita del
									traductor DeepL.com
								</p>
							</div>
						</section>
						<section className='rowAbout'>
							<p className='rowAbout__paragraph right'>
								En Burdeo Coffee, nos dedicamos a proporcionar a nuestros
								clientes una experiencia cafetera de la mayor calidad posible.
								Desde el abastecimiento de nuestros granos hasta el proceso de
								tostado y envasado, prestamos prestamos atención a cada detalle
								para garantizar que nuestro café puede ser. Nos esforzamos
								constantemente por mejorar e innovar, y y siempre buscamos
								nuevos y excitantes sabores que añadir a nuestra a nuestra línea
								de productos. Tanto si es un experto en café como si simplemente
								café para empezar el día, tenemos algo para todos los gustos.
								para todos los gustos. Gracias por elegir Burdeo Coffee.
								Traducción realizada con la versión gratuita del traductor
								DeepL.com
							</p>
						</section>
            
						<section className='rowAbout'>
							<p className='rowAbout__paragraph left'>
								Nuestra empresa familiar ha estado comprometida con la
								excelencia desde nuestros nuestros inicios. Nos esforzamos por
								ofrecer a nuestros clientes los mejores granos de café de las
								plantaciones de café más exclusivas de América Latina y
								procesarlos cuidadosamente para obtener un sabor único y
								delicioso. Nuestros granos de café son perfectos para quienes
								disfrutan de la experiencia de preparar su propio café en casa y
								buscan un producto un producto de alta calidad. Además de
								nuestro café en grano, también ofrecemos una amplia variedad de
								tés y otros productos de café para satisfacer todas las
								necesidades y gustos de nuestros clientes. Estamos orgullosos de
								ofrecer un un producto excepcional y esperamos poder compartir
								nuestra pasión por el café con usted. Traducción realizada con
								la versión gratuita del traductor DeepL.com
							</p>
							{/* <img src={AboutRowImageTwo} alt="" /> */}
						</section>
					</div>
					<div className='sectionbannerone'>
						<SectionBanner img='https://images.unsplash.com/photo-1459755486867-b55449bb39ff?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
					</div>
				</div>
			)}
		</div>
	);
};

export default AboutUs;
