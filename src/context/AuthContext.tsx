import { createContext, useContext, useEffect, useReducer } from "react";
import { AuthContextProps, AuthState, AuthActionValues, User } from "../types/AuthContext.d";
import { authReducer } from "./reducers/authReducer";
import {useFetch} from '../hooks/useFetch';
import {API_KEY, API_URL} from "../utils/constantes.ts";


const initialState: AuthState = {
    user: null,
    token: null,
    loading: true,
    error: null,
    isAuthenticated: false,
    updateUser: () => { },
};

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    token: null,
    loading: true,
    error: null,
    login: () => { },
    logout: () => { },

    isAuthenticated: false,
    updateUser: () => { },
})

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }: any) => {

    const {data, error, get} = useFetch(API_URL);

    const [state, dispatch] = useReducer(authReducer, initialState, () => {
        const localData = localStorage.getItem("auth");
        return localData ? JSON.parse(localData) : initialState;
    });

    useEffect(() => {
        localStorage.setItem("auth", JSON.stringify(state));
    }, [state]);

    const login = (user: User | null, token: string) => {
        const payload = {
            user,
            token,
        }
        if (user && token) localStorage.setItem("auth", JSON.stringify(payload));
        dispatch({ type: AuthActionValues.LOGIN, payload });
    }

    const logout = () => {
        dispatch({ type: AuthActionValues.LOGOUT, payload: null });
        localStorage.removeItem("auth");
    }

    const updateUser = (user: {
        email: string,
        name: string,
        role: string,
        permissions: string[],
        address: string,
        phone: string,
        document: string,
        documentType: string,
    }) => {
        dispatch({ type: AuthActionValues.UPDATE_USER, payload: user });
    }

    const validateToken = (token: string) => {
        if(state.isAuthenticated){
            get(`login/validateToken?apikey=${API_KEY}`)
        }
    }

    useEffect(() => {
        const token = state.token;
        if (token) {
            validateToken(token);
        }

        const interval = setInterval(() => {
            const token = state.token;
            if (token) {
                validateToken(token);
            }
        }, 60000);

        return () => clearInterval(interval);
    }, [state.token]);

    useEffect(() => {
        if (error) {
            logout();
        }
    }, [error])

    return (
        <AuthContext.Provider value={{
            user: state.user,
            token: state.token,
            loading: state.loading,
            error: state.error,
            login,
            logout,
            isAuthenticated: state.isAuthenticated,
            updateUser,
        }}>
            {children}
        </AuthContext.Provider>
    )

}