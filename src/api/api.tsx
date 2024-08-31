import axios from 'axios';

const INIT_URL = 'https://test2.sionic.ru/api'

export const getCategories = async () => {
    try {
        const response = await axios({
            method: 'get',
            url: `${INIT_URL}/Categories`
        });

        return response.data;
    } catch (error) {
        return [];
    }
};

interface ProductQueryParams {
    range?: number[],
    category_id?: number | null,
    sort?: string
    filterByIds?: number[]
}

export const getProducts = async ({range, category_id, sort, filterByIds}: ProductQueryParams) => {
    const params: { range: string, filter: string, sort: string } = {}
    if (range) params.range = JSON.stringify(range)
    if (category_id) params.filter = JSON.stringify({category_id})
    if (sort) params.sort = sort
    if (filterByIds) params.filter = JSON.stringify({id: filterByIds})

    try {
        const response = await axios({
            method: 'get',
            url: `${INIT_URL}/Products`,
            params,
        });

        return response.data;
    } catch (error) {
        return [];
    }
}


export const getProductImages = async (product_id) => {
    try {
        const response = await axios({
            method: 'get',
            url: `${INIT_URL}/ProductImages`,
            params: {filter: JSON.stringify({product_id})}
        });

        return response.data;
    } catch (error) {
        return [];
    }
}

interface ProductVariationsQueryParams {
    filterByIds?: number[]
    sort?: string
    range?: number[],
}

export const getProductVariations = async ({filterByIds, range, sort}: ProductVariationsQueryParams) => {
    const params: { filter: string, sort: string, range: string } = {}
    if (filterByIds) params.filter = JSON.stringify({product_id: filterByIds})
    if (range) params.range = JSON.stringify(range)
    if (sort) params.sort = sort
    try {
        const response = await axios({
            method: 'get',
            url: `${INIT_URL}/ProductVariations`,
            params
        });

        return response.data;
    } catch (error) {
        return [];
    }
}

export const getProductVariationProperties = async (id: number) => {
    try {
        const response = await axios({
            method: 'get',
            url: `${INIT_URL}/ProductVariationProperties`,
            params: {filter: JSON.stringify({id})}
        });

        return response.data;
    } catch (error) {
        return [];
    }
}

export const getProductVariationPropertyListValues = async () => {
    try {
        const response = await axios({
            method: 'get',
            url: `${INIT_URL}/ProductVariationPropertyListValues`,
        });

        return response.data;
    } catch (error) {
        return [];
    }
}
