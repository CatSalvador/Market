import styles from './OrdersHistory.module.css';
import {OrderCard} from "../../components/OrderCard/OrderCard.tsx";

export const OrdersHistory = () => {
    const orders = JSON.parse(localStorage.getItem('orders')) || []

    return (
        <div className={styles['order-history']}>
            <span className={styles['title']}>История заказов</span>
            <div className={styles['orders-wrapper']}>
                {orders.map((order) => (
                    <OrderCard
                        key={order.id}
                        id={order.id}
                        numberOrder='#444-333'
                        status='Оплачен/Завершен'
                        date={order.date}
                        total={order.total}
                        price={order.sum}
                        address={order.address}
                    />
                ))}
            </div>
        </div>
    )
}
