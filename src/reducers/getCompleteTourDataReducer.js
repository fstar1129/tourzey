import {
    GET_COMPLETE_TOUR_DATA,
    GET_COMPLETE_TOUR_DATA_SUCCESS,
    GET_COMPLETE_TOUR_DATA_FAIL
} from '../action/types';

const INITIAL_STATE = {
    completeTourData: [],
    completeTourError: '',
    completeTourLoader: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_COMPLETE_TOUR_DATA:
            console.log('GET_COMPLETE_TOUR_DATA');
            return { ...state, completeTourLoader: true, completeTourError: '', completeTourData: [] };
        case GET_COMPLETE_TOUR_DATA_SUCCESS:
            return { ...state, ...INITIAL_STATE, completeTourLoader: false, completeTourData: action.payload };
        case GET_COMPLETE_TOUR_DATA_FAIL:
            return {
                ...state,
                completeTourError: action.payload,
                completeTourLoader: false,
                completeTourData: []
            };
        default:
            return state;
    }
};
