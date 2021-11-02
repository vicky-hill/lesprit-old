import api from '../utils/api';

import {
    GET_LISTS,
    SAVE_LIST,
    DISPLAY_LIST
} from './types';



/* ===================================
   Get Lists
=================================== */

export const getLists = () => async dispatch => {
    try {
        const res = await api.get('/api/lists');

        dispatch({
            type: GET_LISTS,
            payload: res.data
        })

    } catch (err) {
        console.log(err.message);
    }
}

/* ===================================
   Save list
=================================== */

export const saveList = (data) => async dispatch => {
    try {
        const res = await api.post('/api/lists', data);

        dispatch({
            type: SAVE_LIST,
            payload: res.data
        })
    } catch (err) {
        console.log(err)
    }
}


/* ===================================
   Display list
=================================== */

export const displayList = (slug) => async dispatch => {
    dispatch({
        type: DISPLAY_LIST,
        payload: slug
    })
}


