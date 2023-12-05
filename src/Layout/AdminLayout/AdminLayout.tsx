import {Outlet} from "react-router-dom";
import {SideBarMenu} from "../../components/SideBarMenu/SideBarMenu";
import {useRutasAdmin} from "../../Routes/AdminRoutes";

import './AdminLayout.css';
export const AdminLayout = () => {
    const {AdminRoutes} = useRutasAdmin();
    return (
        <>
            <SideBarMenu items={AdminRoutes}/>
            <div className="adminLayout__mainContent">
                <Outlet/>
            </div>
        </>
    )
}