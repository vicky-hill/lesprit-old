import api from '../utils/api';

import {
    OPEN_SLIDE,
    CLOSE_SLIDE
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