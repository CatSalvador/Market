import styles from './Header.module.css';
import {LocationMark} from "../shared/LocationMark/LocationMark.tsx";
import {SearchInput} from "../shared/SearchInput/SearchInput.tsx";
import {CartLink} from "../CartLink/CartLink.tsx";
import {ProfileLink} from "../ProfileLink/ProfileLink.tsx";
import {Link} from "react-router-dom";
import {AppRoute} from "../../constant/links.tsx";

export const Header = () => (
    <div className={styles['header']}>
        <Link to={AppRoute.CATALOG} className={styles['title']}>React</Link>
        <LocationMark/>
        <SearchInput
            onSearch={() => {}}
            placeholder='Поиск бренда, товара, категории...'
        />
        <div className={styles['manage']}>
            <CartLink/>
            <ProfileLink/>
        </div>
    </div>
)
