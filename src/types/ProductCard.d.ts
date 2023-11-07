export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
    discount?: number;
    new?: boolean;
}

export interface MiniCartProductCardInfoProps {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
    discount?: number;
    new?: boolean;
    quantity: number;
}

export interface ProductCardProps {
    product: Product;
}

interface MiniCartProductCardProps {
    product: MiniCartProductCardInfoProps;
}