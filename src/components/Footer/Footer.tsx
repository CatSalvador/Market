import styles from './Foter.module.css';
import {Facebook} from "../../assets/icons/Facebook.tsx";
import {Vk} from "../../assets/icons/Vk.tsx";
import {Instagram} from "../../assets/icons/Instagram.tsx";
import {GooglePlay} from "../../assets/icons/GooglePlay.tsx";
import {AppStore} from "../../assets/icons/AppStore.tsx";

export const Footer = () => (
    <div id='footer' className={styles['footer']}>
        <div className={styles['services']}>
            <h1 className={styles['title']}>React</h1>
            <div className={styles['social-media']}>
                <span style={{gridColumn: 'span 3'}}>Присоединяйтесь к нам</span>
                <Facebook/>
                <Vk/>
                <Instagram/>
            </div>
            <div className={styles['stores']}>
                <span style={{gridColumn: 'span 2'}}>Устанавливайте приложения</span>
                <GooglePlay/>
                <AppStore/>
            </div>
        </div>
        <div className={styles['links']}>
            <span>© Sionic</span>
            <span>Правовая информация</span>
            <span>Политика конфиденциальности</span>
        </div>
    </div>
)