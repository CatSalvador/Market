import styles from './OrderItem.module.css';
import {QuantitySelector} from "../shared/QuantitySelector/QuantitySelector.tsx";
import {IconButton} from "@mui/material";
import {Trash} from "../../assets/icons/Trash.tsx";
import React from "react";
import {ProductType} from "../shared/ProductCard/ProductCard.tsx";

export type ExtendedProductType = Partial<ProductType> & {
    property?: string;
    uniqueId?: string;
    total?: number;
};

export interface OrderItemProps extends ExtendedProductType {
    removeOrder: (id: string) => void
}

export const OrderItem: React.FC<OrderItemProps> = ({order, removeOrder}) => {
    const {image, name, uniqueId, property, total, variations} = order

    return (
        <div className={styles['order-item']}>
            <img src={image} alt="Order Image" className={styles['image']}/>
            <div className={styles['description']}>
                <span>{`${name} ${property ? `, ${property}` : ''}`}</span>
                <div className={styles['stock']}>{variations[0].stock} шт.</div>
            </div>
            <div className={styles['wrapper']}>
                <QuantitySelector uniqueId={uniqueId} total={total}/>
                <span className={styles['price']}>от {variations[0].price} Р</span>
                <IconButton
                    onClick={() => removeOrder(uniqueId)}
                    aria-label="delete"
                    disableRipple
                    sx={{justifySelf: 'end'}}>
                    <Trash/>
                </IconButton>
            </div>
        </div>
    )
}