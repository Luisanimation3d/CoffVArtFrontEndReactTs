import {createContext, useContext, useReducer} from "react";


import {darkModeReducer} from "./reducers/darkModeReducer.tsx";

interface DarkModeContextProps {
    darkMode: boolean;
    setDarkMode: (darkMode: boolean) => void;
}

const initialState = {
    darkMode: false
};

const DarkModeContext = createContext<DarkModeContextProps>({
    darkMode: false,
    setDarkMode: () => {}
});

export const useDarkMode = () => {
    return useContext(DarkModeContext);
};

export const DarkModeProvider = ({children}: any) => {
    const [state, dispatch] = useReducer(darkModeReducer, initialState, () => {
        const localData = localStorage.getItem('darkMode');
        return localData ? JSON.parse(localData) : initialState;
    });


    
    const setDarkMode = (darkMode: boolean) => {
        dispatch({
            type: 'SET_DARK_MODE',
            payload: darkMode
        });
        localStorage.setItem('darkMode', JSON.stringify({darkMode}));
    }
    
    return (
        <DarkModeContext.Provider value={{darkMode: state.darkMode, setDarkMode}}>
            {children}
        </DarkModeContext.Provider>
    )
}