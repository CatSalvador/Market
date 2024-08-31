export const ADD_PRODUCTS = 'ADD_PRODUCTS';
export const ADD_CATEGORIES = 'ADD_CATEGORIES';
export const ADD_IMAGES = 'ADD_IMAGES';
export const ADD_PRODUCT_VARIATIONS = 'ADD_PRODUCT_VARIATIONS';
export const RESET_PRODUCTS = 'RESET_PRODUCTS';
export const addProducts = (products) => ({
    type: ADD_PRODUCTS,
    payload: products,
});

export const addCategories = (categories) => ({
    type: ADD_CATEGORIES,
    payload: categories,
});

export const addImages = (images) => ({
    type: ADD_IMAGES,
    payload: images,
});

export const addProductVariations = (productVariations) => ({
    type: ADD_PRODUCT_VARIATIONS,
    payload: productVariations,
});

export const resetProducts = () => ({type: RESET_PRODUCTS});