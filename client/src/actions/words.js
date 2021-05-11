import api from '../utils/api';

export const GET_WORDS = 'GET_WORDS';


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
