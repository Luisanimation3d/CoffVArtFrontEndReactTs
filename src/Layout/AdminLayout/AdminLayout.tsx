import { useEffect } from 'react';
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import { useRutasAdmin } from "../../Routes/AdminRoutes";

import './AdminLayout.css';
import { SideBarMenuRedisign } from "../../components/SideBarRedisign/SideBarRedisign.tsx";
import { useDarkMode } from "../../context/DarkMode.tsx";
import { FiLogOut } from "react-icons/fi";
import { API_KEY, API_URL } from "../../utils/constantes.ts";
import { useFetch } from "../../hooks/useFetch.tsx";
import { useAuth } from "../../context/AuthContext.tsx";
import { SideBarMenu } from "../../components/SideBarMenu/SideBarMenu.tsx";

export const AdminLayout = () => {
    const { AdminRoutes } = useRutasAdmin();
    const { darkMode } = useDarkMode();
    const { logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const { get: logoutGet } = useFetch(API_URL);

    const handleLogout = () => {
        logoutGet(`login/logout?apikey=${API_KEY}`);
        logout();
        setTimeout(() => {
            navigate('/home');
        }, 500);
    };

    if (!isAuthenticated) {
        return <Navigate to='/' />
    }

    return (
        <div className={`adminLayout__mainContainer`}>
            {/*<SideBarMenu items={AdminRoutes}/>*/}
            <SideBarMenuRedisign menuItems={AdminRoutes} />

            <div
                className={`adminLayout__mainContent ${darkMode ? 'adminLayout__mainContent__darkMode' : 'adminLayout__mainContent__lightMode'}`}>
                <button onClick={handleLogout} className={`adminLayout__actionButton`}>
                    {
                        (<>
                            <FiLogOut /> Cerrar Sesión
                        </>)
                        || 'Log Out'
                    }
                </button>
                <Outlet />
            </div>
        </div>
    )
}

export default AdminLayout;