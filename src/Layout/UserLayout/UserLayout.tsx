import {HeaderMenu} from "../../components/HeaderMenu/HeaderMenu.tsx";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {UserFooter} from "../../components/Footer/Footer";

export const UserLayout = () => {
    const location = useLocation()
    const navigate = useNavigate()
    if(location.pathname === '/'){
        navigate('/home')
        return null
    }
    return (
        <>
            <HeaderMenu/>
            <div className="userLayout__mainContent" style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                height: '100%',
                overflow: 'auto',
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