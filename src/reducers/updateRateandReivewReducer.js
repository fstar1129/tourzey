import {
    UPDATE_RATEANDREVIEW,
    UPDATE_RATEANDREVIEW_SUCCESS,
    UPDATE_RATEANDREVIEW_FAIL
} from '../action/types';

const INITIAL_STATE = {
    error: '',
    loading: false,
    update: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_RATEANDREVIEW: 
            return { ...state, error: '', loading: true, update: false };
        case UPDATE_RATEANDREVIEW_SUCCESS: 
            return { ...state, update: true, loading: false };
        case UPDATE_RATEANDREVIEW_FAIL:
            return {
                ...state,
                loading: false,
                update: false
            };
        default:
            return state;
    }
};
