export const cartReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                ...state,
                cart: [...state.cart, action.payload],
            };
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cart: state.cart.filter((item: any) => item.id !== action.payload),
            };
        case 'SET_CART':
            return {
                ...state,
                cart: action.payload,
            };
        case 'CLEAR_CART':
            return {
                ...state,
                cart: [],
            };
        default:
            return state;
    }
};
