import { LOGIN_SUCCESS, LOGOUT, SETUSER } from '../actions/authAction';

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: !!localStorage.getItem('user'),
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
            };
        case LOGOUT:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
            };
        case SETUSER:
            localStorage.setItem('user', JSON.stringify(action.payload));
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
            };
        default:
            return state;
    }
};

export default authReducer;
