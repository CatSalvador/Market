import styles from './App.module.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Catalog} from "./pages/Catalog/Catalog.tsx";
import {Cart} from "./pages/Cart/Cart.tsx";
import {Header} from "./components/Header/Header.tsx";
import {Footer} from "./components/Footer/Footer.tsx";
import {Banners} from "./components/Banners/Banners.tsx";
import {OrdersHistory} from "./pages/OrdersHistory/OrdersHistory.tsx";
import {ArrangeDelivery} from "./pages/ArrangeDelivery/ArrangeDelivery.tsx";
import {AppRoute} from "./constant/links.tsx";

function App() {
    return (
        <BrowserRouter>
            <div>
                <div className={styles['app-container']}>
                    <div className={styles['content-banner-container']}>
                        <div id='main-content' className={styles['main-content']}>
                            <Header/>
                            <Routes>
                                <Route path={AppRoute.CATALOG} element={<Catalog/>} exact/>
                                <Route path={AppRoute.CART} element={<Cart/>}/>
                                <Route path={AppRoute.ORDERS_HISTORY} element={<OrdersHistory/>}/>
                                <Route path={AppRoute.ARRANGE_DELIVERY} element={<ArrangeDelivery/>}/>
                            </Routes>
                        </div>
                        <Banners/>
                    </div>
                    <Footer/>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App;
