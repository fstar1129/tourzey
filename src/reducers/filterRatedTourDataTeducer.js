import {
    GET_RATED_TOUR_DATA,
    GET_RATED_TOUR_DATA_SUCCESS,
    GET_RATED_TOUR_DATA_FAIL,
} from '../action/types';

const INITIAL_STATE = {
    ratedTourData: [],
    ratedTourError: '',
    ratedTourLoader: false,
};

export default (state = INITIAL_STATE, action) => {
    console.log('checking type and action', action.type, action.payload);
    switch (action.type) {
        case GET_RATED_TOUR_DATA:
            return { ...state, ratedTourLoader: true, ratedTourError: '', ratedTourData: [] };
        case GET_RATED_TOUR_DATA_SUCCESS:
            return { ...state, ...INITIAL_STATE, ratedTourLoader: false, ratedTourData: action.payload };
        case GET_RATED_TOUR_DATA_FAIL:
            return {
                ...state,
                ratedTourError: action.payload,
                ratedTourLoader: false,
                ratedTourData: []
            };
        default:
            return state;
    }
};
