import api from '../utils/api';

import {
    GET_WORDS,
    SAVE_WORD,
    OPEN_CREATE,
    OPEN_EDIT,
    UPDATE_WORD,
    DELETE_WORD,
    SEARCH_WORDS
} from './types';


/* ===================================
   Get Words
=================================== */

export const getWords = () => async dispatch => {
    try {
        const res = await api.get('/api/words');

        dispatch({
            type: GET_WORDS,
            payload: res.data
        })

    } catch (err) {
        console.log(err.message);
    }
}

/* ===================================
   Save Word
=================================== */

export const saveWord = (data) => async dispatch => {
    try {
        const res = await api.post('/api/words', data);

        dispatch({
            type: SAVE_WORD,
            payload: res.data
        })
    } catch (err) {
        console.log(err)
    }
}

/* ===================================
   Update Word
=================================== */

export const updateWord = (id, data) => async dispatch => {
    try {
        const res = await api.put(`/api/words/${id}`, data);

        dispatch({
            type: UPDATE_WORD,
            payload: res.data
        })
    } catch (err) {
        console.log(err.message)
    }
}

/* ===================================
   Delete Word
=================================== */

export const deleteWord = id => async dispatch => {
    try {
        const res = await api.delete(`/api/words/${id}`);

        dispatch({
            type: DELETE_WORD,
            payload: res.data
        })
    } catch (err) {
        console.log(err.message)
    }
}


/* ===================================
   Open Create
=================================== */
export const openCreate = () => async dispatch => {
    try {
        dispatch({
            type: OPEN_CREATE,
        })

    } catch (err) {
        console.log(err.message);
    }
}

/* ===================================
   Open Edit
=================================== */
export const openEdit = (id, foreign, native, phrases) => async dispatch => {
    dispatch({
        type: OPEN_EDIT,
        payload: {
            id,
            data: {
                foreign,
                native,
                phrases
            }
        }
    })
}


/* ===================================
   Search words
=================================== */
export const onSearch = (search) => async dispatch => {
    dispatch({
        type: SEARCH_WORDS,
        payload: search
    })
}


