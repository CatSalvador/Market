import React from "react";
import styles from './OrderCard.module.css';
import orderImg from '../../assets/images/orderImage.png'
import {Arrow} from "../../assets/icons/Arrow.tsx";
import {FieldValuePair} from "../shared/FieldValuePair/FieldValuePair.tsx";
import {ClipboardButton} from "../shared/ClipboardButton/ClipboardButton.tsx";

interface OrderCardProps {
    id: number,
    status: string,
    numberOrder: string,
    total: number,
    price: string,
    date: string,
    address: string
}

export const OrderCard: React.FC<OrderCardProps> = (props) => {
    const { status, numberOrder, total, price, date, address} = props

    return (
        <div className={styles['order-container']}>
            <div className={styles['header']}>
                <div className={styles['info']}>
                    <img src={orderImg} alt="Order Image"/>
                    <div className={styles['title']}>
                        <span className={styles['name']}>Xiaomi</span>
                        <span className={styles['date']}>{date}</span>
                    </div>
                    <span className={styles['details']}>Подробнее</span>
                </div>
                <Arrow/>
            </div>
            <div className={styles['description']}>
                <FieldValuePair name="Статус заказа" value={status}/>
                <FieldValuePair name="Номер заказа" value={<ClipboardButton value={numberOrder}/>}/>
                <FieldValuePair name="Кол-во товаров" value={`${total} шт`}/>
                <FieldValuePair name="Стоимость заказа" value={price}/>
                <FieldValuePair name="Адрес доставки" value={address}/>
            </div>
        </div>
    )
}