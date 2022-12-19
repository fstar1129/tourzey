import {
    FETCH_TOUR_DETAILS,
    FETCH_TOUR_DETAILS_SUCCESS,
    FETCH_TOUR_DETAILS_FAIL
} from '../action/types';

const INITIAL_STATE = {
    tourData: {},
    error: '',
    tourLoader: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_TOUR_DETAILS:
            return { ...state, tourLoader: true, error: '' };
        case FETCH_TOUR_DETAILS_SUCCESS:
            return { ...state, ...INITIAL_STATE, tourLoader: false, tourData: action.payload };
        case FETCH_TOUR_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload,
                tourLoader: false
            };
        default:
            return state;
    }
};
