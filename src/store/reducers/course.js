import {
    COURSE_PAGE_LOADED,
    COURSE_PAGE_UNLOADED
} from '../../constants/actionTypes';

const initial = {
    isLoading: true,
    course: {},
    courses: []
}

const courseReducer = (state = initial, action) => {
    switch (action.type) {
        case COURSE_PAGE_LOADED:
            return {
                ...state,
                courses: action.payload
            };
        case COURSE_PAGE_UNLOADED:
            return {};
        default:
            return state;
    }
};

export default courseReducer