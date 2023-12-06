export type AuthContextProps = {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    login: (user: User | null, token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
    updateUser: (user: User) => void;
}

export type User = {
    email: string;
    name: string;
    role: string;
    permissions: string[];
}

export type AuthState = {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
    updateUser: (user: User) => void;
}

export type AuthAction = {
    type: string;
    payload?: any;
}

export enum AuthActionValues {
    LOGIN,
    LOGOUT,
    ERROR,
    UPDATE_USER,
}