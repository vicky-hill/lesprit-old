import {
    OPEN_SLIDE,
    CLOSE_SLIDE,
    OPEN_HIDE,
    CLOSE_HIDE
} from 'actions/types';

const initialState = {
    slide: false,
    hide: false
}

export default function utilsReducer (state = initialState, action) {
    const { type } = action;

    switch(type) {

        case OPEN_SLIDE:  
            return {
                ...state,
                slide: true
            }

        case CLOSE_SLIDE:  
            return {
                ...state,
                slide: false
            }

        case OPEN_HIDE:  
            return {
                ...state,
                hide: true
            }

        case CLOSE_HIDE:  
            return {
                ...state,
                hide: false
            }

        default:     
            return {
                ...state
            }
    }

}