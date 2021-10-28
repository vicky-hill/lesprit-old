import api from '../utils/api';

import {
    GET_WORDS
} from './types';

// getWords() :: null :: [{ _id, rating, foreign, native, user, dueDate, list {  _id, title } }]


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
