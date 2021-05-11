import api from '../utils/api';

export const GET_USER = 'GET_USER';


/* ===================================
   Get User
=================================== */

export const getUser = () => async dispatch => {
    try {
        const res = await api.get('/api/user');

        dispatch({
            type: GET_USER,
            payload: res.data
        })

    } catch (err) {
        console.log(err.message);
    }
}
