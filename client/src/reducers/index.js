import { combineReducers } from 'redux';
import auth from './auth';
import words from './words';
import alerts from './alerts';

export default combineReducers({
    auth,
    words,
    alerts
});