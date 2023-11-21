import {HashRouter, Routes, Route} from "react-router-dom";
import {AdminLayout} from "./Layout/AdminLayout/AdminLayout.tsx";
import {Roles} from "./Pages/Roles/Roles";
import {Supplies} from "./Pages/Supplies/SuppliesList.tsx";
import {Products} from "./Pages/Products/ProductsList.tsx";
import {Coustomers} from "./Pages/Coustomers/CoustomersList.tsx";
import {CustomersCreate} from "./Pages/Coustomers/CoustomersCreate.tsx";
import {Sales} from "./Pages/Sales/SalesList.tsx";
import {UserLayout} from "./Layout/UserLayout/UserLayout.tsx";
import {Companys} from "./Pages/Companys/Companys.tsx";
import {Suppliers} from "./Pages/Suppliers/Suppliers.tsx";
import {ProductionOrders} from "./Pages/ProductionOrders/ProductionOrders.tsx";
import {Home} from "./Pages/Home/Home.tsx";
import {TiendaUser} from "./Pages/Catalogue/TiendaUser.tsx";
import {Orders} from "./Pages/Orders/OrdersList.tsx";
import {RolesCreate} from "./Pages/Roles/RolesCreate.tsx";
import { ProductionRequest } from "./Pages/ProductionRequest/ProductionRequest.tsx";
import { CompanysCreate } from "./Pages/Companys/CompanysCreate.tsx";
import {EjemploVistaConDetalle} from "./Pages/EjemploVistaConDetalle/EjemploVistaConDetalle.tsx";
import {ProductDetailPage} from "./components/ProductDetailPage/ProductDetailPage.tsx";
import {LabelView} from "./components/LabelView/LabelView.tsx";
import { Dashboard } from "./Pages/Dashboard/Dashboard.tsx";

export default function App() {
    return (
        <>
        <HashRouter>
            <Routes>
                <Route path={'/ejemplo'} element={<EjemploVistaConDetalle/>}/>
                <Route path={'/admin/'} element={<AdminLayout/>}>
                    <Route path={'*'} element={<div>error</div>}/>
                    <Route path={'dashboard'} element={<Dashboard/>}/>
                    <Route path={'Roles'} element={<Roles/>}/>
                    <Route path={'roles/create'} element={<RolesCreate/>}/>
                    <Route path={'Supplys'} element={<Supplies/>}/>
                    <Route path={'Products'} element={<Products/>}/>
                    <Route path={'Companys'} element={<Companys/>}/>
                    <Route path={'Companys/create'} element={<CompanysCreate/>}/>
                    <Route path={'Suppliers'} element={<Suppliers/>}/>
                    <Route path={'ProductionOrders'} element={<ProductionOrders/>}/>
                    <Route path={'ProductionRequest'} element={<ProductionRequest/>}/>
                    <Route path={'Coustomers'} element={<Coustomers/>}/>
                    <Route path={'Coustomer/create'} element={<CustomersCreate/>}/>
                    <Route path= {'ejemplo'} element= {<EjemploVistaConDetalle/>}/>
                    <Route path={'Sales'} element={<Sales/>}/>
                    <Route path={'Orders'} element={<Orders/>}/>
                </Route>
                <Route path={'*'} element={<div>error</div>}/>
                <Route path={'/'} element={<UserLayout/>}>
                    <Route path={'home'} element={<Home/>   }/>
                    <Route path={'tiendaUser'} element={<TiendaUser/>   }/>
                    <Route path={'producto/:id'} element={<ProductDetailPage/>}/>
                    <Route path={'*'} element={<div>error</div>}/>
                </Route>
            </Routes>
        </HashRouter>
            <LabelView/>
        </>
    )
}
