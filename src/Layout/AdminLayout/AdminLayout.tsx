import {Link, Outlet} from "react-router-dom";
import {SideBarMenu} from "../../components/SideBarMenu/SideBarMenu";
import {useRutasAdmin} from "../../Routes/AdminRoutes";

import './AdminLayout.css';
export const AdminLayout = () => {
    const {AdminRoutes} = useRutasAdmin();
    return (
        <>
            <SideBarMenu items={AdminRoutes}/>
            <div className="adminLayout__mainContent">
                <Link to={'/home'} className={'adminLayout__link--toHome'}>Ir a Inicio</Link>
                <Outlet/>
            </div>
        </>
    )
}

export default AdminLayout;