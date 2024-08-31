import {ProductCard, ProductType} from "../shared/ProductCard/ProductCard.tsx";
import styles from './ProductsList.module.css';
import React from "react";
import {ImageFields} from "../../redux/schemes/images-shema.tsx";
import {Button} from "../shared/Button/Button.tsx";

interface ProductsListProp {
    products: [ProductType & { images: ImageFields }]
}

export const ProductsList: React.FC<ProductsListProp> = ({products}) => {
    return (
        <div className={styles['products-wrapper']}>
            <div className={styles['products']}>
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        image={product.images?.[0]?.image_url}
                        variations={product.variations}
                    />
                ))}
            </div>
            <Button
                name='Показать больше товаров'
                sx={{
                    width: '350px',
                    marginTop: '20px',
                    backgroundColor: '#F0F4FB',
                    borderColor: '#F0F4FB',
                    color: '#727280'
                }}
            />
        </div>
    )
}