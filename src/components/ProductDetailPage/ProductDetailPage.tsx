import {useParams} from "react-router-dom";

export const ProductDetailPage = () => {
    const {id} = useParams();
    return <h1>{id}</h1>
}

export default ProductDetailPage;