import {HashRouter, Routes, Route} from "react-router-dom";
import {AdminLayout} from "./Layout/AdminLayout/AdminLayout.tsx";
import {Roles} from "./Pages/Roles/Roles";
import {Supplys} from "./Pages/Supplies/Supplies.tsx";
import { Products } from "./Pages/Products/Products.tsx";
import { Coustomers } from "./Pages/Coustomers/CoustomersList.tsx";
import { Sales } from "./Pages/Sales/SalesList.tsx";
import {UserLayout} from "./Layout/UserLayout/UserLayout.tsx";
import {Companys} from "./Pages/Companys/Companys.tsx";
import {Suppliers} from "./Pages/Suppliers/Suppliers.tsx";
import {ProductionOrders} from "./Pages/ProductionOrders/ProductionOrders.tsx";
import {Home} from "./Pages/Home/Home.tsx";
import { Orders } from "./Pages/Orders/OrdersList.tsx";

export default function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path={'/admin/'} element={<AdminLayout/>}>
                    <Route path={'*'} element={<div>error</div>}/>
                    <Route path={'dashboard'} element={<div>Dashboard</div>}/>
                    <Route path={'Roles'} element={<Roles/>}/>
                    <Route path={'Supplys'} element={<Supplys/>}/>
                    <Route path={'Products'} element={<Products/>}/>
                    <Route path={'Companys'} element={<Companys/>}/>
                    <Route path={'Suppliers'} element={<Suppliers/>}/>
                    <Route path={'ProductionOrders'} element={<ProductionOrders/>}/>
                    <Route path={'Coustomers'} element={<Coustomers/>}/>
                    <Route path={'Sales'} element={<Sales/>}/>
                    <Route path={'Orders'} element={<Orders/>}/>
                </Route>
                <Route path={'*'} element={<div>error</div>}/>
                <Route path={'/'} element={<UserLayout/>}>
                    <Route path={'home'} element={<Home/>   }/>
                    <Route path={'*'} element={<div>error</div>}/>
                </Route>
            </Routes>
        </HashRouter>
    )
}
