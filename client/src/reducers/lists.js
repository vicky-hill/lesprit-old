import {
    DISPLAY_LIST,
    GET_LISTS,
    SAVE_LIST
} from 'actions/types';

const initialState = {
    lists: [],
    displayList: ''
}

export default function listReducer (state = initialState, action) {
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
                lists: [payload, ...state.lists]
            }
        
        case DISPLAY_LIST:
            return {
                ...state,
                displayList: state.lists.filter(list => list.slug === payload)[0]
            }

        default:     
            return {
                ...state
            }
    }
}

