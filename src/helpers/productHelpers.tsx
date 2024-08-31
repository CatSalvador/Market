import {SortTypes} from "../constant/sortTypes.tsx";

export const sortProductsByPrice = (products, order = SortTypes.PRICE_ASC) => {
    return products.sort((a, b) => {
        const priceA = a.variations?.[0]?.price || 0;
        const priceB = b.variations?.[0]?.price || 0;

        return order === SortTypes.PRICE_ASC ? priceA - priceB : priceB - priceA;
    });
};

export  const transformProductData = (products) => {
    return products?.map(product => ({
        ...product.ref,
        images: product.images.map(image => image),
        variations: product.variations.map(variation => variation),
    }));
};