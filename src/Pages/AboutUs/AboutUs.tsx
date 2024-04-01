import BannerBurdeo1 from '../../assets/nosotros1.jpg';
import Burdeo20 from '../../assets/Burdeo20.jpg'
import Burdeo14 from '../../assets/Burdeo14.jpg'
import Burdeo17 from '../../assets/Burdeo17.jpg'
import Burdeo19 from '../../assets/Burdeo19.jpg'






import coffeeGif from '../../assets/descargar.gif';
import { SliderBanner } from '../../components/SliderBanner/SliderBanner.tsx';
import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutUs.css';
import { useEffect, useRef, useState } from 'react';
import {API_KEY, API_URL} from "../../utils/constantes.ts";
import {useFetch} from "../../hooks/useFetch.tsx";

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
	const { get } = useFetch(API_URL);
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
							images={[BannerBurdeo1, Burdeo19]}
							autoPlayInterval={2500}
						/>
					</div>
					<section className='hero'>
  					<div className='heading'>
  					</div>
  					<div className='container'>
    				<div className='hero-container'>
      					<h2>Origenes: El corazon de nuestro café</h2>
      					<p>Sumérgete en la esencia de nuestra pasión por el café a través de las imágenes que capturan la belleza de nuestras fincas. Desde las majestuosas montañas hasta los tranquilos valles, cada foto es un testimonio de nuestro arraigado compromiso con la calidad y la tradición. Bienvenidos a un viaje visual que revela el cuidado y la dedicación meticulosa detrás de cada taza, donde cada detalle refleja nuestro amor por el café y el respeto por la tierra que lo cultiva. Adéntrate en este universo sensorial que celebra la naturaleza, el sabor y la autenticidad.</p>
    				</div>
    				<div className='hero-image'>
      				<img src={Burdeo14} id='image1' alt='Coffe Cup' />
    				</div>
  					</div>
				</section>
				<section className='hero'>
  				<div className='heading'>
  				</div>
  				<div className='container'>
    			<div className='hero-image'>
      				<img src={Burdeo17} id='image2' alt='Coffe Cup' />
    			</div>
    			<div className='hero-container'>
     			 <h2>Guardianes de la Cosecha: Manos Que Tejen Historias en Cada Grano</h2>
      				<p>En nuestras fincas, los recolectores de café son los auténticos protagonistas. Con manos laboriosas y dedicadas, no solo cosechan granos, sino que entretejen historias que se fusionan con nuestra marca. El compromiso diario de estos guardianes de la cosecha va más allá de la recolección; es un acto de pasión y tradición que da vida a cada grano. Cada taza que disfrutas es un tributo a estas manos que, con cada movimiento, tejen historias en cada sorbo, transmitiendo el alma y el cuidado que dedicamos a nuestro café.</p>
    			</div>
  				</div>
			</section>
			<section className='hero'>
  			<div className='heading'>
  			</div>
  			<div className='container'>
    		<div className='hero-container'>
      			<h2>Pergamino: Aromas Reveladores de Nuestra Tierra</h2>
      			<p>Déjate llevar por los evocadores aromas de nuestro café, Pergamino. Cada taza es un viaje a través de los paisajes más preciados de nuestras fincas, desde las altas montañas hasta los valles serenos. Descubre el sabor único de la tierra en cada sorbo, una expresión de nuestro compromiso con la excelencia y la pasión por el café. Bienvenidos a una experiencia donde los aromas revelan la verdadera esencia de nuestra tierra. Disfruta de cada momento como un tributo a la naturaleza y al café que nos une.</p>
    		</div>
    		<div className='hero-image'>
      		<img src={Burdeo20} id='image3' alt='Coffe Cup' />
    		</div>
  			</div>
		</section>
</div>
	)}
</div>

	);
};

export default AboutUs;
