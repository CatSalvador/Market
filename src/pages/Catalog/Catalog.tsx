import {Categories} from "../../components/Categories/Categories.tsx";
import {ProductsList} from "../../components/ProductsList/ProductsList.tsx";
import {useEffect, useState} from "react";
import {getCategories, getProductImages, getProducts, getProductVariations} from "../../api/api.tsx";
import {useDispatch} from "react-redux";
import {addCategories, addImages, addProducts, addProductVariations, resetProducts} from "../../redux/actions.tsx";
import useModelData from "../../hooks/useModelDate.tsx";
import orm from "../../orm.tsx";
import store from "../../store.tsx";
import {ProductType} from "../../components/shared/ProductCard/ProductCard.tsx";
import {ImageFields} from "../../redux/schemes/images-shema.tsx";
import styles from './Catalog.module.css';
import {SortTypes} from "../../constant/sortTypes.tsx";
import {sortProductsByPrice, transformProductData} from "../../helpers/productHelpers.tsx";

const MAX_PORTION = 20
const MAX_RECORDS_COUNT = 50
const DEFAULT_FOOTER_HEIGHT = 250

export const Catalog = () => {
    const dispatch = useDispatch();
    const [activeCategory, setActiveCategory] = useState<number | null>(null)
    const categories = useModelData('Category');
    const [hasMore, setHasMore] = useState(true);
    const [products, setProducts] = useState<[ProductType & { images: ImageFields }]>([])
    const [isLoading, setIsLoading] = useState(true);
    const [sort, setSort] = useState<string>('')

    useEffect(() => {
        fetchCategoriesData()
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading, hasMore]);

    useEffect(() => {
        if (isLoading || activeCategory) manageProductFetching()
    }, [isLoading, activeCategory]);

    useEffect(() => {
        if (sort) {
            dispatch(resetProducts())
            setProducts([])
            fetchSortProductsByNameOrPrice([0, MAX_PORTION])

        }
    }, [sort]);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >=
            document.documentElement.scrollHeight - DEFAULT_FOOTER_HEIGHT) {
            if (hasMore && !isLoading) setIsLoading(true);
        }
    };

    const fetchSortProductsByName = (range: number[]) => {
        fetchProducts(range)
        setHasMore(true)
    }

    const fetchSortProductsByPrice = async (range: number[]) => {
        const variations = await getProductVariations({range, sort})

        const variationIds = [...new Set(variations?.map(variation => variation.product_id))];
        const product = await getProducts({filterByIds: variationIds, category_id: activeCategory})
        const productIds = product.map(el => el.id)
        const images = await getProductImagesByIds(productIds)
        addProductData(images, product, variations)

        setIsLoading(false)
        if (variations.length < MAX_PORTION) setHasMore(false)
    }

    const addProductData = (images, product, variations) => {
        dispatch(addImages(images));
        dispatch(addProducts(product));
        dispatch(addProductVariations(variations));
    };

    const fetchSortProductsByPriceHandler = async (range: number[]) => {
        fetchSortProductsByPrice(range).then(() => {
            const state = store.getState()
            const session = orm.session(state.orm);
            const products = transformProductData(session['Product'].all().toModelArray())
            const sortedProducts = sortProductsByPrice(products, sort)
            setProducts(sortedProducts)
        })
    }

    const manageProductFetching = () => {
        const state = store.getState()
        const session = orm.session(state.orm);
        const {Category} = session;
        const productsLength: number = session['Product'].all().toModelArray().map(product => product.ref).length

        if (sort) {
            fetchSortProductsByNameOrPrice([productsLength, productsLength + MAX_PORTION])
            return
        }

        if (!productsLength || (!activeCategory && hasMore)) {
            fetchProducts([productsLength, productsLength + MAX_PORTION])
            return
        }

        const category = Category.withId(activeCategory);
        if (!category) {
            setProducts([])
            return
        }

        const productByCategoryLength = category.products?.toModelArray().length;
        isLoading || productByCategoryLength < MAX_PORTION
            ? fetchAndDispatchProductData([productByCategoryLength, productByCategoryLength + MAX_PORTION]).then(() => getProductsByCategory())
            : getProductsByCategory()
    }

    const fetchProducts = (range: number[]) => {
        fetchAndDispatchProductData(range).then(() => {
            const state = store.getState()
            const session = orm.session(state.orm);
            const products = transformProductData(session['Product'].all().toModelArray())
            setProducts(products)
        })
    }

    const getProductsByCategory = () => {
        const state = store.getState()
        const session = orm.session(state.orm);
        const {Category} = session;
        const category = Category.withId(activeCategory);
        const products = transformProductData(category.products?.toModelArray())
        setProducts(products)
    }

    const setActiveCategoryHandler = (category: number) => {
        setActiveCategory(category)
        setHasMore(true)
        setSort('')
    }

    const fetchCategoriesData = async () => {
        const response = await getCategories()
        dispatch(addCategories(response));
    }

    const fetchAndDispatchProductData = async (range: Array<number>) => {

        const product = await getProducts({range, category_id: activeCategory, sort})

        if (product.length) {
            const arrIds = product.map(el => el.id)
            const images = await getProductImagesByIds(arrIds)
            const variations = await getProductVariations({filterByIds: arrIds})
            addProductData(images, product, variations)
        }

        setIsLoading(false)
        if (product.length < MAX_PORTION) setHasMore(false)
    }

    const fetchSortProductsByNameOrPrice = (range: number[]) => {
        [SortTypes.NAME_ACS, SortTypes.NAME_DESC].includes(sort)
            ? fetchSortProductsByName(range)
            : fetchSortProductsByPriceHandler(range)
    }

    const getProductImagesByIds = async (arrIds: [number]) => {
        const result = []
        const images = await getProductImages(arrIds)
        result.push(...images)
        if (images.length === MAX_RECORDS_COUNT) {
            const restIds = arrIds.filter(id => id > images[images.length - 1].product_id)
            const response3 = await getProductImagesByIds(restIds)
            result.push(...response3)
        }
        return result
    }

    return (
        <div className={styles[categories]}>
            <Categories
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategoryHandler}
                sort={sort}
                setSort={setSort}
            />
            <ProductsList products={products}/>
        </div>
    )
}