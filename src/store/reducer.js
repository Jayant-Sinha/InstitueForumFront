import course from './reducers/course';
import auth from "./reducers/auth";
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import common from "./reducers/common";

export default combineReducers({
    course,
    auth,
    common,
    router: routerReducer
});