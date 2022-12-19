import {
    REQUEST_TOUR,
    REQUEST_TOUR_SUCCESS,
    REQUEST_TOUR_FAIL
} from '../action/types';

const INITIAL_STATE = {
    requestedDetails: {},
    error: '',
    requestedLoader: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REQUEST_TOUR:
            return { ...state, requestedLoader: true, error: '' };
        case REQUEST_TOUR_SUCCESS:
            return { ...state, ...INITIAL_STATE, requestedLoader: false, requestedDetails: action.payload };
        case REQUEST_TOUR_FAIL:
            return {
                ...state,
                error: action.payload,
                requestedLoader: false
            };
        default:
            return state;
    }
};
