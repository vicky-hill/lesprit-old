import {
    GET_LISTS
} from 'actions/types';

const initialState = {
    all: []
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {

        case GET_LISTS:  
            return {
                ...state,
                all: payload
            }

        default:     
            return {
                ...state
            }
    }
}