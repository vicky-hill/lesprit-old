import { combineReducers } from 'redux';
import auth from './auth';
import words from './words';
import alerts from './alerts';
import lists from './lists';
import utils from './utils';
import review from './review';

export default combineReducers({
    auth,
    words,
    alerts,
    lists,
    utils,
    review
});