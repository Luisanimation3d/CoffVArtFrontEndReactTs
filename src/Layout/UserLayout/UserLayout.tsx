// import {HeaderMenu} from "../../components/HeaderMenu/HeaderMenu.tsx";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {UserFooter} from "../../components/Footer/Footer";
import {useEffect} from "react";
import {HeaderMenuRedisign} from "../../components/HeaderMenuRedisign/HeaderMenuRedisign.tsx";

export const UserLayout = () => {
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        if (location.pathname === '/') {
            navigate('/home')
        }
    }, []);
    return (
        <>
            {/*<HeaderMenu/>*/}
            <HeaderMenuRedisign/>
            <div className="userLayout__mainContent" style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                height: '100%',
                overflow: 'hidden',
                overflowY: 'auto',
            }}>
                <div style={{
                    flex: '1',
                }}>
                    <Outlet/>
                </div>
                <UserFooter/>
            </div>
        </>
    )
}

export default UserLayout;