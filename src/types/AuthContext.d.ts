export type AuthContextProps = {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

export type AuthState = {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}

export type AuthAction = {
    type: string;
    payload?: any;
}

export enum AuthActionValues {
    LOGIN,
    LOGOUT,
    ERROR,
}