import {HashRouter, Routes, Route} from "react-router-dom";
import {AdminLayout} from "./Layout/AdminLayout/AdminLayout.tsx";

export default function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path={'/admin/'} element={<AdminLayout/>}>
                    <Route path={'*'} element={<div>error</div>}/>
                    <Route path={'dashboard'} element={<div>Dashboard</div>}/>
                    <Route path={'Roles'} element={<div>Roles</div>}/>
                </Route>
            </Routes>
        </HashRouter>
    )
}
