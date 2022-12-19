import {
    CERTIFIED_TOUR_DATA,
    CERTIFIED_TOUR_DATA_SUCCESS,
    CERTIFIED_TOUR_DATA_FAIL
} from '../action/types';

const INITIAL_STATE = {
    certifiedTourData: [],
    certifiedTourError: '',
    certifiedTourLoader: false,
};

export default (state = INITIAL_STATE, action) => {
    console.log('checking Data', action.payload, action.type);
    switch (action.type) {
        case CERTIFIED_TOUR_DATA:
            return { ...state, certifiedTourLoader: true, certifiedTourError: '', certifiedTourData: [] };
        case CERTIFIED_TOUR_DATA_SUCCESS:
            return { ...state, ...INITIAL_STATE, certifiedTourLoader: false, certifiedTourData: action.payload };
        case CERTIFIED_TOUR_DATA_FAIL:
            return {
                ...state,
                certifiedTourError: action.payload,
                certifiedTourLoader: false,
                certifiedTourData: []
            };
        default:
            return state;
    }
};
