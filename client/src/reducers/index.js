import { combineReducers } from 'redux';
import auth from './auth';
import words from './words';

export default combineReducers({
    auth,
    words
});