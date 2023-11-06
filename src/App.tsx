import {HashRouter, Routes, Route} from "react-router-dom";
import {AdminLayout} from "./Layout/AdminLayout/AdminLayout.tsx";
import {Roles} from "./Pages/Roles/Roles..tsx";
import { Companys } from "./Pages/Companys/Companys.tsx";
import { Suppliers } from "./Pages/Suppliers/Suppliers.tsx";

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
                </Route>
            </Routes>
        </HashRouter>
    )
}
