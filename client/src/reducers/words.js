import {
    GET_WORDS
} from '../actions/words';

const initialState = {
    // state
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {

        case GET_WORDS:  
            return {
                ...state,
                isAuthenticated: true,
            }

        default:     
            return {
                ...state
            }
    }
}