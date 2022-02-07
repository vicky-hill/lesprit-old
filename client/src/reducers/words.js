import {
    GET_WORDS,
    SAVE_WORD,
    OPEN_EDIT,
    OPEN_CREATE,
    UPDATE_WORD, 
    DELETE_WORD,
    SEARCH_WORDS,
    SORT_BY_DATE,
    SORT_BY_RATING,
} from 'actions/types';

const initialState = {
    words: [],
    search: '',
    form: {
        // create, edit
        mode: '',
        id: null,
        data: {
            foreign: '',
            native: '',
            phrases: []
        }
    },
    loading: true,
    rerender: false,
    error: {}
}

export default function wordReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {

        case GET_WORDS:
            return {
                ...state,
                words: payload,
                loading: false
            }

        case SAVE_WORD:
            return {
                ...state,
                words: [payload, ...state.words]
            }

        case UPDATE_WORD: 
            return {
                ...state,
                words: state.words.map(word => {
                    if (word._id === payload._id) {
                        return payload;
                    }
                    return word;
                })
            }

        case DELETE_WORD:  
            return {
                ...state,
                words: state.words.filter(word => (
                    word._id !== payload._id
                ))
            }

        case OPEN_CREATE:
            return {
                ...state,
                form: {
                    mode: 'create',
                    id: null,
                    data: {
                        foreign: '',
                        native: '',
                        phrases: []
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

        case SEARCH_WORDS:  
            return {
                ...state,
                search: payload
            }

        case SORT_BY_DATE:
            return {
                ...state,
                words: state.words.sort((a, b) => a.dueDate - b.dueDate),
                rerender: !state.rerender
            }

        case SORT_BY_RATING:
            return {
                ...state,
                words: state.words.sort((a, b) => a.rating - b.rating),
                rerender: !state.rerender
            }

        default:
            return {
                ...state
            }
    }
}