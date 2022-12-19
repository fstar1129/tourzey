import {
    SIGNUP,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL
} from '../action/types';

const INITIAL_STATE = {
    user: null,
    error: '',
    loading: false,
    signedin: false,
    userData: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGNUP:
        return { ...state, error: '', loading: true };
        case SIGNUP_SUCCESS:
            return { ...state, loading: false, signedin: true, user: action.payload, userData: action.userdata };
        case SIGNUP_FAIL:
            return {
                ...state,
                loading: false,
                signedin: false
            };

        default:
            return state;
    }
};
