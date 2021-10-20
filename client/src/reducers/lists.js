import {
    GET_LISTS,
    SAVE_LIST
} from 'actions/types';

const initialState = {
    lists: []
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {

        case GET_LISTS:  
            return {
                ...state,
                lists: payload
            }

        case SAVE_LIST:  
            return {
                ...state,
                lists: [...state.lists, payload]
            }

        default:     
            return {
                ...state
            }
    }
}

