import React, {useState} from "react";
import {Button} from "../Button/Button.tsx";
import styles from './ProductCard.module.css';
import {getProductVariationProperties, getProductVariationPropertyListValues} from "../../../api/api.tsx";
import {ProductVariationsFields} from "../../../redux/schemes/product-variations-schema.tsx";
import {PropertyModel} from "../../PropertyModel/PropertyModel.tsx";

export interface ProductType {
    id: number
    name: string
    category_id: number
    description: string
    variations: ProductVariationsFields
    image: string
}

export interface ProductVariationPropertiesFields {
    id: number
    name: string
    type: number
}

export interface VariationsPropertyListValuesFields {
    id: number
    product_variation_property_id: number
    value: string
}

export const ProductCard: React.FC<Partial<ProductType>> = ({id, name, variations, image}) => {
    const [variationsProperty, setVariationsProperty] = useState<[ProductVariationPropertiesFields]>([]);
    const [variationsPropertyListValues, setVariationsPropertyListValues] = useState<[VariationsPropertyListValuesFields]>([]);
    const [open, setOpen] = React.useState(false);

    const addProductToCart = (selectedVariation) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const product: Partial<ProductType & { property?: string, uniqueId: string, total: number }> = {
            id,
            name,
            variations,
            image
        }
        if (selectedVariation) product.property = variationsPropertyListValues.find(value => value.id === selectedVariation).value

        let uniqueId = selectedVariation ? `${id}_${product.property}` : `${id}`;
        let existingProduct = cart.find(item => item.uniqueId === uniqueId);

        if (existingProduct) {
            existingProduct.total += 1;
        } else {
            product.uniqueId = uniqueId;
            product.total = 1;
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
    }

    const getProductVariationPropertiesHandler = (variations) => {
        const ids = variations.map(variation => variation.id)
        getProductVariationProperties(ids).then((res) => {
            setOpen(true)
            setVariationsProperty(res)
            getProductVariationPropertyListValues().then((res) => setVariationsPropertyListValues(res))
        })
    }

    return (
        <div className={styles['product-card']}>
            <PropertyModel
                open={open}
                setOpen={setOpen}
                variationsProperty={variationsProperty}
                variationsPropertyListValues={variationsPropertyListValues}
                getProductVariationPropertiesHandler={getProductVariationPropertiesHandler}
                variations={variations}
                addProductToCart={addProductToCart}
            />
            <img src={image} alt="Product Image" className={styles['image']}/>
            <span className={styles['name']}>{name}</span>
            <span className={styles['price']}>от {variations && variations[0].price}p</span>
            <div className={styles['discount']}>
                <span>{variations && variations[0]?.price}p </span><span>-0%</span>
            </div>
            <Button
                name='Добавить в корзину'
                variant="outlined"
                sx={{padding: '6px 0', color: '#447aff', border: '1px solid #2967FF'}}
                onClick={() => getProductVariationPropertiesHandler(variations)}
            />
        </div>
    )
}