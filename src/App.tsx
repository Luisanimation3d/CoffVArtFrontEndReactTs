import {HashRouter, Routes, Route} from "react-router-dom";
import {AdminLayout} from "./Layout/AdminLayout/AdminLayout.tsx";
import {Roles} from "./Pages/Roles/Roles..tsx";
import {UserLayout} from "./Layout/UserLayout/UserLayout.tsx";
import {Companys} from "./Pages/Companys/Companys.tsx";
import {Suppliers} from "./Pages/Suppliers/Suppliers.tsx";
import {ProductionOrders} from "./Pages/ProductionOrders/ProductionOrders.tsx";

export default function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path={'/admin/'} element={<AdminLayout/>}>
                    <Route path={'*'} element={<div>error</div>}/>
                    <Route path={'dashboard'} element={<div>Dashboard</div>}/>
                    <Route path={'Roles'} element={<Roles/>}/>
                    <Route path={'Companys'} element={<Companys/>}/>
                    <Route path={'Suppliers'} element={<Suppliers/>}/>
                    <Route path={'ProductionOrders'} element={<ProductionOrders/>}/>
                </Route>
                <Route path={'*'} element={<div>error</div>}/>
                <Route path={'/'} element={<UserLayout/>}/>
            </Routes>
        </HashRouter>
    )
}
