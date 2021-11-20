import {
    OPEN_SLIDE,
    CLOSE_SLIDE,
    OPEN_HIDE,
    CLOSE_HIDE
} from './types';



/* ===================================
   Open Slide
=================================== */

export const openSlide = () => async dispatch => {
    dispatch({
        type: OPEN_SLIDE
    })
}


/* ===================================
   Close Slide
=================================== */

export const closeSlide = () => async dispatch => {
    dispatch({
        type: CLOSE_SLIDE
    })
}


/* ===================================
   Open Hide
=================================== */

export const openHide = () => async dispatch => {
    dispatch({
        type: OPEN_HIDE
    })
}


/* ===================================
   Close Hide
=================================== */

export const closeHide = () => async dispatch => {
    dispatch({
        type: CLOSE_HIDE
    })
}