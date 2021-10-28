import api from '../utils/api';

import {
    GET_LISTS,
    SAVE_LIST
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
