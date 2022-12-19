import {
    GET_APPROVED_TOUR_DATA,
    GET_APPROVED_TOUR_DATA_SUCCESS,
    GET_APPROVED_TOUR_DATA_FAIL,
    GET_CATEGORY_TOURS,
    GET_CATEGORY_TOURS_SUCCESS,
    GET_CATEGORY_TOURS_FAIL
} from '../action/types';

const INITIAL_STATE = {
    approvedTourDetails: [],
    error: '',
    approvedTourLoader: false,
    categoryTourLoader: false,
    categoryTour: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_APPROVED_TOUR_DATA:
            return { ...state, approvedTourLoader: true, error: '', approvedTourDetails: [] };
        case GET_APPROVED_TOUR_DATA_SUCCESS:
            return { ...state, ...INITIAL_STATE, approvedTourLoader: false, approvedTourDetails: action.payload };
        case GET_APPROVED_TOUR_DATA_FAIL:
            return {
                ...state,
                error: action.payload,
                approvedTourLoader: false,
                approvedTourDetails: []
            };
        case GET_CATEGORY_TOURS:
            return { ...state, categoryTourLoader: true, error: '' };
        case GET_CATEGORY_TOURS_SUCCESS:
            return { ...state, ...INITIAL_STATE, categoryTourLoader: false, categoryTour: action.payload };
        case GET_CATEGORY_TOURS_FAIL:
            return {
                ...state,
                error: action.payload,
                categoryTourLoader: false,
                categoryTour: action.payload
            };
        default:
            return state;
    }
};
