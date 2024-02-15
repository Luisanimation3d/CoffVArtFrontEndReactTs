export const darkModeReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'SET_DARK_MODE':
            return {
                ...state,
                darkMode: action.payload,
            };
        default:
            return state;
    }
}