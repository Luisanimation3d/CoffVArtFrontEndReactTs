import {Outlet, useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext.tsx";
import {useEffect} from "react";

export const ProtectedRoutes = () => {
    const {isAuthenticated} = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if(!isAuthenticated) navigate('/home');
    }, []);

    return (
        <Outlet />
    );
}