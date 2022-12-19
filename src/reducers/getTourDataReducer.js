import {
    GET_TOUR_DATA,
    GET_TOUR_DATA_SUCCESS,
    GET_TOUR_DATA_FAIL
} from '../action/types';

const INITIAL_STATE = {
    tourDetails: [],
    error: '',
    tourLoader: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_TOUR_DATA:
            return { ...state, tourLoader: true, error: '', tourDetails: [] };
        case GET_TOUR_DATA_SUCCESS:
            return { ...state, ...INITIAL_STATE, tourLoader: false, tourDetails: action.payload };
        case GET_TOUR_DATA_FAIL:
            return {
                ...state,
                error: action.payload,
                tourLoader: false,
                tourDetails: []
            };
        default:
            return state;
    }
};
