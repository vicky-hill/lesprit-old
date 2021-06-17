import { createStore, applyMiddleware } from 'redux'; 
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import reduxPromise from 'redux-promise';

const initialState = {};

const middleware = [thunk, reduxPromise];

export const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));