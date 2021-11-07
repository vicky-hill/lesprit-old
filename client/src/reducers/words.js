import {
    GET_WORDS,
    SAVE_WORD,
    OPEN_EDIT,
    OPEN_CREATE
} from 'actions/types';

const initialState = {
    words: [],
    form: {
        // create, edit
        id: null,
        mode: 'create',
        data: {
            foreign: '',
            native: ''
        }
    },
    loading: true,
    error: {}
}

export default function wordReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {

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

        case OPEN_CREATE:
            return {
                ...state,
                form: {
                    mode: 'create',
                    id: null,
                    data: {
                        foreign: '',
                        native: ''
                    }
                }
            }

        case OPEN_EDIT:
            return {
                ...state,
                form: {
                    mode: 'edit',
                    id: payload.id,
                    data: payload.data
                }
            }

        default:
            return {
                ...state
            }
    }
}