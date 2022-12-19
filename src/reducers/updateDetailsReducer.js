import {
    UPDATE_DETAILS,
    UPDATE_DETAILS_SUCCESS,
    UPDATE_DETAILS_FAIL,
} from '../action/types';

const INITIAL_STATE = {
    error: '',
    loading: false,
    updateDetails: null,
    update: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_DETAILS: 
            return { ...state, error: '', loading: true, update: false };
        case UPDATE_DETAILS_SUCCESS: 
            return { ...state, update: true, loading: false, updateDetails: action.payload };
        case UPDATE_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                update: false
            };
        default:
            return state;
    }
};
