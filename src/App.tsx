import {HashRouter, Routes, Route} from "react-router-dom";
import {AdminLayout} from "./Layout/AdminLayout/AdminLayout.tsx";
import {Roles} from "./Pages/Roles/Roles..tsx";
import { Coustomers } from "./Pages/Coustomers/CoustomersList.tsx";
import { Sales } from "./Pages/Sales/SalesList.tsx";

export default function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path={'/admin/'} element={<AdminLayout/>}>
                    <Route path={'*'} element={<div>error</div>}/>
                    <Route path={'dashboard'} element={<div>Dashboard</div>}/>
                    <Route path={'Roles'} element={<Roles/>}/>
                    <Route path={'Coustomers'} element={<Coustomers/>}/>
                    <Route path={'Sales'} element={<Sales/>}/>
                </Route>
            </Routes>
        </HashRouter>
    )
}
