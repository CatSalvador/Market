import styles from './ArrangeDelivery.module.css';
import React from "react";
import {DeliveryForm} from "../../components/DeliveryForm/DeliveryForm.tsx";

export const ArrangeDelivery = () => {
    return (
        <div className={styles['arrange-delivery']}>
            <div>
                <span className={styles['title']}>Доставка</span>
            </div>
            <div className={styles['content']}>
                <DeliveryForm/>
            </div>
        </div>
    )
}