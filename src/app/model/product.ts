export interface Product {
    id: number,
    title: string,
    price: number,
    category: string,
    description: string,
    image: string,
    rating: Rating,
    quantity?: number
}

export interface Rating {
    rate: number,
    count: number
}

export interface ProductCart {
    // userId: number,
    // date: string,
    products: ProductCartDetails[]
}

export interface ProductCartDetails {
    productId: number,
    quantity: number
}

export interface CartListProduct {
    product: Product,
    quantity: number
}