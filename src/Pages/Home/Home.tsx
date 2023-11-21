import BannerBurdeo1 from '../../assets/BannerBurdeo1.png';
import BannerBurdeo2 from '../../assets/BannerBurdeo2.png';
import ProductImage from '../../assets/product.jpg';
import {SliderBanner} from "../../components/SliderBanner/SliderBanner.tsx";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './Home.css';
import {ProductCard} from "../../components/ProductCard/ProductCard.tsx";

gsap.registerPlugin(ScrollTrigger);
const boxDOMEL= document.createElement("div");
boxDOMEL.classList.add("box");
const contenedor = document.querySelector(".userLayout__mainContent");

contenedor?.appendChild(boxDOMEL);

gsap.to(boxDOMEL,{
    background:"#ffcc00",
    rotate:180,
    duration:3,
    delay: 1,
    //opacity:0,
    xPercent:"+=100"
})
export const Home = () => {
    const images = [BannerBurdeo1, BannerBurdeo2];
    const productosHome = [
        {
            id: 1,
            name: "Burdeo Coffee",
            price: 25000,
            image: ProductImage,
            description: "Some",
            category: "Cafe",
        },
        {
            id: 2,
            name: "Burdeo Coffee",
            price: 25000,
            image: ProductImage,
            description: "Some",
            category: "Cafe",
        },
        {
            id: 3,
            name: "Burdeo Coffee",
            price: 25000,
            image: ProductImage,
            description: "Some",
            category: "Cafe",
            discount: 50,
            new: true
        },
        {
            id: 4,
            name: "Burdeo Coffee",
            price: 25000,
            image: ProductImage,
            description: "Some",
            category: "Cafe",
        },
    ];
    
    return (
        
        <div className="home__container">
            
            <div className="home__bannerContainer">
                <SliderBanner images={images} autoPlayInterval={2500}/>
            </div>
            <div className="home__productsContainer">
                
                <h2>Burdeo</h2>
                <div className="home__productsCards">
                    {productosHome?.map((product) => (<ProductCard key={product.id} product={product}/>
                    ))}
                </div>
            </div>
        </div>
    )
}