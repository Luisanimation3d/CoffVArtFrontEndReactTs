import {HashRouter, Routes, Route} from "react-router-dom";
import {lazy, Suspense} from "react";
import {LabelView} from "./components/LabelView/LabelView.tsx";
import {AuthProvider} from "./context/AuthContext.tsx";
import {CartProvider} from "./context/CartContext.tsx";
import {DarkModeProvider} from "./context/DarkMode.tsx";
import {ProtectedRoutes} from "./Routes/ProtectedRoutes.tsx";
// import {LoaderLayout} from "./components/Loaders/LoaderLayout.tsx";

// import {Supplies} from "./Pages/Supplies/SuppliesList.tsx";
// import {Products} from "./Pages/Products/ProductsList.tsx";
// import {Coustomers} from "./Pages/Coustomers/CoustomersList.tsx";
// import {CustomersCreate} from "./Pages/Coustomers/CoustomersCreate.tsx";
// import {CustomersEdit} from "./Pages/Coustomers/CoustomersEdit.tsx";
// import {Sales} from "./Pages/Sales/SalesList.tsx";
// import {Shops} from "./Pages/Shops/ShopsList.tsx";
// import {ShopsCreate} from "./Pages/Shops/ShopsCreate.tsx";
// import {Companys} from "./Pages/Companys/Companys.tsx";
// import {CompanysCreate} from "./Pages/Companys/CompanysCreate.tsx";
// import {CompanysEdit} from "./Pages/Companys/CompanysEdit.tsx";
// import {Suppliers} from "./Pages/Suppliers/Suppliers.tsx";
// import {SuppliersCreate} from "./Pages/Suppliers/SuppliersCreate.tsx";
// import {SuppliersEdit} from "./Pages/Suppliers/SuppliersEdit.tsx";
// import {ProductionOrders} from "./Pages/ProductionOrders/ProductionOrders.tsx";
// import {ProductionOrdersCreate} from "./Pages/ProductionOrders/ProductionOrdersCreate.tsx";
// import {ProductionOrdersEdit} from "./Pages/ProductionOrders/ProductionOrdersEdit.tsx";
// import {Orders} from "./Pages/Orders/OrdersList.tsx";
// import {OrdersCreate} from "./Pages/Orders/OrdersCreate.tsx";
// import {ProductionRequests} from "./Pages/ProductionRequests/ProductionRequests.tsx";
// import {ProductionRequestsCreate} from "./Pages/ProductionRequests/ProductionRequestsCreate.tsx";
// import {ProductionRequestsEdit} from "./Pages/ProductionRequests/ProductionRequestsEdit.tsx";
// import {Processes} from "./Pages/Processes/Processes.tsx";
// import {ProcessesCreate} from "./Pages/Processes/ProcessesCreate.tsx";
// import {EjemploVistaConDetalle} from "./Pages/EjemploVistaConDetalle/EjemploVistaConDetalle.tsx";

// import {Dashboard} from "./Pages/Dashboard/Dashboard.tsx";
// import {AdminLayout} from "./Layout/AdminLayout/AdminLayout.tsx";
// import {UserLayout} from "./Layout/UserLayout/UserLayout.tsx";
// import {SimpleLayout} from "./Layout/SimpleLayout/SimpleLayout.tsx";
// import {Home} from "./Pages/Home/Home.tsx";
// import {TiendaUser} from "./Pages/Catalogue/TiendaUser.tsx";
// import {MyProfile} from "./Pages/MyProfile/MyProfile.tsx";
// import {Roles} from "./Pages/Roles/Roles";
// import {RolesCreate} from "./Pages/Roles/RolesCreate.tsx";
// import {RolesEdit} from "./Pages/Roles/RolesEdit.tsx";
// import {ResetPassword, SendEmail} from "./Pages/RecoveryPassword/RecoveryPassword.tsx";
// import {Login} from "./Pages/Login/Login.tsx";
// import {Register} from "./Pages/Register/Register.tsx";
// import {User} from "./Pages/Users/Users.tsx";
// import {Cart} from "./Pages/Cart/Cart.tsx";
// import {ProductDetailPage} from "./components/ProductDetailPage/ProductDetailPage.tsx";

// LAYOUT COMPONENTS
const AdminLayout = lazy(() => import('./Layout/AdminLayout/AdminLayout.tsx'));
const UserLayout = lazy(() => import('./Layout/UserLayout/UserLayout.tsx'));
const SimpleLayout = lazy(() => import('./Layout/SimpleLayout/SimpleLayout.tsx'));

// PAGES COMPONENTS
// Admin Views
const Dashboard = lazy(() => import('./Pages/Dashboard/Dashboard.tsx'));
const Roles = lazy(() => import('./Pages/Roles/Roles.tsx'));
const RolesCreate = lazy(() => import('./Pages/Roles/RolesCreate.tsx'));
const RolesEdit = lazy(() => import('./Pages/Roles/RolesEdit.tsx'));
const User = lazy(() => import('./Pages/Users/Users.tsx'));
const UserCreate = lazy(() => import('./Pages/Users/CreateUser.tsx'));
const Supplies = lazy(() => import('./Pages/Supplies/SuppliesList.tsx'));
const Products = lazy(() => import('./Pages/Products/ProductsList.tsx'));
const Coustomers = lazy(() => import('./Pages/Coustomers/CoustomersList.tsx'));
const CustomersCreate = lazy(() => import('./Pages/Coustomers/CoustomersCreate.tsx'));
const CustomersEdit = lazy(() => import('./Pages/Coustomers/CoustomersEdit.tsx'));
const Sales = lazy(() => import('./Pages/Sales/SalesList.tsx'));
const Shops = lazy(() => import('./Pages/Shops/ShopsList.tsx'));
const ShopsCreate = lazy(() => import('./Pages/Shops/ShopsCreate.tsx'));
const Companys = lazy(() => import('./Pages/Companys/Companys.tsx'));
const CompanysCreate = lazy(() => import('./Pages/Companys/CompanysCreate.tsx'));
const Suppliers = lazy(() => import('./Pages/Suppliers/Suppliers.tsx'));
const SuppliersCreate = lazy(() => import('./Pages/Suppliers/SuppliersCreate.tsx'));
const ProductionOrders = lazy(() => import('./Pages/ProductionOrders/ProductionOrders.tsx'));
const ProductionOrdersCreate = lazy(() => import('./Pages/ProductionOrders/ProductionOrdersCreate.tsx'));
const ProductionOrdersEdit = lazy(() => import('./Pages/ProductionOrders/ProductionOrdersEdit.tsx'));
const Orders = lazy(() => import('./Pages/Orders/OrdersList.tsx'));
const OrdersCreate = lazy(() => import('./Pages/Orders/OrdersCreate.tsx'));
const OrdersEditPrueba = lazy(() => import('./Pages/Orders/OrdersEditPrueba.tsx'));
const ProductionRequests = lazy(() => import('./Pages/ProductionRequests/ProductionRequests.tsx'));
const ProductionRequestsCreate = lazy(() => import('./Pages/ProductionRequests/ProductionRequestsCreate.tsx'));
const ProductionRequestsEdit = lazy(() => import('./Pages/ProductionRequests/ProductionRequestsEdit.tsx'));
const Processes = lazy(() => import('./Pages/Processes/Processes.tsx'));
const ProcessesCreate = lazy(() => import('./Pages/Processes/ProcessesCreate.tsx'));
const EjemploVistaConDetalle = lazy(() => import('./Pages/EjemploVistaConDetalle/EjemploVistaConDetalle.tsx'));

// User Viws
const Home = lazy(() => import('./Pages/Home/Home.tsx'));
const TiendaUser = lazy(() => import('./Pages/Catalogue/TiendaUser.tsx'));
const MyProfile = lazy(() => import('./Pages/MyProfile/MyProfile.tsx'));
const ProductDetailPage = lazy(() => import('./components/ProductDetailPage/ProductDetailPage.tsx'));
const ResetPassword = lazy(() => import('./Pages/RecoveryPassword/ResetPassword.tsx'));
const SendEmail = lazy(() => import('./Pages/RecoveryPassword/RecoveryPassword.tsx'));
const Login = lazy(() => import('./Pages/Login/Login.tsx'));
const Register = lazy(() => import('./Pages/Register/Register.tsx'));
const Cart = lazy(() => import('./Pages/Cart/Cart.tsx'));
const CartCheckout = lazy(() => import('./Pages/CartCheckout/CartCheckout.tsx'));
const ThanksCheckout = lazy(() => import('./Pages/ThanksCheckout/ThanksCheckout.tsx'));

export default function App() {
    return (
        <>
            <AuthProvider>
                <DarkModeProvider>
                    <CartProvider>
                        <HashRouter>
                            <Routes>
                                <Route path={'/ejemplo'} element={<EjemploVistaConDetalle/>}/>
                                <Route element={<ProtectedRoutes/>}>
                                    <Route path={'/admin/'} element={
                                        <Suspense fallback={<h1>Cargando el componente de admin</h1>}>
                                            <AdminLayout/>
                                        </Suspense>
                                    }>
                                        <Route path={'*'} element={<div>error</div>}/>
                                        <Route path={'dashboard'} element={
                                            <Suspense fallback={<h1>Cargando el componente de dashboard</h1>}>
                                                <Dashboard/>
                                            </Suspense>
                                        }/>
                                        <Route path={'Roles'} element={
                                            <Suspense fallback={<h1>Cargando el componente de roles</h1>}>
                                                <Roles/>
                                            </Suspense>
                                        }/>
                                        <Route path={'roles/create'} element={
                                            <Suspense fallback={<h1>Cargando el componente de roles</h1>}>
                                                <RolesCreate/>
                                            </Suspense>
                                        }/>
                                        <Route path={'roles/edit/:id'} element={
                                            <Suspense fallback={<h1>Cargando el componente de roles</h1>}>
                                                <RolesEdit/>
                                            </Suspense>
                                        }/>
                                        <Route path={'Supplys'} element={
                                            <Suspense fallback={<h1>Cargando el componente de supplies</h1>}>
                                                <Supplies/>
                                            </Suspense>
                                        }/>
                                        <Route path={'Products'} element={
                                            <Suspense fallback={<h1>Cargando el componente de products</h1>}>
                                                <Products/>
                                            </Suspense>
                                        }/>
                                        <Route path={'Companys'} element={
                                            <Suspense fallback={<h1>Cargando el componente de companys</h1>}>
                                                <Companys/>
                                            </Suspense>
                                        }/>
                                        <Route path={'Companys/create'} element={
                                            <Suspense fallback={<h1>Cargando el componente de companys</h1>}>
                                                <CompanysCreate/>
                                            </Suspense>
                                        }/>

                                        <Route path={'Suppliers'} element={
                                            <Suspense fallback={<h1>Cargando el componente de suppliers</h1>}>
                                                <Suppliers/>
                                            </Suspense>
                                        }/>
                                        <Route path={'Suppliers/create'} element={
                                            <Suspense fallback={<h1>Cargando el componente de suppliers</h1>}>
                                                <SuppliersCreate/>
                                            </Suspense>
                                        }/>

                                        <Route path={'ProductionOrders'} element={
                                            <Suspense fallback={<h1>Cargando el componente de production orders</h1>}>
                                                <ProductionOrders/>
                                            </Suspense>
                                        }/>
                                        <Route path={'ProductionOrders/create'} element={
                                            <Suspense fallback={<h1>Cargando el componente de production orders</h1>}>
                                                <ProductionOrdersCreate/>
                                            </Suspense>
                                        }/>
                                        <Route path={'ProductionOrders/edit/:id'} element={
                                            <Suspense fallback={<h1>Cargando el componente de production orders</h1>}>
                                                <ProductionOrdersEdit/>
                                            </Suspense>
                                        }/>
                                        <Route path={'ProductionRequests'} element={
                                            <Suspense fallback={<h1>Cargando el componente de production requests</h1>}>
                                                <ProductionRequests/>
                                            </Suspense>
                                        }/>
                                        <Route path={'ProductionRequests/create'} element={
                                            <Suspense fallback={<h1>Cargando el componente de production requests</h1>}>
                                                <ProductionRequestsCreate/>
                                            </Suspense>
                                        }/>

                                        <Route path={'Processes'} element={
                                            <Suspense fallback={<h1>Cargando el componente de processes</h1>}>
                                                <Processes/>
                                            </Suspense>
                                        }/>
                                        <Route path={'Processes/create'} element={
                                            <Suspense fallback={<h1>Cargando el componente de processes</h1>}>
                                                <ProcessesCreate/>
                                            </Suspense>
                                        }/>
                                        <Route path={'Coustomers'} element={
                                            <Suspense fallback={<h1>Cargando el componente de coustomers</h1>}>
                                                <Coustomers/>
                                            </Suspense>
                                        }/>
                                        <Route path={'Coustomer/create'} element={
                                            <Suspense fallback={<h1>Cargando el componente de coustomers</h1>}>
                                                <CustomersCreate/>
                                            </Suspense>
                                        }/>
                                        <Route path={'Coustomer/edit/:id'} element={
                                            <Suspense fallback={<h1>Cargando el componente de coustomers</h1>}>
                                                <CustomersEdit/>
                                            </Suspense>
                                        }/>
                                        <Route path={'ejemplo'} element={
                                            <Suspense fallback={<h1>Cargando el componente de ejemplo</h1>}>
                                                <EjemploVistaConDetalle/>
                                            </Suspense>
                                        }/>
                                        <Route path={'Sales'} element={
                                            <Suspense fallback={<h1>Cargando el componente de sales</h1>}>
                                                <Sales/>
                                            </Suspense>
                                        }/>
                                        <Route path={'Shops'} element={
                                            <Suspense fallback={<h1>Cargando el componente de shops</h1>}>
                                                <Shops/>
                                            </Suspense>
                                        }/>
                                        <Route path={'Shops/create'} element={
                                            <Suspense fallback={<h1>Cargando el componente de shops</h1>}>
                                                <ShopsCreate/>
                                            </Suspense>
                                        }/>
                                        <Route path={'Orders'} element={
                                            <Suspense fallback={<h1>Cargando el componente de orders</h1>}>
                                                <Orders/>
                                            </Suspense>
                                        }/>
                                        <Route path={'Orders/create'} element={
                                            <Suspense fallback={<h1>Cargando el componente de orders</h1>}>
                                                <OrdersCreate/>
                                            </Suspense>
                                        }/>
                                        <Route path={'Orders/edit/:id'} element={
                                            <Suspense fallback={<h1>Cargando el componente de orders</h1>}>
                                                <OrdersEditPrueba/>
                                            </Suspense>
                                        }/>
                                        <Route path={'users'} element={
                                            <Suspense fallback={<h1>Cargando el componente de usuarios</h1>}>
                                                <User/>
                                            </Suspense>
                                        }/>
                                        <Route path={'users/create'} element={
                                            <Suspense fallback={<h1>Cargando el componente de usuarios</h1>}>
                                                <UserCreate/>
                                            </Suspense>
                                        }/>
                                        <Route path={'my-profile'} element={
                                            <Suspense fallback={<h1>Cargando el componente de mi perfil</h1>}>
                                                <MyProfile/>
                                            </Suspense>
                                        }/>
                                    </Route>
                                </Route>
                                <Route path={'*'} element={<div>error</div>}/>
                                <Route path={'/'} element={
                                    <Suspense fallback={<h1>Cargando el componente de user</h1>}>
                                        <UserLayout/>
                                    </Suspense>
                                }>
                                    <Route path={'home'} element={
                                        <Suspense fallback={<h1>Cargando el componente de home</h1>}>
                                            <Home/>
                                        </Suspense>
                                    }/>
                                    <Route path={'tiendaUser'} element={
                                        <Suspense fallback={<h1>Cargando el componente de tienda</h1>}>
                                            <TiendaUser/>
                                        </Suspense>
                                    }/>
                                    <Route path={'producto/:id'} element={
                                        <Suspense fallback={<h1>Cargando el componente de detalle de producto</h1>}>
                                            <ProductDetailPage/>
                                        </Suspense>
                                    }/>
                                    <Route path={'*'} element={<div>error</div>}/>
                                </Route>
                                <Route path={'/user/'} element={
                                    <Suspense fallback={<h1>Cargando el componente de user</h1>}>
                                        <SimpleLayout/>
                                    </Suspense>
                                }>
                                    <Route path={'sendRecoveryPassword'} element={
                                        <Suspense fallback={<h1>Cargando el componente de send email</h1>}>
                                            <SendEmail/>
                                        </Suspense>
                                    }/>
                                    <Route path={'reset-password/:token'} element={
                                        <Suspense fallback={<h1>Cargando el componente de reset password</h1>}>
                                            <ResetPassword/>
                                        </Suspense>
                                    }/>
                                    <Route path={'login'} element={
                                        <Suspense fallback={<h1>Cargando el componente de login</h1>}>
                                            <Login/>
                                        </Suspense>
                                    }/>
                                    <Route path={'register'} element={
                                        <Suspense fallback={<h1>Cargando el componente de registro</h1>}>
                                            <Register/>
                                        </Suspense>
                                    }/>
                                    <Route path={'cart'} element={
                                        <Suspense fallback={<h1>Cargando el componente de carrito</h1>}>
                                            <Cart/>
                                        </Suspense>
                                    }/>
                                    <Route path={'checkout'} element={
                                        <Suspense fallback={<h1>Cargando el componente de carrito</h1>}>
                                            <CartCheckout/>
                                        </Suspense>
                                    }/>
                                    <Route path={'thanks'} element={
                                        <Suspense fallback={<h1>Cargando el componente de carrito</h1>}>
                                            <ThanksCheckout/>
                                        </Suspense>
                                    }/>
                                </Route>
                            </Routes>
                        </HashRouter>
                        <LabelView/>
                    </CartProvider>
                </DarkModeProvider>
            </AuthProvider>
        </>
    )
}
