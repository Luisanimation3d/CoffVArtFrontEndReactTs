import { AuthActionValues, AuthState } from "../../types/AuthContext.d";

export const authReducer = (state: AuthState, action: { type: AuthActionValues; payload: any }) => {
    switch (action.type) {
        case AuthActionValues.LOGIN:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                loading: false,
                error: null,
                isAuthenticated: true,
            };
        case AuthActionValues.LOGOUT:
            return {
                ...state,
                user: null,
                token: null,
                loading: false,
                error: null,
                isAuthenticated: false,
            };
        case AuthActionValues.ERROR:
            return {
                ...state,
                error: action.payload.error,
                loading: false,
            };
        default:
            return state;
    }
}