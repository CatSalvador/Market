import styles from './LocationMark.module.css';
import {Pin} from "../../../assets/icons/Pin.tsx";

const initialLocation = 'Александровск-Сахалинский'

export const LocationMark = () => {
    return (
        <div className={styles['location-mark']}>
            <Pin/>
            <span className={styles['location-name']}>{initialLocation}</span>
        </div>
    )
}