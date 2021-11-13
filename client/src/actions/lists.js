import api from '../utils/api';

import {
    GET_LISTS,
    SAVE_LIST,
    DISPLAY_LIST,
    UPDATE_LIST,
    DELETE_LIST
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
   Update List
=================================== */

export const updateList = (id, data) => async dispatch => {
    try {
        const res = await api.put(`/api/lists/${id}`, data);

        dispatch({
            type: UPDATE_LIST,
            payload: res.data
        })
    } catch (err) {
        console.log(err.message)
    }
}

/* ===================================
   Delete List
=================================== */

export const deleteList = id => async dispatch => {
    try {
        const res = await api.delete(`/api/lists/${id}`);

        dispatch({
            type: DELETE_LIST,
            payload: res.data
        })
    } catch (err) {
        console.log(err.message)
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


