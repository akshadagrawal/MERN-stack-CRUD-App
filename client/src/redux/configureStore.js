import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './ducks/authReducer';
import errorReducer from './ducks/errors';
import entryReducer from './ducks/entryReducer';

const rootreducer= combineReducers({
    auth: authReducer,
    error: errorReducer,
    entry: entryReducer
});

const middlewares= [ thunk ];
const store= createStore (rootreducer, {},composeWithDevTools( applyMiddleware(...middlewares)));

export default store;