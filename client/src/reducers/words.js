import {
    GET_WORDS, 
    SAVE_WORD
} from 'actions/types';

const initialState = {
    words: []
}

export default function wordReducer (state = initialState, action) {
    const { type, payload } = action;

    switch(type) {

        case GET_WORDS:  
            return {
                ...state,
                words: payload
            }

        case SAVE_WORD:  
            return {
                ...state,
                words: [...state.words, payload]
            }
        

        default:     
            return {
                ...state
            }
    }
}