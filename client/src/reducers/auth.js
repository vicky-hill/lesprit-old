import {
    GET_USER,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_CHECK,
    LOGOUT_USER
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    loginCheck: false,
    user: {
        languages: [{foreign: "", native: ""}]
    }
}

export default function authReducer (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token);

            return {
                ...state,
                token: payload.token,
                isAuthenticated: true,
                loading: false,
                user: payload
            }

        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOGOUT_USER:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: 'loggedOut'
            }

        case LOGIN_CHECK:
            return {
                ...state,
                loginCheck: true
            }

        case GET_USER:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }

        default:
            return {
                ...state
            }
    }
}