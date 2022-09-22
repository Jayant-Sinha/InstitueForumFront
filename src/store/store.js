import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { promiseMiddleware, localStorageMiddleware } from './../middleware';
import reducer from './reducer';

import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory';
import course from "./reducers/course";
import auth from "./reducers/auth";


export const history = createHistory();

const myRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => {
    return applyMiddleware(myRouterMiddleware, promiseMiddleware, localStorageMiddleware, createLogger())
};

export const store = createStore(
    reducer, composeWithDevTools(getMiddleware()));