import api from '../utils/api';

import {
    GET_WORDS,
    SAVE_WORD
} from './types';

// getWords()                               :: [{ _id, rating, foreign, native, user, dueDate, list {  _id, title } }]
// saveWord({ foreign, native, list })      :: { _id, rating, foreign, native, user, dueDate, list {  _id, title } }

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