import {HashRouter, Routes, Route} from "react-router-dom";
import {AdminLayout} from "./Layout/AdminLayout/AdminLayout.tsx";
import {Roles} from "./Pages/Roles/Roles";
import {Supplies} from "./Pages/Supplies/SuppliesList.tsx";
import {Products} from "./Pages/Products/ProductsList.tsx";
import {Coustomers} from "./Pages/Coustomers/CoustomersList.tsx";
import {CustomersCreate} from "./Pages/Coustomers/CoustomersCreate.tsx";
import {CustomersEdit} from "./Pages/Coustomers/CoustomersEdit.tsx";
import {Sales} from "./Pages/Sales/SalesList.tsx";
import { Shops } from "./Pages/Shops/ShopsList.tsx";
import {ShopsCreate} from "./Pages/Shops/ShopsCreate.tsx";
import {UserLayout} from "./Layout/UserLayout/UserLayout.tsx";
import {Companys} from "./Pages/Companys/Companys.tsx";
import {CompanysCreate} from "./Pages/Companys/CompanysCreate.tsx";
import {CompanysEdit} from "./Pages/Companys/CompanysEdit.tsx";
import {Suppliers} from "./Pages/Suppliers/Suppliers.tsx";
import {SuppliersCreate} from "./Pages/Suppliers/SuppliersCreate.tsx";
import {SuppliersEdit} from "./Pages/Suppliers/SuppliersEdit.tsx";
import {ProductionOrders} from "./Pages/ProductionOrders/ProductionOrders.tsx";
import {ProductionOrdersCreate} from "./Pages/ProductionOrders/ProductionOrdersCreate.tsx";
import {ProductionOrdersEdit} from "./Pages/ProductionOrders/ProductionOrdersEdit.tsx";
import {Home} from "./Pages/Home/Home.tsx";
import {TiendaUser} from "./Pages/Catalogue/TiendaUser.tsx";
import {Orders} from "./Pages/Orders/OrdersList.tsx";
import { OrdersCreate } from "./Pages/Orders/OrdersCreate.tsx";
import {RolesCreate} from "./Pages/Roles/RolesCreate.tsx";
import {ProductionRequests} from "./Pages/ProductionRequests/ProductionRequests.tsx";
import {ProductionRequestsCreate} from "./Pages/ProductionRequests/ProductionRequestsCreate.tsx";
import {Processes} from "./Pages/Processes/Processes.tsx";
import {ProcessesCreate} from "./Pages/Processes/ProcessesCreate.tsx";
import {EjemploVistaConDetalle} from "./Pages/EjemploVistaConDetalle/EjemploVistaConDetalle.tsx";
import {ProductDetailPage} from "./components/ProductDetailPage/ProductDetailPage.tsx";
import {LabelView} from "./components/LabelView/LabelView.tsx";
import {Dashboard} from "./Pages/Dashboard/Dashboard.tsx";
import {RolesEdit} from "./Pages/Roles/RolesEdit.tsx";
import {AuthProvider} from "./context/AuthContext.tsx";
import {ProtectedRoutes} from "./Routes/ProtectedRoutes.tsx";
import {MyProfile} from "./Pages/MyProfile/MyProfile.tsx";
import {CartProvider} from "./context/CartContext.tsx";
import {SimpleLayout} from "./Layout/SimpleLayout/SimpleLayout.tsx";
import {ResetPassword, SendEmail} from "./Pages/RecoveryPassword/RecoveryPassword.tsx";
import {Login} from "./Pages/Login/Login.tsx";
import {Register} from "./Pages/Register/Register.tsx";
import {User} from "./Pages/Users/Users.tsx";
import {Cart} from "./Pages/Cart/Cart.tsx";

export default function App() {
    return (
        <>
            <AuthProvider>
                <CartProvider>
                    <HashRouter>
                        <Routes>
                            <Route path={'/ejemplo'} element={<EjemploVistaConDetalle/>}/>
                            <Route element={<ProtectedRoutes/>}>
                                <Route path={'/admin/'} element={<AdminLayout/>}>
                                    <Route path={'*'} element={<div>error</div>}/>
                                    <Route path={'dashboard'} element={<Dashboard/>}/>
                                    <Route path={'Roles'} element={<Roles/>}/>
                                    <Route path={'roles/create'} element={<RolesCreate/>}/>
                                    <Route path={'roles/edit/:id'} element={<RolesEdit/>}/>
                                    <Route path={'Supplys'} element={<Supplies/>}/>
                                    <Route path={'Products'} element={<Products/>}/>
                                    <Route path={'Companys'} element={<Companys/>}/>
                                    <Route path={'Companys/create'} element={<CompanysCreate/>}/>
                                    <Route path={'Companys/edit/:id'} element={<CompanysEdit/>}/>
                                    <Route path={'Suppliers'} element={<Suppliers/>}/>
                                    <Route path={'Suppliers/create'} element={<SuppliersCreate/>}/>
                                    <Route path={'Suppliers/edit/:id'} element={<SuppliersEdit/>}/>
                                    <Route path={'ProductionOrders'} element={<ProductionOrders/>}/>
                                    <Route path={'ProductionOrders/create'} element={<ProductionOrdersCreate/>}/>
                                    <Route path={'ProductionOrders/edit/:id'} element={<ProductionOrdersEdit/>}/>
                                    <Route path={'ProductionRequests'} element={<ProductionRequests/>}/>
                                    <Route path={'ProductionRequests/create'} element={<ProductionRequestsCreate/>}/>         
                                    <Route path={'Processes'} element={<Processes/>}/>
                                    <Route path={'Processes/create'} element={<ProcessesCreate/>}/>
                                    <Route path={'Coustomers'} element={<Coustomers/>}/>
                                    <Route path={'Coustomer/create'} element={<CustomersCreate/>}/>
                                    <Route path={'Coustomer/edit/:id'} element={<CustomersEdit/>}/>
                                    <Route path={'ejemplo'} element={<EjemploVistaConDetalle/>}/>
                                    <Route path={'Sales'} element={<Sales/>}/>
                                    <Route path={'Shops'} element={<Shops/>}/>
                                    <Route path={'Shops/create'} element={<ShopsCreate/>}/>
                                    <Route path={'Orders'} element={<Orders/>}/>
                                    <Route path={'Orders/create'} element={<OrdersCreate/>}/>
                                    <Route path={'users'} element={<User/>}/>
                                    <Route path={'my-profile'} element={<MyProfile/>}/>
                                </Route>
                            </Route>
                            <Route path={'*'} element={<div>error</div>}/>
                            <Route path={'/'} element={<UserLayout/>}>
                                <Route path={'home'} element={<Home/>}/>
                                <Route path={'tiendaUser'} element={<TiendaUser/>}/>
                                <Route path={'producto/:id'} element={<ProductDetailPage/>}/>
                                <Route path={'*'} element={<div>error</div>}/>
                            </Route>
                            <Route path={'/user/'} element={<SimpleLayout/>}>
                                <Route path={'sendRecoveryPassword'} element={<SendEmail/>}/>
                                <Route path={'reset-password/:token'} element={<ResetPassword/>}/>
                                <Route path={'login'} element={<Login/>}/>
                                <Route path={'register'} element={<Register/>}/>
                                <Route path={'cart'} element={<Cart/>}/>
                            </Route>
                        </Routes>
                    </HashRouter>
                    <LabelView/>
                </CartProvider>
            </AuthProvider>
        </>
    )
}
