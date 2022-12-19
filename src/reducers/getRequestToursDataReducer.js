import {
    GET_REQUEST_TOUR_DATA,
    GET_REQUEST_TOUR_DATA_SUCCESS,
    GET_REQUEST_TOUR_DATA_FAIL,
    GET_REQUEST_TOUR_DETAIL,
    GET_REQUEST_TOUR_DETAIL_SUCCESS,
    GET_REQUEST_TOUR_DETAIL_FAIL
} from '../action/types';

const INITIAL_STATE = {
    requestTourData: [],
    error: '',
    requestTourLoader: false,
    requestTourStatus: '',
    requestTourDetailLoader: false,
    requestTourDetail: {}
};

export default (state = INITIAL_STATE, action) => {
    console.log('type....', action.type);
    switch (action.type) {

        case GET_REQUEST_TOUR_DATA:
            console.log('GET_REQUEST_TOUR_DATA');
            return { ...state, requestTourLoader: true, error: '', requestTourData: [] };
        case GET_REQUEST_TOUR_DATA_SUCCESS:
            return { ...state, ...INITIAL_STATE, requestTourLoader: false, requestTourData: action.payload };
        case GET_REQUEST_TOUR_DATA_FAIL:
            return {
                ...state,
                error: action.payload,
                requestTourLoader: false,
                requestTourData: []
            };
        case GET_REQUEST_TOUR_DETAIL:
            console.log('GET_REQUEST_TOUR_DETAIL');
            return { ...state, requestTourDetailLoader: true, error: '', requestTourStatus: '', requestTourDetail: {} };
        case GET_REQUEST_TOUR_DETAIL_SUCCESS:
            console.log('GET_REQUEST_TOUR_DETAIL_SUCCESS', action.payload);
            return { ...state, ...INITIAL_STATE, requestTourDetailLoader: false, requestTourStatus: action.status, requestTourDetail: action.payload };
        case GET_REQUEST_TOUR_DETAIL_FAIL:
            return {
                ...state,
                error: action.payload,
                requestTourDetailLoader: false,
                requestTourStatus: action.status
            };
        default:
            return state;
    }
};
