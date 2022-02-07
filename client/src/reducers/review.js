import {
    START_REVIEW,
    CLOSE_REVIEW,
    GET_RANDOM_WORD,
    UPDATE_WRONG_WORD
} from 'actions/types';

import { defaultWord } from 'utils/default';

const initialState = {
    items: [],
    current: defaultWord,
    level: null, 
    phrase: false,
    highlight: false,
    loading: true,
    reviewMode: false,
}

export default function reviewReducer (state = initialState, action) {
    const { type, payload } = action;

    switch(type) {

        case START_REVIEW:  
            return {
                ...state,
                items: payload,
                reviewMode: true
            }

        case CLOSE_REVIEW:
            return {
                ...state,
                current: defaultWord,
                level: null, 
                phrase: false,
                highlight: false,
                loading: true,
                reviewMode: false
            }

        case UPDATE_WRONG_WORD:
            return {
                ...state,
                items: state.items.map(item => {
                    if (item._id === payload._id) {
                        return {
                            ...payload,
                            rating: 1
                        };
                    }
                    return item;
                })
            }

        case GET_RANDOM_WORD:  
            const { level, phrase, highlight } = payload.options;
            
            return {
                ...state,
                items: state.items.filter(item => item._id !== payload.correctWord._id),
                current: payload.randomWord,
                level: level,
                phrase: phrase,
                highlight: highlight,
                loading: false
            }


        default:     
            return {
                ...state
            }
    }
}