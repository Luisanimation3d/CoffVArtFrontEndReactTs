// import {HeaderMenu} from "../../components/HeaderMenu/HeaderMenu.tsx";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { UserFooter } from "../../components/Footer/Footer";
import { useEffect } from "react";
import { HeaderMenuRedisign } from "../../components/HeaderMenuRedisign/HeaderMenuRedisign.tsx";
// import { FooterRedisignDesktop } from "../../components/FooterRedisign/FooterRedisign.tsx";
// import { useAuth } from "../../context/AuthContext";

export const UserLayout = () => {
    // const { isAuthenticated } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        if (location.pathname === '/') {
            navigate('/home')
        }
    }, []);

    // if (!isAuthenticated) return <Navigate to='/' />

    return (
        <>
            {/*<HeaderMenu/>*/}
            <HeaderMenuRedisign />
            <div className="userLayout__mainContent" style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                height: '100%',
                // overflow: 'hidden',
                // overflowY: 'auto',
            }}>
                <div style={{
                    flex: '1',
                }}>
                    <Outlet />
                </div>
                <UserFooter />
                {/*<FooterRedisignDesktop/>*/}
            </div>
        </>
    )
}

export default UserLayout;