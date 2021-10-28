import {
    GET_WORDS
} from 'actions/types';

const initialState = {
    all: []
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {

        case GET_WORDS:  
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