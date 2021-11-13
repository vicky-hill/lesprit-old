import {
    DISPLAY_LIST,
    GET_LISTS,
    SAVE_LIST,
    UPDATE_LIST, 
    DELETE_LIST
} from 'actions/types';

const initialState = {
    lists: [],
    activeList: '',
    loading: true
}

export default function listReducer (state = initialState, action) {
    const { type, payload } = action;

    switch(type) {

        case GET_LISTS:  
            return {
                ...state,
                lists: payload,
                loading: false
            }

        case SAVE_LIST:  
            return {
                ...state,
                lists: [payload, ...state.lists],
                loading: false
            }

        case UPDATE_LIST:  
            return {
                ...state,
                lists: state.lists.map(list => {
                    if (list._id === payload._id) {
                        return payload;
                    }
                    return list;
                })
            }
        
        case DISPLAY_LIST:
            return {
                ...state,
                activeList: state.lists.filter(list => list.slug === payload)[0],
                loading: false
            }

        case DELETE_LIST:  
            return {
                ...state,
                lists: state.lists.filter(list => (
                    list._id !== payload._id
                ))
            }

        default:     
            return {
                ...state
            }
    }
}

