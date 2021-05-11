import {
    GET_USER
} from '../actions/auth';

const initialState = {
    
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {

        case GET_USER:  
            return {
                ...state,
                isAuthenticated: true
            }

        default:     
            return {
                ...state
            }
    }
}