import {createContext, useContext, useEffect, useReducer} from "react";
import {AuthContextProps, AuthState, AuthActionValues, User} from "../types/AuthContext.d";
import {authReducer} from "./reducers/authReducer";

const initialState: AuthState = {
    user: null,
    token: null,
    loading: true,
    error: null,
    isAuthenticated: false,
    updateUser: () => {},
};

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    token: null,
    loading: true,
    error: null,
    login: () => {},
    logout: () => {},
    isAuthenticated: false,
    updateUser: () => {},
})

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}: any) => {
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
        if(user && token) localStorage.setItem("auth", JSON.stringify(payload));
        dispatch({type: AuthActionValues.LOGIN, payload});
    }

    const logout = () => {
        dispatch({type: AuthActionValues.LOGOUT, payload: null});
        localStorage.removeItem("auth");
    }

    const updateUser = (user: {
        email: string,
        name: string,
        role: string,
        permissions: string[],
    }) => {
        dispatch({type: AuthActionValues.UPDATE_USER, payload: user});
    }

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