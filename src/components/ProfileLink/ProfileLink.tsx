import {Link} from "react-router-dom";
import avatar from '../../assets/images/avatar.png';
import styles from './ProfileLink.module.css';
import {AppRoute} from "../../constant/links.tsx";

export const ProfileLink = () => (
    <Link to={AppRoute.ORDERS_HISTORY}>
        <img src={avatar} alt="User Avatar" className={styles['avatar']}/>
    </Link>
)
