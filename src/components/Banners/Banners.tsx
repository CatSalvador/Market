import styles from './Banners.module.css';
import {Button} from "../shared/Button/Button.tsx";
import image from '../../assets/images/Frame.png';

export const Banners = () => (
    <div className={styles['banners']}>
        <div className={styles['banner']}>
            <img src={image} alt="bannner" className={styles['img']}/>
            <h2 className={styles['title']}>Получай товары</h2>
            <Button name='Узнать больше' variant="contained"/>
        </div>
    </div>
)