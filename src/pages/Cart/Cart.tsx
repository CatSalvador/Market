import styles from './Cart.module.css';
import {Button} from "../../components/shared/Button/Button.tsx";
import React, {useState} from "react";
import {ExtendedProductType, OrderItem} from "../../components/OrderItem/OrderItem.tsx";
import {useNavigate} from "react-router-dom";
import {AppRoute} from "../../constant/links.tsx";

export const Cart = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState<[ExtendedProductType]>(JSON.parse(localStorage.getItem('cart')) || [])
    const removeOrder = (id: string) => {
        const restOrders = orders.filter(order => order.uniqueId !== id)
        setOrders(restOrders)
    }

    const makeOrderHandler = () => navigate(AppRoute.ARRANGE_DELIVERY);
    const clearCart = () => {
        setOrders([])
        localStorage.removeItem('cart')
    }

    return (
        <div className={styles['cart-content']}>
            <div>
                <span className={styles['title']}>Корзина</span>
                <Button
                    name='Очистить корзину'
                    variant='text'
                    sx={{color: '#FF2D87', fontWeight: 'bold', padding: '0'}}
                    onClick={clearCart}
                />
            </div>
            <div className={styles['cart']}>
                <div className={styles['header']}>
                    <span className={styles['title']}>Xiaomi</span>
                    <div className={styles['total-cost']}>
                        <span>Стоимость корзины</span>
                        <span className={styles['cost']}>1 850 000р</span>
                    </div>
                    <Button
                        name='Оформить'
                        variant="contained"
                        sx={{padding: '10px 60px', backgroundColor: '#2967FF'}}
                        disabled={!orders.length}
                        onClick={makeOrderHandler}
                    />
                </div>
                <div>
                    {orders?.map((order: ExtendedProductType) =>
                        <OrderItem key={order.uniqueId} order={order} removeOrder={removeOrder}/>
                    )}
                </div>
            </div>
        </div>
    )
}
