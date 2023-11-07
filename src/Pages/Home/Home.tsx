import BannerBurdeo1 from '../../assets/BannerBurdeo1.png';
import BannerBurdeo2 from '../../assets/BannerBurdeo2.png';
import ProductImage from '../../assets/product.jpg';
import {SliderBanner} from "../../components/SliderBanner/SliderBanner.tsx";

import './Home.css';
import {ProductCard} from "../../components/ProductCart/ProductCard.tsx";

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
                    {productosHome?.map((product) => {
                        return <ProductCard product={product}/>;
                    })}
                </div>
            </div>
        </div>
    )
}