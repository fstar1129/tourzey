import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
} from '../action/types';

const INITIAL_STATE = {
    user: null,
    loading: false,
    loggedin: false,
    userData: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_USER:
        return { ...state, error: '', loading: true };
        case LOGIN_USER_SUCCESS:
                return { ...state, ...INITIAL_STATE, loggedin: true, loading: false, user: action.userType, userData: action.payload };
        case LOGIN_USER_FAIL:
            return {
                ...state,
                loading: false,
                loggedin: false,
            };
        default:
            return state;
    }
};
