import styles from './CartLink.module.css';
import {Link} from "react-router-dom";
import {Cart} from "../../assets/icons/Cart.tsx";
import {AppRoute} from "../../constant/links.tsx";

const initValue = '10+'

export const CartLink = () => (
    <Link to={AppRoute.CART}>
        <div className={styles['cart-link']}>
            <Cart/>
            <div className={styles['counter']}>{initValue}</div>
        </div>
    </Link>
)
