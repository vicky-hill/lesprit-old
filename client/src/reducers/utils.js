import {
    OPEN_SLIDE,
    CLOSE_SLIDE
} from 'actions/types';

const initialState = {
    slide: false
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

        default:     
            return {
                ...state
            }
    }

}