import {Outlet} from "react-router-dom";
import {SideBarMenu} from "../../components/SideBarMenu/SideBarMenu";
import {AdminRoutes} from "../../Routes/AdminRoutes";

import './AdminLayout.css';
export const AdminLayout = () => {
    return (
        <>
            <SideBarMenu items={AdminRoutes}/>
            <div className="adminLayout__mainContent">
                <Outlet/>
            </div>
        </>
    )
}