import {
    GET_WORDS, 
    SAVE_WORD,
    OPEN_EDIT
} from 'actions/types';

const initialState = {
    words: [],
    form: {
        // create, edit
        mode: 'create', 
        data: {
            foreign: '',
            native: ''
        }
    }, 
    loading: true,
    error: {}
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

        case OPEN_EDIT:  
            return {
                ...state,
                form: {
                    mode: 'edit',
                    data: payload
                }
            }
        

        default:     
            return {
                ...state
            }
    }
}