import {
    OPEN_SLIDE,
    CLOSE_SLIDE
} from 'actions/types';

const initialState = {
    slide: false
}

export default function(state = initialState, action) {
    const { type, payload } = action;

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